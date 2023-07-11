import PokemonList from '../components/PokemonList/PokemonList'
import { useParams, useNavigate } from 'react-router-dom'
import { useAllPokemonsQuery, PokemonNodeFragment } from '../infrastructure/graphql/generated/graphql'
import { ExpandableItemsProvider } from '@clearq/ui'

const getPokemonId = (pokemon: PokemonNodeFragment) => pokemon.id
type PokemonsPageParams = {
  id?: string
}

const PokemonsPage = () => {
  const { id } = useParams<PokemonsPageParams>()
  const navigate = useNavigate()

  const allPokemonsQuery = useAllPokemonsQuery()
  const { data, loading, error } = allPokemonsQuery
  if (loading) {
    return <div>Loading pokemon...</div>
  }
  if (error || !data) {
    return <p>Error loading pokemon...</p>
  }
  return (
    <ExpandableItemsProvider<PokemonNodeFragment>
      onToggleItem={(item, isExpanded) => {
        if (isExpanded) {
          navigate(`/${getPokemonId(item)}`)
        } else {
          navigate('/')
        }
      }}
      initialExpandedItems={data.pokemons.filter((pokemon) => getPokemonId(pokemon) === id)}
      items={data.pokemons}
      getItemId={getPokemonId}
    >
      <PokemonList pokemons={data.pokemons} />
    </ExpandableItemsProvider>
  )
}

export default PokemonsPage
