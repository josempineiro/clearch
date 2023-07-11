import { memo } from 'react'
import _ from 'lodash'
import cn from 'classnames'
import {
  ListItem,
  RenderItemProps,
  Image,
  useExpandableItemsContext,
  Tag,
  Container,
  List,
  Text,
  Tooltip,
} from '@clearq/ui'
import { usePokemonQuery, PokemonNodeFragment } from '../../infrastructure/graphql/generated/graphql'
import styles from './PokemonListItem.module.css'
import { StatsChart } from '../StatsChart/'

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
          if (!isExpanded || isExpanded) {
            expandableItems.toggleItem(item)
          }
        }}
        tabIndex={-1}
        {...rest}
        style={{
          ...style,
          top: isExpanded ? list.state.scrollPosition : style.top,
          bottom: isExpanded ? list.state.scrollPosition + list.state.height : style.top + style.height,
          height: isExpanded ? list.state.height : style.height,
        }}
      >
        <div className={styles.wrapper}>
          <Image
            height={isExpanded ? 200 : 48}
            width={isExpanded ? 200 : 48}
            objectFit="contain"
            aspectRatio={1}
            className={styles.image}
            src={_.get(item, 'image')}
            alt={item.name}
          />
          <Text
            color={isExpanded ? 'primary' : 'tertiary'}
            variant={isExpanded ? 'title' : 'body'}
            className={cn(styles.title)}
          >
            {item.name}
          </Text>
        </div>
        {isExpanded && (
          <>
            {loading && <div>Loading...</div>}
            {data && (
              <>
                <>
                  <Text transform="capitalize">abilities:</Text>
                  <List direction="row">
                    {data.pokemon.details?.abilities?.map((ability) => (
                      <Tag key={ability.id} variant="primary">
                        {ability.name}
                      </Tag>
                    ))}
                  </List>
                </>
                <>
                  <Text transform="capitalize">stats:</Text>
                  {data.pokemon.details?.stats?.map((stat) => (
                    <Tooltip
                      key={stat.id}
                      trigger="hover"
                      target={
                        <Tag key={stat.id} variant="primary">
                          {stat.name} - {stat.value}
                        </Tag>
                      }
                    >
                      <List>
                        {stat.characteristics.map((characteristic) => (
                          <ListItem key={characteristic}>{characteristic}</ListItem>
                        ))}
                      </List>
                    </Tooltip>
                  ))}
                  <Container padding="large">
                    {data.pokemon.details && <StatsChart stats={data.pokemon.details?.stats as any} />}
                  </Container>
                </>
                <>
                  <Text transform="capitalize">height:</Text>
                  <Tag variant="primary">{data.pokemon.details?.height}</Tag>
                </>
                <>
                  <Text transform="capitalize">weight:</Text>
                  <Tag variant="primary">{data.pokemon.details?.weight}</Tag>
                </>
              </>
            )}
          </>
        )}
      </ListItem>
    )
  },
)
