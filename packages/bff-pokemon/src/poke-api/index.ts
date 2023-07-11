import { PokemonPokeApiDto, PokemonsPokeApiDto, StatPokeApiDto, AbilityPokeApiDto, AbilitiesPokeApiDto } from '../types'

export async function fetchPokeApi<T>(
  path: string,
  queryParams: string | string[][] | Record<string, string> | Record<string, any> | URLSearchParams = {},
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

export async function getPokemonById(id: string) {
  return await fetchPokeApi<PokemonPokeApiDto>(`pokemon/${id}`)
}

export async function getPokemonsByIds(ids): Promise<Array<PokemonPokeApiDto>> {
  return await Promise.all(ids.map((id) => getPokemonById(id)))
}

export async function getAllAbilities() {
  return await fetchPokeApi<AbilitiesPokeApiDto>(`ability`, { limit: '-1' })
}

export async function getAbilityById(id: string) {
  const ability = await fetchPokeApi<AbilityPokeApiDto>(`ability/${id}`)
  return ability
}

export async function getAbilitiesByIds(ids: Array<string>) {
  return await Promise.all(ids.map((id) => getAbilityById(id)))
}

export async function getStatById(id: string) {
  return await fetchPokeApi<StatPokeApiDto>(`stat/${id}`)
}

export async function getStatsByIds(ids): Promise<Array<any>> {
  return await Promise.all(ids.map((id) => getStatById(id)))
}

export async function getCharacteristicById(id: string) {
  return await fetchPokeApi<StatPokeApiDto>(`characteristic/${id}`)
}

export async function getCharacteristicsByIds(ids: Array<string>) {
  return await Promise.all(ids.map((id) => getCharacteristicById(id)))
}
