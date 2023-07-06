import { Routes, Route } from 'react-router-dom'
import { RemotePokemons } from './remotes'
import { Layout } from '@clearq/ui'

function App() {
  return (
    <Layout>
      <header>
        <h1>Host</h1>
      </header>
      <Routes>
        <Route path="/pokemons/*" element={<RemotePokemons />} />
      </Routes>
    </Layout>
  )
}

export default App
