export interface PokemonPokeApiDto {
  id: string
  name: string
  url: string
  abilities: Array<{ ability: { name: string; url: string } }>
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
