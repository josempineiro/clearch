import cn from 'classnames'
import { ListItemProps, ListItem } from '@clearq/ui'
import styles from './PokemonVirtualizedListItem.module.css'

export const PokemonVirtualizedListItem = ({ className, ...props }: ListItemProps) => {
  return <ListItem {...props} className={cn([className, styles.PokemonVirtualizedListItem])} />
}
