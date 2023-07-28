import { useRef, useEffect } from 'react'
import { PokemonNodeFragment } from '../../infrastructure/graphql/generated/graphql'
import { ForwardedVirtualizedList, VirtualizedListRef, AutoSizer, AutoSizerChildrenProps } from '@clearq/ui'
import { useExpandableItemsContext, useSearchableItemsContext } from '@clearq/core'
import { PokemonListItem } from './PokemonListItem'

export const PokemonList = ({ pokemons }: { pokemons: PokemonNodeFragment[] }) => {
  const pokemonListRef = useRef<VirtualizedListRef<PokemonNodeFragment>>(null)
  const expandableItems = useExpandableItemsContext<PokemonNodeFragment>()
  const { current } = useSearchableItemsContext<PokemonNodeFragment>()
  useEffect(() => {
    if (current && pokemonListRef.current) {
      pokemonListRef.current?.api.scrollToItem(current, {
        position: 'center',
      })
    }
  }, [current])
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
