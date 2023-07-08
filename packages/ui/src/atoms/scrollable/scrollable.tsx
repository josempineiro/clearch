import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './scrollable.module.css'

export interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Scrollable = forwardRef<HTMLDivElement, ScrollableProps>(function (
  props: ScrollableProps,
  ref?: React.ForwardedRef<HTMLDivElement>,
) {
  const { children, className, ...rest } = props
  return (
    <div ref={ref} className={cn(styles.scrollable, className)} {...rest}>
      {children}
    </div>
  )
})
