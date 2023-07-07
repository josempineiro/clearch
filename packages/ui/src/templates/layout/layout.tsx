import React from 'react'
import cn from 'classnames'
import styles from './layout.module.css'
import { Header } from '@/atoms/header'
import { Container } from '@/atoms/container'

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  header: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children, className, header, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(className, styles.layout, {
        [styles.withHeader]: Boolean(header),
      })}
    >
      {header && <Header>{header}</Header>}
      <Container>{children}</Container>
    </div>
  )
}
