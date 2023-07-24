import React from 'react'
import { List, ListProps } from '@/atoms'

export interface MenuProps extends ListProps {
  children: React.ReactNode
}

export const Menu = ({ children }: MenuProps) => {
  return <List direction="column">{children}</List>
}
