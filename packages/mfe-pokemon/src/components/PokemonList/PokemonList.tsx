import { useRef } from 'react'
import { PokemonNodeFragment } from '../../infrastructure/graphql/generated/graphql'
import {
  ForwardedVirtualizedList,
  VirtualizedListRef,
  AutoSizer,
  AutoSizerChildrenProps,
  useExpandableItemsContext,
} from '@clearq/ui'
import { PokemonListItem } from './PokemonListItem'

const PokemonList = ({ pokemons }: { pokemons: PokemonNodeFragment[] }) => {
  const pokemonListRef = useRef<VirtualizedListRef<PokemonNodeFragment>>(null)
  const expandableItems = useExpandableItemsContext<PokemonNodeFragment>()
  return (
    <AutoSizer>
      {({ height }: AutoSizerChildrenProps) => (
        <ForwardedVirtualizedList<PokemonNodeFragment>
          ref={pokemonListRef}
          height={height}
          locked={expandableItems.expandedItems.length > 0}
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

export default PokemonList
