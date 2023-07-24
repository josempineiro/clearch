import { forwardRef } from 'react'
import styles from './icon.module.css'
import cn from 'classnames'

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 's' | 'm' | 'l'
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ className, size = 'm', ...props }, ref) => {
  return (
    <svg
      {...props}
      className={cn(className, styles['icon'], {
        [styles[size]]: true,
      })}
      ref={ref}
    />
  )
})
