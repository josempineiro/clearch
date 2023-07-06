import { PokemonPokeApiDto, PokemonsPokeApiDto } from '../types'

export async function getPokemons({ limit = 10, offset = 0 }): Promise<PokemonsPokeApiDto> {
  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then((res) => res.json())
}

export async function getPokemonById(id: string): Promise<PokemonPokeApiDto> {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
}

export async function getPokemonsByIds(ids): Promise<Array<PokemonPokeApiDto>> {
  return Promise.all(ids.map((id) => getPokemonById(id)))
}

export async function getAllAbilities(): Promise<Array<any>> {
  return fetch(`https://pokeapi.co/api/v2/ability?limit=-1`).then((res) => res.json())
}

export async function getAbilityById(id: string): Promise<any> {
  return fetch(`https://pokeapi.co/api/v2/ability/${id}`).then((res) => res.json())
}

export async function getAbilitiesByIds(ids): Promise<Array<any>> {
  return Promise.all(ids.map((id) => getAbilityById(id)))
}
