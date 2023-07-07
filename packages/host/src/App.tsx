import { Routes, Route } from 'react-router-dom'
import { RemotePokemons } from './remotes'
import { Layout, Header } from '@clearq/ui'

function App() {
  return (
    <Layout
      header={
        <Header>
          <span>Host</span>
        </Header>
      }
    >
      <Routes>
        <Route path="/pokemons/*" element={<RemotePokemons />} />
      </Routes>
    </Layout>
  )
}

export default App
