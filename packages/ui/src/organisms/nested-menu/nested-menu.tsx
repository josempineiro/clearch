import React from 'react'
import { useToggleState } from '@clearq/core'
import { MenuItem, Menu } from '@/atoms'
import { Tooltip, DropdownMenu, DropdownMenuProps } from '@/molecules'

export interface NestedMenuItem {
  label: string
  description?: string
  items?: NestedMenuItem[]
}
export interface NestedMenuItemWithItems extends NestedMenuItem {
  items: NestedMenuItem[]
}

const isNestedMenuItemWithItems = (item: NestedMenuItem): item is NestedMenuItemWithItems => {
  return (item as NestedMenuItemWithItems).items?.length > 0
}

export interface NestedMenuProps {
  items: NestedMenuItem[]
  closeOnItemClick?: boolean
}

export const NestedMenuItemWithDescription: React.FC<NestedMenuItem> = ({ label, description }) => {
  return (
    <Tooltip usePortal={false} offsetX={8} position="left" alignment="middle" target={<MenuItem label={label} />}>
      {description}
    </Tooltip>
  )
}

export const NestedMenuItemWithItems = ({
  item,
  position,
  alignment,
}: {
  item: NestedMenuItemWithItems
  position?: DropdownMenuProps['position']
  alignment?: DropdownMenuProps['alignment']
}) => {
  const [visible, toggle] = useToggleState()
  return (
    <DropdownMenu
      visible={visible}
      onClickOutside={toggle}
      position={position}
      alignment={alignment}
      target={<MenuItem onClick={toggle} active={visible} label={item.label} />}
    >
      {item.items.map((item, index) => {
        return <NestedMenuItemWithDescriptionTooltip key={index} item={item} />
      })}
    </DropdownMenu>
  )
}

export const NestedMenuItem: React.FC<{
  item: NestedMenuItem
  position?: DropdownMenuProps['position']
  alignment?: DropdownMenuProps['alignment']
}> = ({ item, position = 'right', alignment = 'start' }) => {
  if (isNestedMenuItemWithItems(item)) {
    return <NestedMenuItemWithItems item={item} position={position} alignment={alignment} />
  }
  return <MenuItem label={item.label} />
}

export const NestedMenuItemWithDescriptionTooltip: React.FC<{ item: NestedMenuItem }> = ({ item }) => {
  if (item.description) {
    return (
      <Tooltip offsetX={8} position="left" alignment="middle" target={<NestedMenuItem item={item} />}>
        {item.description}
      </Tooltip>
    )
  }
  return <NestedMenuItem item={item} />
}

export const NestedMenu: React.FC<NestedMenuProps> = ({ items }) => {
  return (
    <Menu>
      {items.map((item, index) => {
        if (isNestedMenuItemWithItems(item)) {
          return <NestedMenuItem key={index} item={item} position="bottom" alignment="start" />
        }
        return <MenuItem key={index} label={item.label} />
      })}
    </Menu>
  )
}
