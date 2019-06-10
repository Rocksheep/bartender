require('dotenv').config();

import express from 'express';

import { DiscordJsClient } from "./Discord/Clients/DiscordJsClient";
import commands from './Discord/Commands';

const app: express.Application = express();
const client = new DiscordJsClient();
const expressPort = process.env.PORT || 80;

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
    res.send('How can I serve you, master?');
});

app.listen(expressPort, () => {
    console.log('App listening on port 80');
});