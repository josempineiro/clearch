import { useCallback, useState, useMemo, createContext, useContext } from 'react'
import type { ItemsContextValue, ItemsProviderProps } from '../items-context'

export interface ExpandableItemsContextValue<TItem = any> extends ItemsContextValue<TItem> {
  expandedItems: Array<TItem>
  toggleItem: (item: TItem) => void
  toggleAllItems: () => void
  isItemExpanded: (item: TItem) => boolean
  isEachItemExpanded: boolean
}

export interface ExpandableItemsProviderProps<TItem = any> extends ItemsProviderProps<TItem> {
  initialExpandedItems?: Array<TItem>
  onToggleItem?: (item: TItem, isExpanded: boolean, expandedItems: Array<TItem>) => void
  children: React.ReactNode
}

export const ExpandableItemsContext = createContext<ExpandableItemsContextValue | undefined>(undefined)

export function useExpandableItemsContext<TItem>() {
  const context = useContext(ExpandableItemsContext)
  if (context === undefined) {
    throw new Error('useExpandableItemsContext must be used within a ExpandableItemsProvider')
  }
  return context as ExpandableItemsContextValue<TItem>
}

export function ExpandableItemsProvider<TItem>({
  items,
  getItemId,
  children,
  initialExpandedItems,
  onToggleItem,
}: ExpandableItemsProviderProps<TItem>) {
  const [expandedItemIds, setExpandedItemIds] = useState<Array<string>>(
    initialExpandedItems?.map((initialExpandedItem) => getItemId(initialExpandedItem)) || [],
  )

  const isItemExpanded = useCallback(
    (item: TItem) => expandedItemIds.indexOf(getItemId(item)) !== -1,
    [expandedItemIds, getItemId],
  )

  const expandedItems = useMemo(() => items.filter(isItemExpanded), [items, isItemExpanded])

  const toggleItem = useCallback(
    (item: TItem) => {
      const isExpanded = isItemExpanded(item)
      const newExpandedItems = isExpanded
        ? expandedItemIds.filter((expandedItemId) => expandedItemId !== getItemId(item))
        : [...expandedItemIds, getItemId(item)]

      setExpandedItemIds(newExpandedItems)
      onToggleItem?.(item, !isExpanded, expandedItems)
    },
    [isItemExpanded, expandedItemIds, getItemId, onToggleItem, expandedItems],
  )

  const toggleAllItems = useCallback(() => {
    setExpandedItemIds(items.map(getItemId))
  }, [getItemId, items])

  const isEachItemExpanded = items.every(isItemExpanded)
  return (
    <ExpandableItemsContext.Provider
      value={{
        items,
        getItemId,
        expandedItems,
        toggleItem,
        toggleAllItems,
        isItemExpanded,
        isEachItemExpanded,
      }}
    >
      {children}
    </ExpandableItemsContext.Provider>
  )
}
