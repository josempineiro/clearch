import React, { forwardRef } from 'react'
import { PopupProps, Button, Icon } from '@/atoms'
import { Dropdown } from '@/molecules'
import { useToggleState } from '@clearq/core'

export interface DropdownButtonProps extends Omit<PopupProps, 'target' | 'visible' | 'onToggle'> {
  children: React.ReactNode
  content: React.ReactNode
}

export const DropdownButton = forwardRef<HTMLElement, DropdownButtonProps>(
  (
    {
      children = (
        <Icon viewBox="0 0 185.344 185.344">
          <path
            d="M92.672,144.373c-2.752,0-5.493-1.044-7.593-3.138L3.145,59.301c-4.194-4.199-4.194-10.992,0-15.18
c4.194-4.199,10.987-4.199,15.18,0l74.347,74.341l74.347-74.341c4.194-4.199,10.987-4.199,15.18,0
c4.194,4.194,4.194,10.981,0,15.18l-81.939,81.934C98.166,143.329,95.419,144.373,92.672,144.373z"
          />
        </Icon>
      ),
      content,
      ...rest
    },
    ref,
  ) => {
    const [visible, toggle] = useToggleState(false)
    return (
      <Dropdown
        ref={ref}
        {...rest}
        visible={visible}
        target={
          <Button variant="secondary" active={visible} onClick={toggle}>
            {children}
          </Button>
        }
        onClickOutside={toggle}
      >
        {content}
      </Dropdown>
    )
  },
)
