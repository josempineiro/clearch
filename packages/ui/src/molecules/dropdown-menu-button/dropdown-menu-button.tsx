import React from 'react'
import { Menu, MenuItem, MenuItemProps } from '@/atoms'
import { DropdownButton, DropdownButtonProps } from '@/molecules'

export interface DropdownMenuButtonProps extends DropdownButtonProps {
  children: React.ReactNode
  button: React.ReactElement
}

export interface DropdownMenuItemProps extends MenuItemProps {
  children: React.ReactNode
}

export const DropdownMenuItem = ({ children, ...rest }: DropdownMenuItemProps) => {
  return (
    <DropdownButton target={<MenuItem {...rest} />}>
      <Menu>{children}</Menu>
    </DropdownButton>
  )
}

export const DropdownMenuButton = ({ children, button, ...rest }: DropdownMenuButtonProps) => {
  return (
    <DropdownButton {...rest} target={button}>
      <Menu>{children}</Menu>
    </DropdownButton>
  )
}
