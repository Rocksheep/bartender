import { Pokemon } from '../Types/Pokemon';
// @ts-ignore
import Pokedex from 'pokedex-promise-v2';

export class PokemonRepository {
    public async findPokemon(query: string): Promise<Pokemon> {
        const pokedex = new Pokedex();

        const pokemon = await pokedex.getPokemonByName(query);
        pokemon.species = await pokedex.getPokemonSpeciesByName(query);

        return pokemon;
    }
}
