import React, { forwardRef } from 'react'
import { FlexBox, ListItemProps, ListItem, Text } from '@/atoms'
import styles from './menu-item.module.css'
import cn from 'classnames'

export interface MenuItemProps extends Omit<ListItemProps, 'children'> {
  label: React.ReactNode
  active?: boolean
}

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(({ label, active, className, ...rest }, ref) => {
  return (
    <ListItem
      {...rest}
      ref={ref}
      className={cn([
        className,
        styles['menu-item'],
        {
          [styles['active']]: active,
        },
      ])}
    >
      <FlexBox Element={ListItem} alignItems="center" justifyContent="space-between" padding={['xs', 's']}>
        <Text>{label}</Text>
      </FlexBox>
    </ListItem>
  )
})
