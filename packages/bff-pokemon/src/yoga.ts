import { createYoga, createSchema } from 'graphql-yoga'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { readFileSync } from 'fs'
import pokemon, { abilities } from './resolvers/pokemon'
import { pokemons } from './resolvers/pokemons'
import { trainers, trainerPokemons } from './resolvers/trainers'
import type { ServerContext } from './types'

export const typeDefs = readFileSync(
  '/Users/jmpineiro/workspace/dev/leman/clearq/packages/bff-pokemon/src/schema.graphql',
  { encoding: 'utf-8' },
)

const resolvers = {
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

export const yoga = createYoga<ServerContext>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: {
    pokemons: undefined,
    pokemonByIds: {},
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
