import { useState, useEffect, cloneElement, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
      const { top, left, height } = targetRef.current.getBoundingClientRect()
      tooltipRef.current.focus()
      tooltipRef.current.style.setProperty(
        'top',
        `${Math.min(top + height, Math.max(0, window.innerHeight - tooltipRef.current.offsetHeight))}px`,
      )
      tooltipRef.current.style.setProperty(
        'left',
        `${Math.min(left, Math.max(0, window.innerWidth - tooltipRef.current.offsetWidth))}px`,
      )
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
