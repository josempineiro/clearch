import React, { forwardRef } from 'react'
import { useToggleState } from '@clearq/core'
import { MenuItem, Menu, MenuItemProps } from '@/atoms'
import { Tooltip, DropdownMenu, DropdownMenuProps } from '@/molecules'

export interface MenuItemNested {
  id: string
  label: string
  description?: string
  items?: MenuItemNested[]
}
export interface MenuItemWithNestedItems extends MenuItemNested {
  items: MenuItemNested[]
}

const isNestedMenuItemWithItems = (item: MenuItemNested): item is MenuItemWithNestedItems => {
  return (item as MenuItemWithNestedItems).items?.length > 0
}

export interface NestedMenuProps {
  items: MenuItemNested[]
  closeOnItemClick?: boolean
}

interface MenuItemWithDescriptionProps extends MenuItemProps {
  description?: string
}

export const MenuItemWithDescription = forwardRef<HTMLLIElement, MenuItemWithDescriptionProps>(({ description, ...rest }, ref) => {
  if (!description) {
    return <MenuItem {...rest} ref={ref} />
  }
  return (
    <Tooltip offsetX={8} ref={ref} position="left" alignment="middle" target={<MenuItem {...rest} />}>
      {description}
    </Tooltip>
  )
})

interface NestedMenuItemWithItemsProps {
  item: MenuItemWithNestedItems
  position?: DropdownMenuProps['position']
  alignment?: DropdownMenuProps['alignment']
}


export const NestedMenuItemWithDescriptionTooltip: React.FC<{ item: MenuItemNested }> = ({ item }) => {
  if (item.description) {
    return (
      <Tooltip position="left" alignment="middle" target={<NestedMenuItem item={item} />}>
        {item.description}
      </Tooltip>
    )
  }
  return <NestedMenuItem item={item} />
}

export const NestedMenuItemWithItems = forwardRef<HTMLLIElement, NestedMenuItemWithItemsProps>(({
  item,
  position = 'right',
  alignment
}, ref) => {
  const [visible, toggle] = useToggleState()
  return (
    <DropdownMenu
      visible={visible}
      position={position}
      alignment={alignment}
      offsetY={['bottom', 'top'].includes(position) ? 0 : -8}
      target={<MenuItemWithDescription ref={ref} onClick={toggle} active={visible} label={item.label} description={item.description} />}
    >
      {item.items.map((item) => {
        return <NestedMenuItemWithDescriptionTooltip key={item.id} item={item} />
      })}
    </DropdownMenu>
  )
})

export interface NestedMenuItemProps {
  item: MenuItemNested
  position?: DropdownMenuProps['position']
  alignment?: DropdownMenuProps['alignment']
}

export const NestedMenuItem = forwardRef<HTMLLIElement, NestedMenuItemProps>(({ item, position, alignment }, ref) => {
  if (isNestedMenuItemWithItems(item)) {
    return <NestedMenuItemWithItems ref={ref} item={item} position={position} alignment={alignment} />
  }
  return <MenuItemWithDescription ref={ref} label={item.label} description={item.description} />
})

export const NestedMenu: React.FC<NestedMenuProps> = ({ items }) => {
  return (
    <Menu>
      {items.map((item) => (
        <NestedMenuItem key={item.id} item={item} position="bottom" alignment="start" />
      ))}
    </Menu>
  )
}
