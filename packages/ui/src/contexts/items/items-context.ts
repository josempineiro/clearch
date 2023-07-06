export interface ItemsContextValue<TItem> {
  items: Array<TItem>
  getItemId: (item: TItem) => string
}

export interface ItemsProviderProps<TItem> {
  items: Array<TItem>
  getItemId: (item: TItem) => string
  children: React.ReactNode
}
