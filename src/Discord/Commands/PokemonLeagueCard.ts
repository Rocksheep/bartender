import { AbstractCommand } from './AbstractCommand';
import { PokemonLeagueCardCodeRepository } from '../Repositories/PokemonLeagueCardCodes/PokemonLeagueCardCodeRepository';
import { CommandResultType } from '../Clients/CommandResultType';

export class PokemonLeagueCard extends AbstractCommand {
    public static signature: string = '.plc';
    private codeRepository: PokemonLeagueCardCodeRepository;
    private author: string;

    public constructor(author: string, message: string, repository: PokemonLeagueCardCodeRepository) {
        super(message);

        this.author = author;
        this.codeRepository = repository;
    }

    public static build(author: string, message: string): PokemonLeagueCard {
        return new PokemonLeagueCard(author, message, new PokemonLeagueCardCodeRepository());
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
                const code = await this.codeRepository.getCodeByUsername(this.author);

                return 'Jouw Pokemon league code: ' + code;
            } catch (err) {
                return 'Gebruik `.plc set {code}` om een je Pokemon League Code aan je account te koppelen.';
            }
        }

        if (subcommand === 'delete') {
            return this.deleteCode();
        } else if (subcommand === 'set') {
            const friendCode = splitMessage.shift() || '';
            const correctedCode = friendCode.toUpperCase();
            const regex = new RegExp(/([A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{2})/);

            if (!regex.test(correctedCode)) {
                return 'Ik heb geen code gevonden. Heb je hem correct ingevoerd?';
            }

            await this.codeRepository.storeCode(this.author, friendCode);

            return 'Je code is toegevoegd!';
        } else {
            const user = subcommand;
            const userId = this.getUserId(subcommand);

            try {
                const code = await this.codeRepository.getCodeByUsername(userId);

                return 'De code voor ' + user + ' is ' + code;
            } catch (err) {
                return 'De gebruiker heeft nog geen code.';
            }
        }
    }

    public async getEmbed() {
        return {
            title: 'Pokemon League Card Codes',
            color: 0xFF0000,
            fields: await this.listCodes()
        };
    }

    private async listCodes(): Promise<Array<any>> {
        const codes = await this.codeRepository.all();

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

    private async deleteCode(): Promise<string> {
        try {
            await this.codeRepository.deleteCode(this.author);

            return 'Je code is verwijderd';
        } catch (err) {
            console.log(err);

            return 'Er is iets mis gegaan, probeer het later opnieuw';
        }
    }

    private getUserId(message: string): string {
        const match = message.match(/(\d)+/g);

        return match ? match.join('') : '';
    }
}
