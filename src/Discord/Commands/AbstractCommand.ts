import {Command} from "@/Discord/Interfaces/Command";

export abstract class AbstractCommand implements Command {
    protected message: string;

    public constructor(message: string) {
        this.message = message;
    }

    public getContent(): string {
        return '';
    }

    public getOptions(): object {
        return {};
    }
}