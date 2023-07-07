import { useRef } from 'react'
import { useAllPokemonsQuery, PokemonNodeFragment } from '../../infrastructure/graphql/generated/graphql'
import {
  ForwardedVirtualizedList,
  VirtualizedListRef,
  AutoSizer,
  AutoSizerChildrenProps,
  ExpandableItemsProvider,
  useExpandableItemsContext,
} from '@clearq/ui'
import { PokemonListItem } from './PokemonListItem'
import { PokemonVirtualizedListItem } from './PokemonVirtualizedListItem'

const PokemonList = ({ pokemons }: { pokemons: PokemonNodeFragment[] }) => {
  const pokemonListRef = useRef<VirtualizedListRef<PokemonNodeFragment>>(null)
  const expandableItems = useExpandableItemsContext<PokemonNodeFragment>()
  const scrollPosition = useRef<number>(0)
  return (
    <AutoSizer>
      {({ height }: AutoSizerChildrenProps) => (
        <ForwardedVirtualizedList<PokemonNodeFragment>
          ref={pokemonListRef}
          height={height}
          threshold={10}
          items={pokemons}
          renderItem={(props) => (
            <PokemonListItem
              {...props}
              onClick={() => {
                expandableItems.toggleItem(props.item)
                if (expandableItems.isItemExpanded(props.item)) {
                  pokemonListRef.current?.scrollToPosition(scrollPosition.current)
                } else {
                  scrollPosition.current = props.state.scrollPosition
                  pokemonListRef.current?.scrollToItem(props.item)
                }
              }}
            />
          )}
          getItemKey={(pokemon) => pokemon.id}
          getItemHeight={(item, { height }) => {
            if (expandableItems?.isItemExpanded(item)) {
              return height
            }
            return 64
          }}
          VirtualizedListItem={PokemonVirtualizedListItem}
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
