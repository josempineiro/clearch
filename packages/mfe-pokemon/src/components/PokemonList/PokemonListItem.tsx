import { memo } from 'react'
import _ from 'lodash'
import cn from 'classnames'
import { ListItem, RenderItemProps, Image, useExpandableItemsContext } from '@clearq/ui'
import { usePokemonQuery, PokemonNodeFragment } from '../../infrastructure/graphql/generated/graphql'
import styles from './PokemonListItem.module.css'

export const PokemonListItem = memo(
  ({ item, list, className, style, ...rest }: RenderItemProps<PokemonNodeFragment>) => {
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
      <ListItem
        key={item.id}
        className={cn([className, styles.item, styles.expanded])}
        onClick={() => {
          expandableItems.toggleItem(item)
        }}
        tabIndex={-1}
        {...rest}
        style={{
          ...style,
          position: 'absolute',
          top: isExpanded ? list.state.scrollPosition : style.top,
          bottom: isExpanded ? list.state.scrollPosition + list.state.height : style.top + style.height,
          height: isExpanded ? list.state.height : style.height,
        }}
      >
        <div className={styles.wrapper}>
          <Image
            height={isExpanded ? 300 : 48}
            width={isExpanded ? 300 : 48}
            objectFit="contain"
            className={styles.image}
            src={_.get(item, 'image')}
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
                  {data.pokemon.details?.abilities?.map((ability) => (
                    <div key={ability.id}>{ability.name}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </ListItem>
    )
  },
)
