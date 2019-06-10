require('dotenv').config();
import { DiscordJsClient } from "./Discord/Clients/DiscordJsClient";
import commands from './Discord/Commands';

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