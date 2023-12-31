import React, { useMemo, useCallback, useRef, Fragment } from 'react'
import { List, ListProps, ListItemProps } from '@/atoms/list'
import { Scrollable, ScrollableProps } from '@/atoms/scrollable'
import styles from './virtualized-list.module.css'

export type VirtualizedListState = {
  scrollPosition: number
  height: number
}

export interface RenderItemProps<TItem> extends Omit<ListItemProps, 'children' | 'style' | 'className'> {
  item: TItem
  list: VirtualizedListRef<TItem>
  style: {
    height: number
    top: number
  }
  className: string
}

export type ScrollPosition = 'start' | 'center' | 'end'
export interface ScrollToOptions {
  behavior?: ScrollBehavior
  position?: ScrollPosition
}

export interface VirtualizedListProps<TItem>
  extends Omit<ListProps, 'children' | 'ref'>,
    Pick<ScrollableProps, 'locked'> {
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
  scrollToTop: (options?: Omit<ScrollToOptions, 'position'>) => void
  scrollToItem: (item: TItem, options?: ScrollToOptions) => void
  scrollToPosition: (position: number, options?: Omit<ScrollToOptions, 'position'>) => void
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
    locked,
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

  const scrollItemPositionToScrollTop = useCallback(
    (item: TItem, position: ScrollPosition) => {
      const virtualizedItem = virtualizedItems[items.indexOf(item)]
      switch (position) {
        case 'start':
          return virtualizedItem.meta.top
        case 'center':
          return virtualizedItem.meta.top - height / 2 + virtualizedItem.meta.height / 2
        case 'end':
          return virtualizedItem.meta.top - height + virtualizedItem.meta.height
      }
    },
    [height, items, virtualizedItems],
  )

  const scrollToTop = useCallback(
    ({ behavior = 'smooth' }: Omit<ScrollToOptions, 'position'> = { behavior: 'smooth' }) => {
      scrollTo({ top: 0, behavior })
    },
    [scrollTo],
  )

  const scrollToItem = useCallback(
    (
      item: TItem,
      { behavior = 'smooth', position = 'start' }: ScrollToOptions = { behavior: 'smooth', position: 'start' },
    ) => {
      if (scrollRef.current) {
        scrollTo({ top: scrollItemPositionToScrollTop(item, position), behavior })
      }
    },
    [scrollItemPositionToScrollTop, scrollTo],
  )

  const scrollToPosition = useCallback(
    (position: number, { behavior = 'smooth' }: Omit<ScrollToOptions, 'position'> = { behavior: 'smooth' }) => {
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
      onScroll={handleScroll}
      locked={locked}
    >
      <List
        {...rest}
        className={styles['virtualized-list']}
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
              className: styles['item'],
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
