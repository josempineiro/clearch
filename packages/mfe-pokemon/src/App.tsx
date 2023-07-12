import './App.css'
import Pokemons from './modules/Pokemons'
import { BrowserRouter } from 'react-router-dom'
import { Layout, Text } from '@clearq/ui'

function App() {
  return (
    <BrowserRouter basename="/pokemons">
      <Layout header={<Text>Microfrontend</Text>}>
        <Pokemons />
      </Layout>
    </BrowserRouter>
  )
}

export default App
