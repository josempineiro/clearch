import { useState, useEffect, cloneElement, useRef } from 'react'
import { FlexBoxProps, Text, Popup } from '@/atoms'
import type { PopupProps } from '@/atoms'

export interface TooltipProps extends PopupProps, Omit<FlexBoxProps, 'children' | 'width'> {
  children: React.ReactNode
  target: React.ReactElement
  trigger?: 'click' | 'hover'
  width?: 's' | 'm' | 'l' | 'target' | 'content'
  absolute?: boolean
}

export function Tooltip({ children, target, trigger = 'hover', ...rest }: TooltipProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setVisible(true)
    }
  }
  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setVisible(false)
    }
  }
  const handleMouseDown = () => {
    if (trigger === 'click') {
      setVisible(!visible)
    }
  }

  useEffect(() => {
    if (visible && trigger === 'click') {
      const handler: (event: MouseEvent | TouchEvent) => void = (event) => {
        if (
          !targetRef.current?.contains(event.target as HTMLElement) &&
          !tooltipRef.current?.contains(event.target as HTMLElement)
        ) {
          setVisible(false)
        }
      }
      document.addEventListener('touchstart', handler)
      document.addEventListener('mousedown', handler)
      return () => {
        document.removeEventListener('touchstart', handler)
        document.removeEventListener('mousedown', handler)
      }
    }
  }, [visible, trigger])
  return (
    <Popup
      {...rest}
      visible={visible}
      target={cloneElement(target, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
      })}
    >
      <Text Element="p">{children}</Text>
    </Popup>
  )
}
