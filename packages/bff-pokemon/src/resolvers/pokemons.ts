import { Repeater } from 'graphql-yoga'
import fetch from 'node-fetch'
import { ISchemaLevelResolver } from '@graphql-tools/utils'
import { ServerContext } from '../types'

export default async (parent, args, context, info) => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon')

  const data = await response.json()

  return data.results.map((pokemon, index) => ({
    id: parseInt(pokemon.url.split('/').reverse()[1], 10),
    name: pokemon.name,
  }))
}

interface Ability {
  id: string
  name: string
}
interface Pokemon {
  id: string
  name: string
  abilities: Array<Ability>
}
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

const pokemonDtoToPokemon = (pokemonDto: PokemonDto): Pokemon => {
  return {
    id: pokemonDto.id.toString(),
    name: pokemonDto.name,
    abilities: pokemonDto.abilities.map(({ ability }) => ({
      id: ability.url.split('/').reverse()[1],
      name: ability.name,
    })),
  }
}

async function fetchJson<Dto>(path: string): Promise<Dto> {
  return fetch(path).then((res) => res.json())
}

export async function pokemonsStream(parent, { limit = 10, offset = 0 }, context, info) {
  return new Repeater<Pokemon>(async (push, stop) => {
    const pokemons = await fetchJson<PokemonsDto>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    await Promise.all(
      pokemons.results.map(async (pokemonDto) => {
        const pokemon = await fetchJson<PokemonDto>('https://pokeapi.co/api/v2/pokemon/' + pokemonDto.name)
        push(pokemonDtoToPokemon(pokemon))
        return pokemon
      }),
    )
    stop()
    await stop.then(() => {
      console.log('cancel')
    })
  })
}
export const pokemons: ISchemaLevelResolver<
  undefined,
  ServerContext,
  {
    limit?: number
    offset?: number
  },
  Repeater<Pokemon, void, unknown>
> = function (parent, { limit = 10, offset = 0 }, context, info) {
  return new Repeater<Pokemon>(async (push, stop) => {
    const pokemons = await fetchJson<PokemonsDto>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    const pokemonDetails = await Promise.all(
      pokemons.results.map(async (pokemonDto) => {
        const pokemon = await fetchJson<PokemonDto>('https://pokeapi.co/api/v2/pokemon/' + pokemonDto.name)
        return pokemon
      }),
    )
    pokemonDetails.forEach((pokemon) => {
      push(pokemonDtoToPokemon(pokemon))
    })
    stop()
    await stop.then(() => {
      console.log('cancel')
    })
  })
}
