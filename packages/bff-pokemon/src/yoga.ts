import { createYoga, createSchema } from 'graphql-yoga'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { readFileSync } from 'fs'
import Dataloader from 'dataloader'
import resolvers from './resolvers'
import type { ServerContext } from './types'
import { getPokemonsByIds, getAbilitiesByIds } from './poke-api'

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
      pokemons: new Dataloader(async (pokemonIds) => {
        return await getPokemonsByIds(pokemonIds)
      }),
      abilities: new Dataloader(async (abilityIds) => {
        return await getAbilitiesByIds(abilityIds)
      }),
    },
  },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  plugins: [useDeferStream()],
  renderGraphiQL,
  graphiql: {
    defaultQuery: `
      query {
        trainers {
          id
          name
          pokemons {
            id
          }
        }
      }
        
      query {
        pokemons @stream {
          id
          name
          ... @defer {
            abilities {
              id
              name
            }
          }
        }
      }
    `.replace(/\n {6}/g, '\n'),
  },
})
