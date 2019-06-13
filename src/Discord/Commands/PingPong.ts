import { Command } from "@/Discord/Interfaces/Command";

export class PingPong implements Command {
    public static signature = '.ping'; 

    getContent(): string {
        return 'pong';
    }

    getOptions(): Object {
        return {};
    }
}