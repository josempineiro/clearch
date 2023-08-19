import { forwardRef } from 'react'
import { Popup, PopupProps } from '@/atoms'

export type DropdownProps = PopupProps

export const Dropdown = forwardRef<HTMLElement, DropdownProps>((props, ref) => {
  return <Popup ref={ref} padding={['none', 'none']} variant="filled" color="surface" {...props} />
})
