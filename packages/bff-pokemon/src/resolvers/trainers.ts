import graphqlFields from 'graphql-fields'
import { ServerContext } from '../types'

interface PokemonDto {
  id: number
  name: string
  url: string
  abilities: Array<{ ability: { name: string; url: string } }>
}

interface PokemonsDto {
  count: number
  next: string
  previous: string
  results: Array<{
    name: string
    url: string
  }>
}

async function getTrainers() {
  return [
    {
      id: '1',
      name: 'Ash Ketchum',
      pokemons: Array.from({ length: 2 }, (_, i) => ({
        id: `${i + 1}`,
      })),
    },
  ]
}

async function fetchJson<Dto>(path: string): Promise<Dto> {
  return fetch(path).then((res) => res.json())
}

async function getPokemonById(id) {
  return fetchJson('https://pokeapi.co/api/v2/pokemon/' + id).then((pokemon: PokemonDto) => ({
    id: pokemon.id.toString(),
    name: pokemon.name,
    abilities: pokemon.abilities.map(({ ability }) => ({
      id: ability.url.split('/').reverse()[1],
      name: ability.name,
    })),
  }))
}

async function getPokemonsByIds(ids) {
  const pokemons = await fetchJson<PokemonsDto>(`https://pokeapi.co/api/v2/pokemon?limit=-1&offset=0`)
  return Promise.all(
    pokemons.results
      .filter((pokemon) => ids.includes(pokemon.url.split('/').reverse()[1]))
      .map((pokemon) => getPokemonById(pokemon.url.split('/').reverse()[1])),
  )
}

export async function trainers(parent, args, context, info) {
  return getTrainers()
}

export async function trainerPokemons(parent, args, context: ServerContext, info) {
  console.log(graphqlFields(info))
  return getPokemonsByIds(parent.pokemonIds.map((pokemon) => pokemon.id))
}
