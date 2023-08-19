import React, { forwardRef } from 'react'
import { Icon, IconProps } from './icon'

export interface ChevronIconProps extends IconProps {
  direction?: 'up' | 'down' | 'left' | 'right'
}

export const ChevronIcon = forwardRef<HTMLSpanElement, ChevronIconProps>(({ direction = 'down', className, ...props }, ref) => (

  <Icon width="100" height="100" viewBox="0 0 100 50" className={className}>
    <polygon points="10,10 50,40 90,10" fill="black" />
  </Icon>
))