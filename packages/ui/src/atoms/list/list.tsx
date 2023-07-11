import cn from 'classnames'
import styles from './list.module.css'

export interface ListProps extends React.HTMLProps<HTMLUListElement> {
  children: React.ReactNode
  direction?: 'row' | 'column'
}

export const List: React.FC<ListProps> = ({ children, className, direction = 'column', ...rest }) => {
  return (
    <ul
      className={cn(styles.list, className, {
        [styles[direction]]: true,
      })}
      {...rest}
    >
      {children}
    </ul>
  )
}
export default List
