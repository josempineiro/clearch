import pokemon, { abilities, details, images } from './pokemon'
import {
  allPokemons,
  pokemons,
  pokemonsConnetionEdges,
  pokemonsConnetionPageInfo,
  pokemonEdgeNode,
  pokemonsByIds,
} from './pokemons'
import { trainers, trainerPokemons } from './trainers'

export default {
  Query: {
    allPokemons,
    pokemons,
    pokemon,
    trainers,
    pokemonsByIds,
  },
  Pokemon: {
    details,
  },
  Trainer: {
    pokemons: trainerPokemons,
  },
  PokemonsConnection: {
    edges: pokemonsConnetionEdges,
    pageInfo: pokemonsConnetionPageInfo,
  },
  PokemonEdge: {
    node: pokemonEdgeNode,
  },
  PokemonDetails: {
    abilities,
    images,
  },
}
