require('dotenv').config();
import { Message, Client } from "discord.js";

const client = new Client;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg) => {
    if (msg.content === 'ping') {
        msg.reply('pong').then((message: Message | Array<Message>) => {
            console.log(message);
        });
    }
});

client.login(process.env.DISCORD_TOKEN);