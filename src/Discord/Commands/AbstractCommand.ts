import {Command} from "../Interfaces/Command";
import { Member } from '../Types/Member';
import { CommandResultType } from '../Clients/CommandResultType';

export abstract class AbstractCommand implements Command {
    protected message: string;
    protected members: Record<string, Member> = {};

    public constructor(message: string) {
        this.message = message;
    }

    public async getContent(): Promise<string> {
        return new Promise((resolve) => resolve(''));
    }

    public getOptions(): object {
        return {};
    }

    public requiresMembers(): boolean {
        return false;
    }

    public setMembers(members: Record<string, Member>): void {
        this.members = members;
    }

    public getEmbed(): any {
        return null;
    }

    public commandResultType(): CommandResultType {
        return CommandResultType.TEXT;
    }
}
