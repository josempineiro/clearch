import React, { useMemo, useCallback, useRef, Fragment } from 'react'
import { List, ListProps, ListItemProps } from '@/atoms/list'
import { Scrollable } from '@/atoms/scrollable'
import styles from './virtualized-list.module.css'

export type VirtualizedListState = {
  scrollPosition: number
  height: number
}

export interface RenderItemProps<TItem> extends Omit<ListItemProps, 'children'> {
  item: TItem
  list: VirtualizedListRef<TItem>
}

export interface VirtualizedListProps<TItem> extends Omit<ListProps, 'children'> {
  height: number
  items: Array<TItem>
  threshold?: number
  renderItem: (props: RenderItemProps<TItem>) => React.ReactNode
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

export type VirtualizedListApi<TItem> = {
  scrollToTop: () => void
  scrollToItem: (item: TItem) => void
  scrollToPosition: (position: number) => void
}

export type VirtualizedListRef<TItem> = {
  state: VirtualizedListState
  api: VirtualizedListApi<TItem>
}

export function VirtualizedList<TItem>(
  {
    items,
    getItemKey,
    renderItem,
    threshold = 0,
    onVisibleItemsChange,
    getItemHeight,
    height,
    ...rest
  }: VirtualizedListProps<TItem>,
  ref?: React.Ref<VirtualizedListRef<TItem>>,
) {
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

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget
    setScrollPosition(scrollTop)
  }, [])

  const scrollTo = useCallback(({ top, behavior }: { top: number; behavior?: ScrollBehavior }) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top, behavior })
    }
  }, [])

  const scrollToTop = useCallback(
    (behavior: ScrollBehavior = 'smooth') => {
      scrollTo({ top: 0, behavior })
    },
    [scrollTo],
  )

  const scrollToItem = useCallback(
    (item: TItem, behavior: ScrollBehavior = 'smooth') => {
      if (scrollRef.current) {
        const virtualizedItem = virtualizedItems[items.indexOf(item)]
        scrollTo({ top: virtualizedItem.meta.top, behavior })
      }
    },
    [items, scrollTo, virtualizedItems],
  )

  const scrollToPosition = useCallback(
    (position: number, behavior: ScrollBehavior = 'smooth') => {
      if (scrollRef.current) {
        scrollTo({ top: position, behavior })
      }
    },
    [scrollTo],
  )

  const list = useMemo(
    () => ({
      state,
      api: {
        scrollToTop,
        scrollToItem,
        scrollToPosition,
      },
    }),
    [scrollToTop, state, scrollToItem, scrollToPosition],
  )

  React.useImperativeHandle(ref, () => list, [list])

  React.useEffect(() => {
    if (onVisibleItemsChange) {
      onVisibleItemsChange(renderableVirtualizedItems.map(({ data }) => data))
    }
  }, [renderableVirtualizedItems, onVisibleItemsChange])

  return (
    <Scrollable
      ref={scrollRef}
      style={{
        height,
      }}
      className={styles.container}
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
          <Fragment key={getItemKey(data)}>
            {renderItem({
              item: data,
              list,
              style: { height: meta.height, top: meta.top },
              className: styles.virtualizedListItemContent,
            })}
          </Fragment>
        ))}
      </List>
    </Scrollable>
  )
}

export const ForwardedVirtualizedList = React.forwardRef(VirtualizedList) as <TItem>(
  props: VirtualizedListProps<TItem> & { ref?: React.ForwardedRef<VirtualizedListRef<TItem>> },
) => ReturnType<typeof VirtualizedList<TItem>>

export default VirtualizedList
