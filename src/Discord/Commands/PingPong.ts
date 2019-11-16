import {AbstractCommand} from "./AbstractCommand";

export class PingPong extends AbstractCommand {
    public static signature = '.ping';

    public static build(author: string, message: string): PingPong {
        return new PingPong(message);
    }

    public async getContent(): Promise<string> {
        return new Promise((resolve) => resolve('pong'));
    }
}
