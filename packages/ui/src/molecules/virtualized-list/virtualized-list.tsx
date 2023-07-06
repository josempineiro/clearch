import React, { useMemo, useCallback, useRef } from 'react'
import { List, ListItem, ListProps, ListItemProps } from '@/atoms/list'
import styles from './virtualized-list.module.css'

type VirtualizedListState = {
  scrollPosition: number
  height: number
}

export interface VirtualizedListProps<TItem> extends Omit<ListProps, 'children'> {
  height: number
  items: Array<TItem>
  threshold?: number
  renderItem: ({
    item,
    meta,
    state,
  }: {
    item: TItem
    meta: VirtualizedItemMetadata
    state: VirtualizedListState
  }) => React.ReactNode
  getItemKey: (item: TItem) => string
  getItemHeight: (item: TItem, state: VirtualizedListState) => number
  onVisibleItemsChange?: (visibleItems: Array<TItem>) => void
  VirtualizedListItem?: React.FC<ListItemProps>
}

export interface VirtualizedItemMetadata {
  height: number
  top: number
}

export interface VirtualizedItem<TItem> {
  data: TItem
  meta: VirtualizedItemMetadata
}

export type VirtualizedListRef<TItem> = {
  state: VirtualizedListState
  scrollToTop: () => void
  scrollToItem: (item: TItem) => void
}

export function VirtualizedList<TItem>(
  {
    items,
    getItemKey,
    renderItem,
    threshold = 0,
    onVisibleItemsChange,
    getItemHeight,
    VirtualizedListItem = ListItem,
    height,
    ...rest
  }: VirtualizedListProps<TItem>,
  ref?: React.Ref<VirtualizedListRef<TItem>>,
) {
  console.log(ref)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = React.useState(0)

  const state = useMemo<VirtualizedListState>(() => {
    return {
      scrollPosition,
      height,
    }
  }, [scrollPosition, height])

  const virtualizedItems = useMemo(() => {
    return items.reduce<Array<VirtualizedItem<TItem>>>((virtualizedItems, item, index) => {
      const previousItem = virtualizedItems[index - 1]
      return [
        ...virtualizedItems,
        {
          data: item,
          meta: {
            height: getItemHeight(item, state),
            top: previousItem ? previousItem.meta.top + previousItem.meta.height : 0,
          },
        },
      ]
    }, [])
  }, [items, getItemHeight, state])

  const visibleVirtualizedItems = useMemo(() => {
    return virtualizedItems.filter((virtualizedItem) => {
      const itemTop = virtualizedItem.meta.top
      const itemBottom = itemTop + virtualizedItem.meta.height
      return itemBottom >= scrollPosition && itemTop <= scrollPosition + height
    })
  }, [virtualizedItems, scrollPosition, height])

  const renderableVirtualizedItems = useMemo(() => {
    const startIndex = Math.max(0, virtualizedItems.indexOf(visibleVirtualizedItems[0]) - threshold)
    const endIndex = Math.min(
      virtualizedItems.length,
      virtualizedItems.indexOf(visibleVirtualizedItems[visibleVirtualizedItems.length - 1]) + threshold + 1,
    )
    return virtualizedItems.slice(startIndex, endIndex)
  }, [virtualizedItems, visibleVirtualizedItems, threshold])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget
    setScrollPosition(scrollTop)
  }
  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const scrollToItem = useCallback(
    (item: TItem) => {
      if (scrollRef.current) {
        const index = items.indexOf(item)
        const virtualizedItem = virtualizedItems[index]
        scrollRef.current.scrollTo({ top: virtualizedItem.meta.top, behavior: 'smooth' })
      }
    },
    [items, virtualizedItems],
  )

  React.useImperativeHandle(
    ref,
    () => ({
      state,
      scrollToTop,
      scrollToItem,
    }),
    [scrollToTop, state, scrollToItem],
  )

  React.useEffect(() => {
    if (onVisibleItemsChange) {
      onVisibleItemsChange(renderableVirtualizedItems.map(({ data }) => data))
    }
  }, [renderableVirtualizedItems, onVisibleItemsChange])

  return (
    <div
      className={styles.container}
      ref={scrollRef}
      style={{
        height,
      }}
      onScroll={handleScroll}
    >
      <List
        {...rest}
        className={styles.virtualizedList}
        style={{
          ...rest.style,
          height: items.reduce((acc, item) => acc + getItemHeight(item, state), 0),
        }}
      >
        {renderableVirtualizedItems.map(({ data, meta }) => (
          <VirtualizedListItem
            key={getItemKey(data)}
            className={styles.virtualizedListItem}
            style={{
              height: meta.height,
              top: meta.top,
            }}
          >
            {renderItem({ item: data, meta, state })}
          </VirtualizedListItem>
        ))}
      </List>
    </div>
  )
}

export const ForwardedVirtualizedList = React.forwardRef(VirtualizedList) as <TItem>(
  props: VirtualizedListProps<TItem> & { ref?: React.ForwardedRef<VirtualizedListRef<TItem>> },
) => ReturnType<typeof VirtualizedList<TItem>>

export default VirtualizedList
