import { useRef } from 'react'
import _ from 'lodash'
import cn from 'classnames'
import {
  useAllPokemonsQuery,
  usePokemonQuery,
  PokemonNodeFragment,
} from '../../infrastructure/graphql/generated/graphql'
import styles from './PokemonList.module.css'
import {
  ForwardedVirtualizedList,
  VirtualizedListRef,
  Image,
  AutoSizer,
  AutoSizerChildrenProps,
  ListItemProps,
  ListItem,
  ExpandableItemsProvider,
  useExpandableItemsContext,
} from '@clearq/ui'

const imagePlaceholder = 'https://via.placeholder.com/150'

const PokemonListItem = ({ item, onClick }: { item: PokemonNodeFragment; onClick: () => void }) => {
  const expandableItems = useExpandableItemsContext<PokemonNodeFragment>()
  const { data, loading } = usePokemonQuery({
    skip: expandableItems.isItemExpanded(item) === false,
    fetchPolicy: 'cache-and-network',
    variables: {
      id: item.id,
    },
  })
  const isExpanded = expandableItems.isItemExpanded(item)
  console.log('data.pokemon', data?.pokemon)
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.wrapper}>
        <Image className={styles.image} src={_.get(item, 'images.main', imagePlaceholder)} alt={item.name} />
        <span>{item.id}</span>
        <span>{item.name}</span>
      </div>
      {isExpanded && (
        <div>
          {loading && <div>Loading...</div>}
          {data && (
            <div>
              <h2>{data.pokemon.name}</h2>
              <div>
                <Image src={_.get(data, 'images.main', imagePlaceholder)} alt={data.pokemon.name} />
              </div>
              <div>
                {data.pokemon.abilities?.map((ability) => (
                  <div key={ability.id}>{ability.name}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const PokemonVirtualizedListItem = ({ className, ...props }: ListItemProps) => {
  return <ListItem {...props} className={cn([className, styles.PokemonVirtualizedListItem])} />
}

const PokemonList = ({ pokemons }: { pokemons: PokemonNodeFragment[] }) => {
  const pokemonListRef = useRef<VirtualizedListRef<PokemonNodeFragment>>(null)
  const expandableItems = useExpandableItemsContext<PokemonNodeFragment>()
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
                pokemonListRef.current?.scrollToItem(props.item)
                expandableItems.toggleItem(props.item)
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
