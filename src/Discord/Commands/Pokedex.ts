import { AbstractCommand } from './AbstractCommand';
import { CommandResultType } from '../Clients/CommandResultType';
import { Pokemon } from '../Types/Pokemon';
import { PokemonRepository } from '../Repositories/PokemonRepository';

export class Pokedex extends AbstractCommand {
    public static signature: string = '.pokedex';
    repository: PokemonRepository;

    public constructor(message: string, repository: PokemonRepository) {
        super(message);
        this.repository = repository;
    }

    public static build(author: string, message: string) {
        return new Pokedex(message, new PokemonRepository());
    }

    public commandResultType(): CommandResultType {
        return CommandResultType.EMBED;
    }

    public async getEmbed() {
        const splitMessage = this.message.split(' ');
        // Shift of the signature
        splitMessage.shift();
        const query = splitMessage.shift() || null;

        if (!query) {
            return this.pokemonNotFound();
        }

        let pokemon: Pokemon;
        try {
            pokemon = await this.findPokemon(query);

        } catch (err) {
            console.log(err);
            return this.pokemonNotFound();
        }

        const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const flavorText = pokemon.species.flavor_text_entries.find((flavorText) => flavorText.language.name === 'en');

        return {
            title: '#' + pokemon.id + ' ' + pokemonName,
            description: flavorText!.flavor_text,
            thumbnail: {
                url: pokemon.sprites.front_default
            },
            fields: [
                {
                    name: 'Type',
                    value: pokemon.types.map(type => type.type.name).join(', ')
                },
                {
                    name: 'Height',
                    value: pokemon.height / 10 + 'm',
                    inline: true
                },
                {
                    name: 'Weight',
                    value: pokemon.weight / 10 + 'kg',
                    inline: true,
                }
            ]
        };
    }

    private async findPokemon(query: string): Promise<Pokemon> {
        return this.repository.findPokemon(query);
    }

    private pokemonNotFound() {
        return {
            title: 'Pokemon niet gevonden',
        }
    }
}
