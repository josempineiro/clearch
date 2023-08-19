import { forwardRef } from 'react'
import { Menu, PopupProps, Scrollable } from '@/atoms'
import { Dropdown } from '@/molecules'

export type DropdownMenuProps = PopupProps

export const DropdownMenu = forwardRef<HTMLElement, DropdownMenuProps>(({ children, ...rest }, ref) => {
  return (
    <Dropdown ref={ref} padding={['xs', 'none']} {...rest}>
      <Scrollable>
        <Menu>{children}</Menu>
      </Scrollable>
    </Dropdown>
  )
})
