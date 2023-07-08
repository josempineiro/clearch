import { createYoga, createSchema } from 'graphql-yoga'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { readFileSync } from 'fs'
import Dataloader from 'dataloader'
import resolvers from './resolvers'
import type { ServerContext } from './types'
import { getPokemonsByIds, getAbilitiesByIds, getStatsByIds } from './poke-api'

export const typeDefs = readFileSync(
  '/Users/jmpineiro/workspace/dev/leman/clearq/packages/bff-pokemon/src/schema.graphql',
  { encoding: 'utf-8' },
)

export const yoga = createYoga<ServerContext>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: {
    loaders: {
      stats: new Dataloader(async (statIds) => getStatsByIds(statIds)),
      pokemons: new Dataloader(async (pokemonIds) => getPokemonsByIds(pokemonIds)),
      abilities: new Dataloader(async (abilityIds: string[]) => getAbilitiesByIds(abilityIds)),
    },
  },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  plugins: [useDeferStream()],
  renderGraphiQL,
  graphiql: {
    defaultQuery: `
        
      query {
        allPokemons {
          id
          name
          ... @defer {
            details {
              height
              weight
              abilities {
                id
                name
              }
            }
          }
        }
      }
    `.replace(/\n {6}/g, '\n'),
  },
})
