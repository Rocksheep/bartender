import {AbstractCommand} from "./AbstractCommand";

export class PingPong extends AbstractCommand {
    public static signature = '.ping'; 

    getContent(): string {
        return 'pong';
    }
}