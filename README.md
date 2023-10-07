# MountainTop 

## Description

MountainTop is a text adventure game that allows the user to roleplay as an adventurer trying to reach the top of a mountain. The user will interact with a wizard NPC that acts as a guide and vendor, selling resources to help the adventurer on their journey. 

The wizard tracks the user's in-game stats like health, hunger, and gold and will respond to the user's commands to progress the story, such as asking the user what they want to do next. The game features a simple combat system that allows the wizard to alter the user's stats based on story events.

## Usage

To play MountainTop:

1. Clone the repo
2. Run `npm install` to install dependencies 
3. Run `node index.js` to start the game
4. Type your responses to the wizard's prompts to progress the story

The wizard will provide you with options as the story progresses. Select option numbers to choose your path.

Try to reach the top of the mountain without running out of health or hunger!

## Code Overview

The main game logic is handled in index.js. It initializes the user stats and contains the input loop.

Functions for generating AI responses are in palm.js.

Message history and stats are tracked in messagemanager.js. 

User input is retrieved with readline.js.

Initial prompts are defined in prompt-maker.js.

The game uses ANSI escape codes to colorize output.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

Some ideas for improvements:

- Add more story content 
- Expand the combat system
- Implement an inventory system
- Add side quests
- Improve the text parser

## License

This project is open source and available under the [MIT License](LICENSE).
