import cn from 'classnames'
import styles from './bar.module.css'

export interface BarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'fixed' | 'sticky' | 'static'
  position?: 'top' | 'bottom'
  size?: 's' | 'm' | 'l'
}

export const Bar = ({ children, className, variant = 'static', position = 'top', size = 'm', ...rest }: BarProps) => {
  return (
    <nav className={cn([className, styles['bar'], styles[size], styles[variant], styles[position]])} {...rest}>
      {children}
    </nav>
  )
}
