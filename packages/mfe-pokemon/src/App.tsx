import './App.css'
import Pokemons from './modules/Pokemons'
import { BrowserRouter } from 'react-router-dom'
import { Layout, Header } from '@clearq/ui'

function App() {
  return (
    <BrowserRouter basename="/pokemons">
      <Layout header={<Header />}>
        <Pokemons />
      </Layout>
    </BrowserRouter>
  )
}

export default App
