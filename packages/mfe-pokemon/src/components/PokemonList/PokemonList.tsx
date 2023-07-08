import { useRef } from 'react'
import { useAllPokemonsQuery, PokemonNodeFragment } from '../../infrastructure/graphql/generated/graphql'
import {
  ForwardedVirtualizedList,
  VirtualizedListRef,
  AutoSizer,
  AutoSizerChildrenProps,
  ExpandableItemsProvider,
} from '@clearq/ui'
import { PokemonListItem } from './PokemonListItem'

const PokemonList = ({ pokemons }: { pokemons: PokemonNodeFragment[] }) => {
  const pokemonListRef = useRef<VirtualizedListRef<PokemonNodeFragment>>(null)
  return (
    <AutoSizer>
      {({ height }: AutoSizerChildrenProps) => (
        <ForwardedVirtualizedList<PokemonNodeFragment>
          ref={pokemonListRef}
          height={height}
          threshold={10}
          items={pokemons}
          renderItem={(props) => <PokemonListItem {...props} />}
          getItemKey={(pokemon) => pokemon.id}
          getItemHeight={() => 64}
        />
      )}
    </AutoSizer>
  )
}

const ExpandablePokemonList = () => {
  const allPokemonsQuery = useAllPokemonsQuery()

  const { data, loading, error } = allPokemonsQuery

  if (loading) {
    return <div>Loading pokemon...</div>
  }
  if (error || !data) {
    return <p>Error loading pokemon...</p>
  }
  return (
    <ExpandableItemsProvider<PokemonNodeFragment> items={data.pokemons} getItemId={(pokemon) => pokemon.id}>
      <PokemonList pokemons={data.pokemons} />
    </ExpandableItemsProvider>
  )
}

export default ExpandablePokemonList
