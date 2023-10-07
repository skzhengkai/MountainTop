let messages = []; // Initialize an empty array to store messages

function addMessage(sender, content) {
  // Generate the timestamp
  const timestamp = new Date().toISOString();

  // Create a new message object
  const newMessage = {
    sender,
    content,
    timestamp
  };

  // Add the new message to the messages array
  messages.push(newMessage);

  return true;
}

async function getAllMessages() {
  // Return the messages array
  return messages;
}

async function formatMessages(filePath) {
  try {
    // Access the messages array and format the messages
    let formattedString = '';
    for (const message of messages) {
      formattedString += `{${message.sender}}: ${message.content}\n`;
    }
    return formattedString;
  } catch (error) {
    console.error('Error formatting messages:', error);
    return '';
  }
}

function resetMessages() {
  // Reset the messages array by assigning an empty array
  messages = [];

  return true;
}

module.exports = {
  addMessage,
  getAllMessages,
  formatMessages,
  resetMessages
};
