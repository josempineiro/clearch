import { Routes, Link, Route, useLocation } from 'react-router-dom'
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
        <Route path={':id?/*'} Component={PokemonsPage} />
        <Route element={<NotFound />} />
      </Routes>
    </ApolloProvider>
  )
}

const Post = () => {
  const { pathname } = useLocation()
  return (
    <>
      <h1>Posts</h1>
      <p>{pathname}</p>
      <div>
        <Routes>
          <Route path="/" element={<div>HOME</div>} />
          <Route path="/new" element={<div>NEW POST</div>} />
          <Route path="/:id" element={<div>POST DETAILS</div>} />
          <Route path="/:id/comments" element={<div>COMMENTS</div>} />
        </Routes>
      </div>
    </>
  )
}

export const Abs = () => (
  <>
    <nav>
      <li>
        <Link to="/posts/">posts</Link>
      </li>
      <li>
        <Link to="/posts/new">new</Link>
      </li>
      <li>
        <Link to="/posts/1234">post</Link>
      </li>
      <li>
        <Link to="/posts/1234/comments">post comments</Link>
      </li>
    </nav>
    <Routes>
      <Route path="/" element={<div>HOME</div>} />
      <Route path="about" element={<div>about</div>} />
      <Route path="posts/*" Component={Post} />
    </Routes>
  </>
)

export default Pokemons
