import { AbstractCommand } from './AbstractCommand';
import { IFriendCodeRepository } from '../Repositories/FriendCodes/IFriendCodeRepository';
import { FriendCodeRepository } from '../Repositories/FriendCodes/FriendCodeRepository';
import { CommandResultType } from '../Clients/CommandResultType';

export class FriendCode extends AbstractCommand {
    public static signature: string = '.fc';
    private friendCodeRepository: IFriendCodeRepository;
    private author: string;

    public constructor(author: string, message: string, repository: IFriendCodeRepository) {
        super(message);

        this.author = author;
        this.friendCodeRepository = repository;
    }

    public static build(author: string, message: string): FriendCode {
        return new FriendCode(author, message, new FriendCodeRepository());
    }

    public requiresMembers(): boolean {
        return true;
    }

    public commandResultType(): CommandResultType {
        const splitMessage = this.message.split(' ');
        // Shift of the signature
        splitMessage.shift();
        const subcommand = splitMessage.shift() || null;

        if (subcommand === 'list') {
            return CommandResultType.EMBED;
        }

        return CommandResultType.TEXT;
    }

    public async getContent(): Promise<string> {
        const splitMessage = this.message.split(' ');
        // Shift of the signature
        splitMessage.shift();
        const subcommand = splitMessage.shift() || null;

        if (!subcommand) {
            try {
                const code = await this.friendCodeRepository.getFriendCodeByUsername(this.author);

                return 'Jouw friendcode: ' + code;
            } catch (err) {
                return 'Gebruik `.fc set {code}` om een je Nintendo Friend Code aan je account te koppelen.';
            }
        }

        if (subcommand === 'set') {
            const friendCode = splitMessage.shift() || '';
            const correctedCode = friendCode.toUpperCase();
            const regex = new RegExp(/(SW-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4})/);

            if (!regex.test(correctedCode)) {
                return 'Ik heb geen code gevonden. Ben je hem correct ingevoerd?';
            }

            await this.friendCodeRepository.storeFriendCode(this.author, correctedCode);

            return 'Je code is toegevoegd!';
        } else {
            const user = subcommand;
            const userId = this.getUserId(subcommand);

            try {
                const code = await this.friendCodeRepository.getFriendCodeByUsername(userId);

                return 'De code voor ' + user + ' is ' + code;
            } catch (err) {
                return 'De gebruiker heeft nog geen code.';
            }
        }
    }

    public async getEmbed() {
        return {
            title: 'Nintendo Switch Friend Codes',
            color: 0xFC0FC0,
            fields: await this.listCodes()
        };
    }

    private async listCodes(): Promise<Array<any>> {
        const codes = await this.friendCodeRepository.all();

        return codes.filter((code) => {
            return code.username in this.members;
        }).map((code) => {
            const username = this.members[code.username].username;

            return {
                name: username,
                value: code.code
            }
        }).sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }

            return 0;
        });
    }

    private getUserId(message: string): string {
        const match = message.match(/(\d)+/g);

        return match ? match.join('') : '';
    }
}
