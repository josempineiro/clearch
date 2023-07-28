import { useEffect, cloneElement, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'
import { FlexBox, FlexBoxProps } from '@/atoms'
import styles from './popup.module.css'
import { useOutsideClick } from '@clearq/core'

export interface PopupProps extends Pick<FlexBoxProps, 'children' | 'className' | 'color' | 'variant' | 'padding'> {
  target: React.ReactElement
  width?: 's' | 'm' | 'l' | 'target' | 'content'
  visible?: boolean
  onClickOutside?: () => void
  offsetX?: number
  offsetY?: number
}

const PopupContent = motion(FlexBox)

export function Popup({
  children,
  target,
  visible = true,
  width = 'content',
  className,
  onClickOutside,
  offsetX = 0,
  offsetY = 0,
  ...rest
}: PopupProps) {
  const targetRef = useRef<HTMLElement>(null)
  const popupRef = useRef<HTMLElement>(null)

  useOutsideClick(
    [targetRef, popupRef],
    () => {
      if (onClickOutside) {
        onClickOutside()
      }
    },
    visible,
  )

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
          targetRect.top + targetRect.height + offsetY,
          Math.max(0, window.innerHeight - popupRef.current.offsetHeight),
        )}px`,
      )
      popupRef.current.style.setProperty(
        'left',
        `${Math.min(targetRect.left + offsetX, Math.max(0, window.innerWidth - popupWidth))}px`,
      )
      popupRef.current.style.setProperty('width', `${popupWidth}px`)
    }
  }, [offsetX, offsetY, visible, width])

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
              direction="column"
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
