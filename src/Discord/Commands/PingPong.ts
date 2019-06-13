import {AbstractCommand} from "@/Discord/Commands/AbstractCommand";

export class PingPong extends AbstractCommand {
    public static signature = '.ping'; 

    getContent(): string {
        return 'pong';
    }
}