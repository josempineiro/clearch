import React from 'react'
import cn from 'classnames'
import styles from './header.module.css'

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Header = ({ className, children, ...rest }: HeaderProps) => {
  return (
    <header className={cn([className, styles.header])} {...rest}>
      {children}
    </header>
  )
}
