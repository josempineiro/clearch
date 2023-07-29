import { MenuItem, MenuItemProps, PopupProps } from '@/atoms'
import { DropdownMenu } from '@/molecules'
import { useToggleState } from '@clearq/core'
import { forwardRef } from 'react'

export interface DropdownMenuItemProps
  extends MenuItemProps,
    Pick<PopupProps, 'position' | 'alignment' | 'children' | 'usePortal'> {}

export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ children, position, alignment, usePortal = false, ...rest }, ref) => {
    const [visible, toggle] = useToggleState()
    return (
      <DropdownMenu
        ref={ref}
        offsetY={-8}
        position={position}
        alignment={alignment}
        target={<MenuItem {...rest} active={visible} onClick={toggle} />}
        usePortal={usePortal}
        visible={visible}
        onClickOutside={toggle}
      >
        {children}
      </DropdownMenu>
    )
  },
)
