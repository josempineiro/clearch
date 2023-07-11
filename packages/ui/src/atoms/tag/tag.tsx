import React, { forwardRef, ForwardedRef } from 'react'
import cn from 'classnames'
import styles from './tag.module.css'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, children, variant = 'secondary', ...rest }: TagProps, ref?: ForwardedRef<HTMLSpanElement>) => {
    return (
      <span ref={ref} className={cn(className, styles.tag, { [styles[variant]]: true })} {...rest}>
        {children}
      </span>
    )
  },
)
