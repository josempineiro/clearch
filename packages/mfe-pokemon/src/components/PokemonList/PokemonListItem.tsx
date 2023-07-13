import React, { memo } from 'react'
import _ from 'lodash'
import cn from 'classnames'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ListItem,
  RenderItemProps,
  Image,
  Button,
  useExpandableItemsContext,
  Container,
  Text,
  Tabs,
  TabItem,
  TabItems,
} from '@clearq/ui'
import { usePokemonQuery, PokemonNodeFragment } from '@/infrastructure/graphql/generated/graphql'
import { PokemonInfo } from '@/components/PokemonInfo'
import { PokemonStats } from '@/components/PokemonStats'
import styles from './PokemonListItem.module.css'

const TransitionRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
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
                  tabs={
                    <TabItems>
                      <TabItem id="info">About</TabItem>
                      <TabItem id="stats">Stats</TabItem>
                      <TabItem id="moves">Moves</TabItem>
                    </TabItems>
                  }
                  active={params['*'] || 'info'}
                  onChange={(tab) => {
                    navigate(`/${item.id}/${tab}`)
                  }}
                >
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route
                        path={`/:tab?`}
                        Component={() => (
                          <TransitionRoute key="1">
                            <PokemonInfo pokemon={data.pokemon} />
                          </TransitionRoute>
                        )}
                      />
                      <Route
                        path={`stats`}
                        Component={() => (
                          <TransitionRoute key="2">
                            {data.pokemon.details?.stats && <PokemonStats stats={data.pokemon.details.stats} />}
                          </TransitionRoute>
                        )}
                      />
                      <Route
                        path={`moves`}
                        Component={() => (
                          <TransitionRoute key="3">
                            <Container padding={['m', 'none']}>COMING SOON!</Container>
                          </TransitionRoute>
                        )}
                      />
                    </Routes>
                  </AnimatePresence>
                </Tabs>
              </>
            )}
          </>
        )}
      </ListItem>
    )
  },
)
