import { useEffect, cloneElement, useRef, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutsideClick, useMergeRefs } from '@clearq/core'
import { Container, ContainerProps } from '@/atoms'
import { PopupContent, PopupTarget, PopupAlignment, PopupPosition, PopupWidth } from './popup.types'
import { calcutatePopupPosition } from './popup.utils'
import styles from './popup.module.css'

export interface PopupProps extends Pick<ContainerProps, 'children' | 'className' | 'color' | 'variant' | 'padding'> {
  target: React.ReactElement
  visible?: boolean
  onClickOutside?: () => void
  usePortal?: boolean
  container?: HTMLElement
  position?: PopupPosition
  alignment?: PopupAlignment
  width?: PopupWidth
  offsetX?: number
  offsetY?: number
}

const PopupContentWrapper = motion(Container)

export const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      children,
      target,
      visible = true,
      width = 'content',
      className,
      onClickOutside,
      usePortal = true,
      container = document.body,
      offsetX = 0,
      offsetY = 0,
      alignment = 'start',
      position = 'bottom',
      ...rest
    },
    ref,
  ) => {
    const targetRef = useRef<PopupTarget>(null)
    const contentRef = useRef<PopupContent>(null)
    const mergedRefs = useMergeRefs([targetRef, ref])

    useOutsideClick(
      [targetRef, contentRef],
      () => {
        if (onClickOutside) {
          onClickOutside()
        }
      },
      visible,
    )

    useEffect(() => {
      if (visible && targetRef.current && contentRef.current) {
        const {
          x: popupLeft,
          y: popupTop,
          width: popupWidth,
          height: popupHeight,
        } = calcutatePopupPosition({
          targetRect: targetRef.current.getBoundingClientRect(),
          contentRect: contentRef.current.getBoundingClientRect(),
          width,
          position,
          alignment,
          offsetX,
          offsetY,
        })
        contentRef.current.focus()
        contentRef.current.style.setProperty('top', `${Math.max(0, popupTop)}px`)
        contentRef.current.style.setProperty('left', `${Math.max(0, popupLeft)}px`)
        contentRef.current.style.setProperty(
          'width',
          `${Math.min(popupWidth, window.innerWidth - Math.max(0, popupLeft))}px`,
        )
        contentRef.current.style.setProperty(
          'height',
          `${Math.min(popupHeight, window.innerHeight - Math.max(0, popupTop))}px`,
        )
      }
    }, [alignment, offsetX, offsetY, position, visible, width])

    return (
      <>
        {cloneElement(target, {
          ref: mergedRefs,
        })}
        {createPortal(
          <AnimatePresence>
            {visible && (
              <PopupContentWrapper
                ref={contentRef}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{}}
                className={cn([styles.popup, className])}
                {...rest}
              >
                {children}
              </PopupContentWrapper>
            )}
          </AnimatePresence>,
          usePortal ? container : targetRef.current ?? container,
        )}
      </>
    )
  },
)
