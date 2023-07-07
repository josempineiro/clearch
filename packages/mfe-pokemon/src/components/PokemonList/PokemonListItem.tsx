import { memo } from 'react'
import _ from 'lodash'
import cn from 'classnames'
import { usePokemonQuery, PokemonNodeFragment } from '../../infrastructure/graphql/generated/graphql'
import styles from './PokemonList.module.css'
import { Image, useExpandableItemsContext } from '@clearq/ui'

export const PokemonListItem = memo(({ item, onClick }: { item: PokemonNodeFragment; onClick: () => void }) => {
  const expandableItems = useExpandableItemsContext<PokemonNodeFragment>()
  const { data, loading } = usePokemonQuery({
    skip: expandableItems.isItemExpanded(item) === false,
    fetchPolicy: 'cache-and-network',
    variables: {
      id: item.id,
    },
  })
  const isExpanded = expandableItems.isItemExpanded(item)
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.wrapper}>
        <Image
          height={isExpanded ? 300 : 48}
          width={isExpanded ? 300 : 48}
          objectFit="contain"
          className={styles.image}
          src={_.get(item, 'images.main')}
          alt={item.name}
        />
        <div className={cn(styles.title)}>
          <span>{item.id}</span>
          <span>{item.name}</span>
        </div>
      </div>
      {isExpanded && (
        <div>
          {loading && <div>Loading...</div>}
          {data && (
            <div>
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
})
