import { DiscordClient } from "../Interfaces/DiscordClient";
import { Client, Message } from "discord.js";

export class DiscordJsClient implements DiscordClient {

    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public connect(token: string) {
        this.client.login(token);
    }

    public addOnMessageListener(callback: (msg: Message) => void) {
        this.client.on('message', callback);
    }
}