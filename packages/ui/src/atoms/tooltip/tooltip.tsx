import { useState, useEffect, cloneElement, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './tooltip.module.css'

export interface TooltipProps {
  children: React.ReactNode
  target: React.ReactElement
  trigger?: 'click' | 'hover'
  width?: 's' | 'm' | 'l' | 'target' | 'content'
}

export function Tooltip({ children, target, trigger = 'click', width = 'content' }: TooltipProps) {
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
      const targetRect = targetRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const tooltipWidth = (() => {
        switch (width) {
          case 'content':
            return tooltipRect.width
          case 'target':
            return targetRef.current.offsetWidth
          case 's':
            return 200
          case 'm':
            return 300
          case 'l':
            return 400
        }
      })()
      tooltipRef.current.focus()
      tooltipRef.current.style.setProperty(
        'top',
        `${Math.min(
          targetRect.top + targetRect.height,
          Math.max(0, window.innerHeight - tooltipRef.current.offsetHeight),
        )}px`,
      )
      tooltipRef.current.style.setProperty(
        'left',
        `${Math.min(targetRect.left, Math.max(0, window.innerWidth - tooltipWidth))}px`,
      )
      tooltipRef.current.style.setProperty('width', `${tooltipWidth}px`)
    }
  }, [visible, width])

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
      {createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.tooltip}
              ref={tooltipRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'absolute',
                zIndex: 1,
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body!,
      )}
    </>
  )
}
