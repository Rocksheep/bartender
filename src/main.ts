import { CommandResultType } from './Discord/Clients/CommandResultType';
import express from 'express';

import { DiscordJsClient } from './Discord/Clients/DiscordJsClient';
import commands from './Discord/Commands';

require('dotenv').config();

const app: express.Application = express();
const client = new DiscordJsClient();
const expressPort = process.env.PORT || 80;

client.addOnMessageListener(async (msg) => {
    const possibleCommand = msg.content.split(' ').shift();

    for (const command of Object.values(commands)) {
        if (possibleCommand === command.signature) {
            const instance = command.build(msg.author.id, msg.content);
            if (instance.requiresMembers()) {
                const members = msg.guild.members.reduce((acc, member) => {
                    acc[member.id] = {
                        id: member.id,
                        username: member.nickname || member.user.username
                    };

                    return acc;
                }, {});

                instance.setMembers(members);
            }

            if (instance.commandResultType() === CommandResultType.TEXT) {
                msg.channel.send(await instance.getContent(), instance.getOptions());
            } else {
                msg.channel.send({ embed: await instance.getEmbed() });
            }
        }
    }
});

client.connect(process.env.DISCORD_TOKEN!);

app.get('/', function (req, res) {
    res.send('How can I serve you, master?');
});

app.listen(expressPort, () => {
    console.log('App listening on port 80');
});
