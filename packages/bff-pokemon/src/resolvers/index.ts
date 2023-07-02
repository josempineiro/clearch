import pokemon, { abilities } from './pokemon'
import { pokemons } from './pokemons'
import { trainers, trainerPokemons } from './trainers'

export default {
  Query: {
    pokemons,
    pokemon,
    trainers,
  },
  Pokemon: {
    abilities,
  },
  Trainer: {
    pokemons: trainerPokemons,
  },
}
