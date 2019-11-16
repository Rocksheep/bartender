import { AbstractCommand } from './AbstractCommand';
import { IFriendCodeRepository } from '../Repositories/FriendCodes/IFriendCodeRepository';
import { FriendCodeRepository } from '../Repositories/FriendCodes/FriendCodeRepository';

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
            const friendCode = splitMessage.shift() || null;

            if (!friendCode) {
                return 'Ik heb geen code gevonden. Ben je deze misschien vergeten?';
            }

            await this.friendCodeRepository.storeFriendCode(this.author, friendCode);

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

    private getUserId(message: string): string {
        const match = message.match(/(\d)+/g);

        return match ? match.join('') : '';
    }
}
