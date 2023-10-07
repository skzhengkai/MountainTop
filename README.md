# MountainTop

An interactive text adventure game where you play as an adventurer climbing a mountain. Your guide is a wizard who tracks your stats and responds to your input to progress the story.

## Usage 

To play MountainTop:

1. Get a Google API key:
   - Go to https://developers.generativeai.google/tutorials/setup
   - Click "Get an API key" and join the waitlist
   - Once approved, copy your API key
2. Clone the repo
3. Create a .env file with your API key:
    ```
   GOOGLE_APIKEY=your_api_key
   ```
4. Run `npm install` to install dependencies
5. Run `node index.js` to start the game
6. Type your responses to the wizard's prompts to progress the story

## Code Overview
The main game logic is handled in index.js. It initializes the user stats and contains the input loop.

Functions for generating AI responses are in palm.js.

Message history and stats are tracked in messagemanager.js.

User input is retrieved with readline.js.

Initial prompts are defined in prompt-maker.js.

The game uses ANSI escape codes to colorize output.

## Contributing
Contributions welcome! Feel free to open issues and submit pull requests.

Some ideas for improvements:

- Add more story content
- Expand the combat system instead of replying on the AI to handle it by itself.
- Implement an inventory system instead of replying on the AI to remember it itself. Similar to how the health/gold/hunger stats is currently implemented.
- Add side quests?
- Improve the text parser

## License
This project is open source and available under the [MIT License](LICENSE).