import { forwardRef, useState, useEffect, cloneElement, useRef } from 'react'
import { FlexBoxProps, Text, Popup } from '@/atoms'
import type { PopupProps } from '@/atoms'

export interface TooltipProps extends PopupProps, Omit<FlexBoxProps, 'children' | 'width' | 'offsetX' | 'offsetY'> {
  children: React.ReactNode
  target: React.ReactElement
  offset?: number
  trigger?: 'click' | 'hover'
  width?: 's' | 'm' | 'l' | 'target' | 'content'
  absolute?: boolean
}

export const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  ({ children, target, trigger = 'hover', position = 'bottom', offset = 8, ...rest }, ref) => {
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
        padding={['xs', 's']}
        variant="filled"
        color="primary"
        ref={ref}
        visible={visible}
        offsetX={['left', 'right'].includes(position) ? offset : 0}
        offsetY={['top', 'bottom'].includes(position) ? offset : 0}
        position={position}
        target={cloneElement(target, {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onMouseDown: handleMouseDown,
        })}
        {...rest}
      >
        <Text Element="p">{children}</Text>
      </Popup>
    )
  },
)
