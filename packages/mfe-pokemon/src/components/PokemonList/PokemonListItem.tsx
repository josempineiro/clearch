import React, { memo, createContext } from 'react'
import _ from 'lodash'
import cn from 'classnames'
import {
  ListItem,
  RenderItemProps,
  Image,
  Button,
  useExpandableItemsContext,
  Tag,
  Container,
  List,
  Text,
  Tooltip,
} from '@clearq/ui'
import { usePokemonQuery, PokemonNodeFragment } from '../../infrastructure/graphql/generated/graphql'
import styles from './PokemonListItem.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { StatsChart } from '../StatsChart/'
interface TabsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  children: React.ReactNode
  active?: string
  onChange: (id: string) => void
}

export interface TabItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  id: string
}

interface TabsContextValue {
  active?: string
  onChange: (id: string) => void
}

const TabsContext = createContext<TabsContextValue>({
  active: undefined,
  onChange: () => undefined,
})

export function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (context === undefined) {
    throw new Error('useTabsContext must be used within a Tabs')
  }
  return context as TabsContextValue
}

export function TabItem({ children, className, id, ...rest }: TabItemProps) {
  const { active, onChange } = useTabsContext()
  return (
    <li
      className={cn(styles.tab, className, { [styles.active]: active === id })}
      onClick={() => {
        onChange(id)
      }}
      {...rest}
    >
      {children}
    </li>
  )
}

export function TabItems({ children, className, ...rest }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn(styles.tabItems, className)} {...rest}>
      {children}
    </ul>
  )
}
export function Tabs({ children, className, active, onChange = () => undefined, ...rest }: TabsProps) {
  return (
    <TabsContext.Provider
      value={{
        active,
        onChange,
      }}
    >
      <nav className={cn(styles.tabsNav, className)} {...rest}>
        {children}
      </nav>
    </TabsContext.Provider>
  )
}

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
    const navigate = useNavigate()
    const params = useParams()
    return (
      <ListItem
        key={item.id}
        className={cn([className, styles.item, { [styles.expanded]: isExpanded }])}
        onClick={() => {
          if (!isExpanded) {
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
        {isExpanded && (
          <Button
            className={styles['close-button']}
            variant="secondary"
            onClick={() => {
              expandableItems.toggleItem(item)
            }}
          >
            <Text>❌</Text>
          </Button>
        )}
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
                <Tabs
                  active={params.tab}
                  onChange={(tab) => {
                    console.log(tab)
                    navigate(`/${item.id}/${tab}`)
                  }}
                >
                  <TabItems>
                    <TabItem id="about">About</TabItem>
                    <TabItem id="stats">Stats</TabItem>
                    <Tooltip trigger="hover" target={<TabItem id="moves">Moves</TabItem>}>
                      <List direction="row">
                        <ListItem>Coming soon</ListItem>
                      </List>
                    </Tooltip>
                  </TabItems>
                </Tabs>
                <AnimatePresence>
                  <Routes>
                    <Route path={`/about`} element={<div>Moves</div>} />
                    <Route path={`/:id/about`} element={<div>Stats</div>} />
                    <Route path={`/pokemons/:id/about`} element={<div>About</div>} />
                  </Routes>
                </AnimatePresence>
                <Container padding={['m', '0']}>
                  <Text transform="capitalize">abilities:</Text>
                  <List direction="row">
                    {data.pokemon.details?.abilities?.map((ability) => (
                      <Tooltip
                        key={ability.id}
                        trigger="hover"
                        target={
                          <Tag key={ability.id} variant="primary">
                            {ability.name}
                          </Tag>
                        }
                      >
                        <List>
                          {ability.effects.map((effect) => (
                            <ListItem key={effect}>{effect}</ListItem>
                          ))}
                        </List>
                      </Tooltip>
                    ))}
                  </List>
                </Container>
                <>
                  <Container padding="xl">
                    {data.pokemon.details?.stats && <StatsChart stats={data.pokemon.details.stats} />}
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
