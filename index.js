const { generateText } = require('./functions/palm.js');
const { addMessage, getAllMessages, resetMessages } = require('./functions/messagemanager.js');
const { getUserInput } = require('./functions/readline.js');
const { initial_message, m_context_message } = require('./functions/prompt-maker.js');

let userStats = {
  gold: 25,
  health: 100,
  hunger: 0
};

const context_message = m_context_message(userStats.health, userStats.hunger, userStats.gold);

// ANSI escape codes for coloring
const userColor = '\x1b[34m'; // Blue
const wizardColor = '\x1b[32m'; // Green
const resetColor = '\x1b[0m'; // Reset

async function typeMessage(message, color) {
  for (const char of message) {
    process.stdout.write(color + char.toString() + resetColor);
    await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay between characters
  }
  console.log(''); // New line after message
}

async function main() {
  resetMessages();
  addMessage('wizard', initial_message);
  
  console.log(initial_message);

  while (true) {
    const user_response = await getUserInput(`\n\n${userColor}User:${resetColor} `);
    addMessage('user', user_response);
    const previous_messages = await getAllMessages();
    const prompt_to_send = `${context_message}\n\n${JSON.stringify(previous_messages)}\n{adventurer}: ${user_response}\n\nNow, you will write the response from {Wizard}. Remember, user has ${userStats.health} health (0 = dead), ${userStats.hunger} hunger (0 is not hungry, 10 is very hungry), and ${userStats.gold} gold. The most recent messages are the ones in the bottom, and the user's latest message was ${user_response}.\n\n{Wizard}: `;
    
    let wizard_response = await generateText(prompt_to_send);
    
    await typeMessage(`Wizard: ${wizard_response}`, wizardColor);
    
    addMessage('wizard', wizard_response);
    
    const prompt_to_get_new_stats = `\`\`\`\n${JSON.stringify(previous_messages)}\nUser: ${user_response}\nWizard: ${wizard_response}\n\`\`\`\nthe user currently has ${userStats.health} health, ${userStats.hunger} hunger, and ${userStats.gold} gold. Please tell me in the following format the changes made to the variables in the last two messages (user said ${user_response} and wizard said ${wizard_response})\n\n{added/subtracted health}, {added/subtracted hunger}, {added/subtracted gold}.\n\nFor example, if the user added 25 gold, it would be \n\n0, 0, 25\n\nBut if the user subtracted 25 health it would look like\n-25, 0, 0\n\nyour response: `;
    let new_stats = await generateText(prompt_to_get_new_stats);
    const trimmedString = new_stats.replace(/\s/g, ''); // Remove all spaces
    const new_stats_array = trimmedString.split(',').map(item => parseInt(item));

    const new_health = new_stats_array[0];
    const new_hunger = new_stats_array[1];
    const new_gold = new_stats_array[2];

    if (new_health != 0) {
      userStats.health += new_health;
      console.log(`Your health changed by ${new_health}. It's now ${userStats.health}`);
    }

    if (new_hunger != 0) {
      userStats.hunger += new_hunger;
      console.log(`Your hunger changed by ${new_hunger}. It is now ${userStats.hunger}`)
    }

    if (new_gold != 0) {
      userStats.gold += new_gold;
      console.log(`You got ${new_gold} gold and now have ${userStats.gold}.`)
    }
    process.stdout.write('\x1b[36m' + 'Wizard: ' + '\x1b[0m'); // Cyan for Wizard
  }
}

main()