import { useState, useMemo, useCallback, useRef, createContext, useContext, useEffect } from 'react'
import type { ItemsContextValue, ItemsProviderProps } from '../items-context'

export interface SearchableItemsContextValue<TItem = any> extends ItemsContextValue<TItem> {
  matches: TItem[]
  match: (TItem: TItem) => boolean
  next: () => void
  previous: () => void
  isCurrent: (item: TItem) => boolean
  current?: TItem
}

type CurrentChangeFn<TItem> = (current: TItem | undefined) => void

export interface SearchableItemsProviderProps<TItem = any> extends ItemsProviderProps<TItem> {
  match: (item: TItem) => boolean
  initialCurrentId?: string
  onCurrentChange: CurrentChangeFn<TItem>
}

export const SearchableItemsContext = createContext<SearchableItemsContextValue | undefined>(undefined)

export function useSearchableItemsContext<TItem>() {
  const context = useContext(SearchableItemsContext)
  if (context === undefined) {
    throw new Error('useSearchableItemsContext must be used within a SearchableItemsProvider')
  }
  return context as SearchableItemsContextValue<TItem>
}

export function SearchableItemsProvider<TItem>({
  initialCurrentId = undefined,
  items,
  getItemId,
  children,
  match,
  onCurrentChange,
}: SearchableItemsProviderProps<TItem>) {
  const [currentId, setCurrentId] = useState(initialCurrentId)

  const matches = useMemo(() => items.filter(match), [items, match])

  const current = useMemo(() => matches.find((item) => getItemId(item) === currentId), [currentId, matches, getItemId])

  const isCurrent = useCallback((item: TItem) => getItemId(item) === currentId, [currentId, getItemId])

  const next = useCallback(() => {
    const index = matches.findIndex((item) => getItemId(item) === currentId)
    if (index !== -1 && matches[index + 1]) {
      setCurrentId(getItemId(matches[index + 1]))
    }
  }, [currentId, getItemId, matches])

  const previous = useCallback(() => {
    const index = matches.findIndex((item) => getItemId(item) === currentId)
    if (index !== -1 && matches[index - 1]) {
      setCurrentId(getItemId(matches[index - 1]))
    }
  }, [currentId, getItemId, matches])

  useEffect(() => {
    setCurrentId(matches[0] ? getItemId(matches[0]) : undefined)
  }, [getItemId, matches])

  const currentChangeRef = useRef<CurrentChangeFn<TItem> | undefined>()

  useEffect(() => {
    if (currentChangeRef.current) {
      currentChangeRef.current(current)
    }
  }, [current])

  useEffect(() => {
    currentChangeRef.current = onCurrentChange
  }, [onCurrentChange])

  return (
    <SearchableItemsContext.Provider
      value={useMemo(
        () => ({
          items,
          getItemId,
          matches,
          next,
          previous,
          match,
          current,
          isCurrent,
        }),
        [items, getItemId, matches, next, previous, match, current, isCurrent],
      )}
    >
      {children}
    </SearchableItemsContext.Provider>
  )
}
