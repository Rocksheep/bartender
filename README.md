# Discord Bartender Bot
[![Build Status](https://travis-ci.org/Rocksheep/bartender.svg?branch=master)](https://travis-ci.org/Rocksheep/bartender)

This bot is in heavy development

To add this bot to your server you will need to visit this URL:
https://discordapp.com/oauth2/authorize?client_id={client_id}&scope=bot&permissions={permission_code}

## Developing the bot
Copy the `.env.example` file to `.env` and fill in the blanks if you want to run this bot.

### Installing dependencies
```
npm install
```

### Building the bot
```
npm run build
```

### Starting the bot
```
npm run start
```

### Running tests
```
npm run test
```

### Creating commands
Adding a command to this bot is super easy. You need to add your command to the `Discord/Commands` folder and add it to
`Discord/Commands/index.ts`. You can use the PingPong command as an example.