import {Command} from "../Interfaces/Command";

export abstract class AbstractCommand implements Command {
    protected message: string;

    public constructor(message: string) {
        this.message = message;
    }

    public async getContent(): Promise<string> {
        return new Promise((resolve) => resolve(''));
    }

    public getOptions(): object {
        return {};
    }
}
