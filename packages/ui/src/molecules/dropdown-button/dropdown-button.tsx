import React, { cloneElement, useState } from 'react'
import { Popup, PopupProps, Button, Icon } from '@/atoms'

export interface DropdownButtonProps extends Omit<PopupProps, 'target' | 'visible' | 'onToggle'> {
  children: React.ReactNode
  target?: React.ReactElement
}

export const DropdownButton = ({ children, target, ...rest }: DropdownButtonProps) => {
  const [visible, setVisible] = useState(false)
  const handleClickOrClickOutside = () => setVisible((visible) => !visible)
  return (
    <Popup
      {...rest}
      visible={visible}
      padding={['xs', 'none']}
      variant="filled"
      color="surface"
      target={
        target ? (
          cloneElement(target, {
            onClick: handleClickOrClickOutside,
          })
        ) : (
          <Button variant="secondary" active={visible} onClick={handleClickOrClickOutside}>
            <Icon viewBox="0 0 32 32">
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </Icon>
          </Button>
        )
      }
      onClickOutside={handleClickOrClickOutside}
    >
      {children}
    </Popup>
  )
}
