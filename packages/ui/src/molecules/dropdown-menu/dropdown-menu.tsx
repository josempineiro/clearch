import { forwardRef } from 'react'
import { Menu, PopupProps } from '@/atoms'
import { Dropdown } from '@/molecules'

export type DropdownMenuProps = PopupProps

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(({ children, ...rest }, ref) => {
  return (
    <Dropdown ref={ref} padding={['xs', 'none']} {...rest}>
      <Menu>{children}</Menu>
    </Dropdown>
  )
})
