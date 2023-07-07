import React from 'react'
import cn from 'classnames'
import styles from './container.module.css'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Container = ({ className, ...rest }: ContainerProps) => {
  return <div className={cn([className, styles.container])} {...rest} />
}
