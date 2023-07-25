import { createYoga, createSchema } from 'graphql-yoga'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { readFileSync } from 'fs'
import pino from 'pino'
import Dataloader from 'dataloader'
import resolvers from './resolvers'
import type { ServerContext } from './types'
import { getPokemonsByIds, getAbilitiesByIds, getStatsByIds, getCharacteristicsByIds } from './poke-api'

export const typeDefs = readFileSync(
  '/Users/jmpineiro/workspace/dev/leman/clearq/packages/bff-pokemon/src/schema.graphql',
  { encoding: 'utf-8' },
)

const graphiqlDefaultQuery = `
query {
  pokemon(id: "1") {
    id
    name
    ... @defer {
      details {
        height
        weight
        stats {
          id
          name
          value
          characteristics
        }
        abilities {
          id
          name
          effects
        }
      }
    }
  }
}`

export const yoga = createYoga<ServerContext>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: {
    logger: pino(),
    loaders: {
      stats: new Dataloader(async (statIds) => getStatsByIds(statIds)),
      pokemons: new Dataloader(async (pokemonIds) => getPokemonsByIds(pokemonIds)),
      abilities: new Dataloader(async (abilityIds: string[]) => getAbilitiesByIds(abilityIds)),
      characteristics: new Dataloader(async (characteristicIds: string[]) =>
        getCharacteristicsByIds(characteristicIds),
      ),
    },
  },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  plugins: [useDeferStream()],
  renderGraphiQL,
  graphiql: {
    defaultQuery: graphiqlDefaultQuery,
  },
})
