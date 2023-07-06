import { Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { PokemonsPage, PokemonPage } from '../pages'

const NotFound = () => <div>Not found</div>
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: relayStylePagination(),
        },
      },
      Pokemon: {
        fields: {},
      },
    },
  }),
})

const Pokemons = () => {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/:id" element={<PokemonPage />} />
        <Route path="/" element={<PokemonsPage />} />
        <Route element={<NotFound />} />
      </Routes>
    </ApolloProvider>
  )
}

export default Pokemons
