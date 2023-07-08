import { memo } from 'react'
import _ from 'lodash'
import cn from 'classnames'
import { ListItem, RenderItemProps, Image, useExpandableItemsContext, Tag } from '@clearq/ui'
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
        className={cn([className, styles.item, { [styles.expanded]: isExpanded }])}
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
                  <label>
                    abilities:
                    {data.pokemon.details?.abilities?.map((ability) => (
                      <Tag key={ability.id} variant="primary">
                        {ability.name}
                      </Tag>
                    ))}
                  </label>
                </div>
                <div>
                  <label>
                    stats:
                    {data.pokemon.details?.stats?.map((stat) => (
                      <Tag key={stat.id} variant="primary">
                        {stat.name} - {stat.value}
                      </Tag>
                    ))}
                  </label>
                </div>
                <div>
                  <label>
                    height:
                    <Tag variant="primary">{data.pokemon.details?.height}</Tag>
                  </label>
                </div>
                <div>
                  <label>
                    weight:
                    <Tag variant="primary">{data.pokemon.details?.weight}</Tag>
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
      </ListItem>
    )
  },
)
