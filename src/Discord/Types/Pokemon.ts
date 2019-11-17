import { PokemonSpecies } from './PokemonSpecies';

export interface Pokemon {
    id: number,
    height: number,
    weight: number,
    name: string,
    sprites: {
        front_default: string
    },
    types: Array<{ type: { name: string, url: string } }>,
    species: PokemonSpecies
}
