export interface PokemonPokeApiDto {
  id: string
  name: string
  url: string
  abilities: Array<{ ability: { name: string; url: string } }>
  stats: Array<{ base_stat: number; stat: { name: string; url: string } }>
}

export interface PokemonsPokeApiDto {
  count: number
  next: string
  previous: string
  results: Array<{
    name: string
    url: string
  }>
}

export type ServerContext = {
  loaders: {
    pokemons: any
    abilities: any
  }
}

export type AbilitiesPokeApiDto = {
  count: number
  next: string
  previous: string
  results: Array<{
    name: string
    url: string
  }>
}
export type AbilityPokeApiDto = {
  id: number
  name: string
  effect_entries: Array<{
    effect: string
    language: {
      name: string
    }
  }>
}

export type PokemonStatPokeApiDto = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export type StatPokeApiDto = {
  id: number
  effort: number
  characteristics: {
    url: string
  }
}
