import { useEffect, cloneElement, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'
import { FlexBox, FlexBoxProps } from '@/atoms'
import styles from './popup.module.css'

export interface PopupProps extends Pick<FlexBoxProps, 'children' | 'className' | 'variant' | 'color'> {
  target: React.ReactElement
  width?: 's' | 'm' | 'l' | 'target' | 'content'
  visible?: boolean
}

const PopupContent = motion(FlexBox)

export function Popup({ children, target, visible = true, width = 'content', className, ...rest }: PopupProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible && targetRef.current && popupRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect()
      const popupRect = popupRef.current.getBoundingClientRect()
      const popupWidth = (() => {
        switch (width) {
          case 'content':
            return popupRect.width
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
      popupRef.current.focus()
      popupRef.current.style.setProperty(
        'top',
        `${Math.min(
          targetRect.top + targetRect.height,
          Math.max(0, window.innerHeight - popupRef.current.offsetHeight),
        )}px`,
      )
      popupRef.current.style.setProperty(
        'left',
        `${Math.min(targetRect.left, Math.max(0, window.innerWidth - popupWidth))}px`,
      )
      popupRef.current.style.setProperty('width', `${popupWidth}px`)
    }
  }, [visible, width])

  return (
    <>
      {cloneElement(target, {
        ref: targetRef,
      })}
      {createPortal(
        <AnimatePresence>
          {visible && (
            <PopupContent
              ref={popupRef}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn([styles.popup, className])}
              {...rest}
            >
              {children}
            </PopupContent>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
