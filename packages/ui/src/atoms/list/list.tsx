import cn from 'classnames'
import styles from './list.module.css'

export interface ListProps extends React.HTMLProps<HTMLUListElement> {
  children: React.ReactNode
}

export const List: React.FC<ListProps> = ({ children, className, ...rest }) => {
  return (
    <ul className={cn(styles.list, className)} {...rest}>
      {children}
    </ul>
  )
}
export default List
