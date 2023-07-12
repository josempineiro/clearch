import React from 'react'
import cn from 'classnames'
import styles from './layout.module.css'
import { Header } from '@/atoms/header'
import { FlexBox, FlexItem } from '@/atoms/flex-box'

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  header: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children, className, header }) => {
  return (
    <FlexBox
      className={cn(className, styles.layout, {
        [styles['with-header']]: Boolean(header),
      })}
    >
      {header && <Header>{header}</Header>}
      <FlexItem flex={1} direction="column">
        {children}
      </FlexItem>
    </FlexBox>
  )
}
