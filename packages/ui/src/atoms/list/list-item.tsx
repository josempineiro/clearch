import { forwardRef } from 'react'
import cn from 'classnames'
import styles from './list-item.module.css'

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  active?: boolean
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(({ children, className, active, ...rest }, ref) => {
  return (
    <li
      ref={ref}
      className={cn(className, styles['list-item'], {
        [styles['active']]: active,
      })}
      {...rest}
    >
      {children}
    </li>
  )
})

export default ListItem
