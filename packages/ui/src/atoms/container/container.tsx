import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './container.module.css'

type Padding = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'

export interface ContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: React.ReactNode
  padding?: Padding | [Padding, Padding]
  variant?: 'filled' | 'outlined' | 'none'
  color?: 'primary' | 'secondary' | 'tertiary' | 'none'
  width?: 'full'
  height?: 'full'
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, padding, variant = 'none', color = 'none', width, height, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn([
          className,
          styles.container,
          {
            [styles[`w-full`]]: width === 'full',
            [styles[`h-full`]]: height === 'full',
            [styles[`bg-primary`]]: color === 'primary' && variant === 'filled',
            [styles[`bg-secondary`]]: color === 'secondary' && variant === 'filled',
            [styles[`bg-tertiary`]]: color === 'tertiary' && variant === 'filled',
            [styles[`bg-none`]]: color === 'none' && variant === 'filled',
            [styles[`border`]]: variant === 'outlined',
            [styles[`border-primary`]]: color === 'primary' && variant === 'outlined',
            [styles[`border-secondary`]]: color === 'secondary' && variant === 'outlined',
            [styles[`border-tertiary`]]: color === 'tertiary' && variant === 'outlined',
            [styles[`border-none`]]: color === 'none' && variant === 'outlined',
            [styles[`p-xs`]]: padding === 'xs',
            [styles[`p-s`]]: padding === 's',
            [styles[`p-m`]]: padding === 'm',
            [styles[`p-l`]]: padding === 'l',
            [styles[`p-xl`]]: padding === 'xl',
            [styles[`px-xs`]]: Array.isArray(padding) && padding[0] === 'xs',
            [styles[`px-s`]]: Array.isArray(padding) && padding[0] === 's',
            [styles[`px-m`]]: Array.isArray(padding) && padding[0] === 'm',
            [styles[`px-l`]]: Array.isArray(padding) && padding[0] === 'l',
            [styles[`px-xl`]]: Array.isArray(padding) && padding[0] === 'xl',
            [styles[`py-xs`]]: Array.isArray(padding) && padding[1] === 'xs',
            [styles[`py-s`]]: Array.isArray(padding) && padding[1] === 's',
            [styles[`py-m`]]: Array.isArray(padding) && padding[1] === 'm',
            [styles[`py-l`]]: Array.isArray(padding) && padding[1] === 'l',
            [styles[`py-xl`]]: Array.isArray(padding) && padding[1] === 'xl',
          },
        ])}
        {...rest}
      />
    )
  },
)
