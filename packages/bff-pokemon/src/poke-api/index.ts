import { PokemonPokeApiDto, PokemonsPokeApiDto, StatPokeApiDto, AbilityPokeApiDto, AbilitiesPokeApiDto } from '../types'

export async function fetchPokeApi<T>(
  path: string,
  queryParams: string | string[][] | Record<string, string> | Record<string, string> | URLSearchParams = {},
): Promise<T> {
  const queryString = new URLSearchParams(queryParams).toString()
  const url = `https://pokeapi.co/api/v2/${path}${queryString ? `?${queryString}` : ''}`
  console.log('BFF::Pokemons::fetchPokeApi', url)
  return (await fetch(url).then((res) => res.json())) as T
}

export async function getPokemons(
  { limit = '-1', offset = '0' } = { limit: '-1', offset: '0' },
): Promise<PokemonsPokeApiDto> {
  return await fetchPokeApi<PokemonsPokeApiDto>(`pokemon`, {
    limit,
    offset,
  })
}

export async function getPokemonById(id: string): Promise<PokemonPokeApiDto> {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
}

export async function getPokemonsByIds(ids): Promise<Array<PokemonPokeApiDto>> {
  return await Promise.all(ids.map((id) => getPokemonById(id)))
}

export async function getAllAbilities() {
  return await fetchPokeApi<AbilitiesPokeApiDto>(`ability`, { limit: '-1' })
}

export async function getAbilityById(id: string) {
  console.log('BFF::Pokemons::getAbilityById', id)
  const ability = await fetchPokeApi<AbilityPokeApiDto>(`ability/${id}`)
  console.log('BFF::Pokemons::getAbilityById->results', ability.id)
  return ability
}

export async function getAbilitiesByIds(ids: Array<string>) {
  return await Promise.all(ids.map((id) => getAbilityById(id)))
}

export async function getStatById(id: string) {
  return await fetchPokeApi<StatPokeApiDto>(`ability/${id}`)
}

export async function getStatsByIds(ids): Promise<Array<any>> {
  return await Promise.all(ids.map((id) => getStatById(id)))
}
