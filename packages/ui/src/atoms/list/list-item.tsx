import cn from 'classnames'
import styles from './list-item.module.css'

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

export const ListItem: React.FC<ListItemProps> = ({ children, className, ...rest }) => {
  return (
    <li className={cn(styles.listItem, className)} {...rest}>
      {children}
    </li>
  )
}
export default ListItem
