import { Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { PokemonsPage } from '../pages'

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

export const Pokemons = () => {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path={'/'} Component={PokemonsPage} />
        <Route element={<NotFound />} />
      </Routes>
    </ApolloProvider>
  )
}

export default Pokemons
