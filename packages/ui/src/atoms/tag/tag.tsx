import cn from 'classnames'
import styles from './tag.module.css'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export const Tag: React.FC<TagProps> = ({ className, children, variant = 'secondary', ...rest }: TagProps) => {
  return (
    <span className={cn(className, styles.tag, { [styles[variant]]: true })} {...rest}>
      {children}
    </span>
  )
}
