import React, { forwardRef, ForwardedRef } from 'react'
import cn from 'classnames'
import styles from './text.module.css'

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  Element?: React.ElementType
  color?: 'primary' | 'secondary' | 'tertiary'
  variant?: 'title' | 'subtitle' | 'body' | 'caption'
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces'
}

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      className,
      children,
      variant = 'body',
      Element = 'span',
      color = 'secondary',
      transform,
      whiteSpace = 'normal',
      ...rest
    }: TextProps,
    ref?: ForwardedRef<HTMLSpanElement>,
  ) => {
    return (
      <Element
        ref={ref}
        className={cn(className, styles.text, {
          [styles[variant]]: true,
          [styles[color]]: true,
          [styles[whiteSpace]]: true,
          ...(transform && { [styles[transform]]: Boolean(transform) }),
        })}
        {...rest}
      >
        {children}
      </Element>
    )
  },
)
