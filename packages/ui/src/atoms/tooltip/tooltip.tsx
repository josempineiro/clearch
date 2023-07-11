import { useState, useEffect, cloneElement, useRef } from 'react'
import styles from './tooltip.module.css'

export interface TooltipProps {
  children: React.ReactNode
  target: React.ReactElement
  trigger?: 'click' | 'hover'
}

export function Tooltip({ children, target, trigger = 'click' }: TooltipProps) {
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
    if (visible && targetRef.current && tooltipRef.current) {
      console.log(targetRef.current)
      tooltipRef.current.focus()
      tooltipRef.current.style.setProperty('top', `${targetRef.current.offsetTop + targetRef.current.offsetHeight}px`)
      tooltipRef.current.style.setProperty('left', `${targetRef.current.offsetLeft}px`)
    }
  }, [visible])

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
    <>
      {cloneElement(target, {
        ref: targetRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
      })}
      <div
        className={styles.tooltip}
        ref={tooltipRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'absolute',
          zIndex: 1,
          display: visible ? 'block' : 'none',
        }}
      >
        {children}
      </div>
    </>
  )
}
