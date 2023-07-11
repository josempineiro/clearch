import React from 'react'
import cn from 'classnames'
import styles from './container.module.css'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  padding?: 'none' | 'small' | 'medium' | 'large'
}

export const Container = ({ className, padding = 'none', ...rest }: ContainerProps) => {
  return <div className={cn([className, styles.container, { [styles[padding]]: true }])} {...rest} />
}
