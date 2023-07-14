import cn from 'classnames'
import styles from './list-item.module.css'

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  active?: boolean
}

export const ListItem: React.FC<ListItemProps> = ({ children, className, active, ...rest }) => {
  return (
    <li
      className={cn(className, styles['list-item'], {
        [styles['active']]: active,
      })}
      {...rest}
    >
      {children}
    </li>
  )
}
export default ListItem
