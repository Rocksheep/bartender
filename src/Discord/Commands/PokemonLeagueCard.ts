import { AbstractCommand } from './AbstractCommand';
import { PokemonLeagueCardCodeRepository } from '../Repositories/PokemonLeagueCardCodes/PokemonLeagueCardCodeRepository';

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

        if (subcommand === 'set') {
            const friendCode = splitMessage.shift() || null;

            if (!friendCode) {
                return 'Ik heb geen code gevonden. Ben je deze misschien vergeten?';
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

    private getUserId(message: string): string {
        const match = message.match(/(\d)+/g);

        return match ? match.join('') : '';
    }
}
