import fetch from 'node-fetch'
import _ from 'lodash'
import graphqlFields from 'graphql-fields'
import { getPokemonById, getPokemons } from '../poke-api'
import { PokemonPokeApiDto } from '../types'

interface Ability {
  id: string
  name: string
}
interface Stat {
  id: string
  name: string
  value: number
}

interface Pokemon extends PokemonBaseDto {
  abilities: Array<Ability>
  stats: Array<Stat>
}
interface PokemonBaseDto {
  id: string
  name: string
  image: string
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

const pokemonsDtoToPokemons = (pokemonsDto: PokemonsDto): Array<PokemonBaseDto> => {
  return pokemonsDto.results.map((result) => ({
    id: result.url.split('/').reverse()[1],
    name: result.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      result.url.split('/').reverse()[1]
    }.svg`,
  }))
}

const pokemonUrlToId = (url: string): string => {
  return url.split('/').reverse()[1]
}

const pokemonIdToCursor = (id: string): string => {
  return Buffer.from(id).toString('base64')
}

const pokemonDtoToPokemonBase = (pokemonDto: PokemonPokeApiDto): PokemonBaseDto => {
  return {
    id: pokemonDto.id.toString(),
    name: pokemonDto.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDto.id}.svg`,
  }
}

const pokemonDtoToPokemon = (pokemonDto: PokemonPokeApiDto): Pokemon => {
  return {
    id: pokemonDto.id.toString(),
    name: pokemonDto.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDto.id}.svg`,
    abilities: pokemonDto.abilities.map((ability) => ({
      id: ability.ability.url.split('/').reverse()[1],
      name: ability.ability.name,
    })),
    stats: pokemonDto.stats.map((stat) => ({
      id: stat.stat.url.split('/').reverse()[1],
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  }
}

async function fetchJson<Dto>(path: string): Promise<Dto> {
  return fetch(path).then((res) => res.json())
}

export async function pokemons(parent, { first, after }, context, info) {
  console.log('Resolvers::pokemons', { first, after })
  const afterIndex = after ? Buffer.from(after, 'base64').toString() : 0
  return await fetchJson<PokemonsDto>(`https://pokeapi.co/api/v2/pokemon?limit=${first}&offset=${afterIndex}`)
}

export async function pokemonsConnetionEdges(parent, { first, after }, context, info) {
  return parent.results.map((pokemonDto) => ({
    cursor: Buffer.from(pokemonDto.url.split('/').reverse()[1]).toString('base64'),
    node: {
      id: pokemonDto.url.split('/').reverse()[1],
      name: pokemonDto.name,
    },
  }))
}

export async function pokemonEdgeNode(parent, { first, after }, context, info) {
  console.log('Resolvers::pokemonEdgeNode', { first, after })
  const pokemonDto = await fetchJson<PokemonPokeApiDto>(`https://pokeapi.co/api/v2/pokemon/${parent.node.id}`)
  return pokemonDtoToPokemon(pokemonDto)
}

export async function pokemonsConnetionPageInfo(parent, { first, after }) {
  console.log('Resolvers::pokemonEdgeNode', { first, after })
  return {
    hasNextPage: parent.next !== null,
    endCursor: pokemonIdToCursor(pokemonUrlToId(parent.results[parent.results.length - 1].url)),
  }
}

export async function allPokemons(parent, args, context, info) {
  console.log('Resolvers::allPokemons')
  const pokemons = await getPokemons({ limit: '151' }).then((pokemons) => pokemonsDtoToPokemons(pokemons))
  const allPokemons = await Promise.all(pokemons.map((pokemon) => context.loaders.pokemons.load(pokemon.id)))
  return _.sortBy(allPokemons, (pokemon) => {
    switch (args.sortBy) {
      case 'HP':
        return pokemonDtoToPokemon(pokemon).stats[0].value
      case 'NAME':
        return pokemon.name
      case 'ID':
      default:
        return parseInt(pokemon.id)
    }
  }).map(pokemonDtoToPokemonBase)
}

export async function pokemonsByIds(parent, { ids }, context, info) {
  console.log('Resolvers::pokemonsByIds', { ids })
  if (Object.keys(graphqlFields(info)).every((field) => ['id', 'name'].indexOf(field) !== -1)) {
    console.log('Resolvers::pokemonsByIds::base', { ids })
    return getPokemons({ limit: '151' }).then((pokemons) =>
      pokemonsDtoToPokemons(pokemons).filter((pokemon) => ids.indexOf(pokemon.id) !== -1),
    )
  }
  console.log('Resolvers::pokemonsByIds::details', { ids })
  return (await Promise.all(ids.map((id) => getPokemonById(id)))).map(pokemonDtoToPokemonBase)
}
