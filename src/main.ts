require('dotenv').config();

import express from 'express';

import { DiscordJsClient } from "./Discord/Clients/DiscordJsClient";
import commands from './Discord/Commands';

const app: express.Application = express();
const client = new DiscordJsClient();

client.addOnMessageListener((msg) => {
    const possibleCommand = msg.content.split(' ')[0];
    Object.values(commands).forEach(command => {
        if (possibleCommand === command.signature) {
            const instance = new command();

            msg.channel.send(instance.getContent(), instance.getOptions());
        }
    });
});

client.connect(process.env.DISCORD_TOKEN!);

app.get('/', function (req, res) {
    res.send('Greetings');
});

app.listen(80, () => {
    console.log('App listening on port 80');
});