import { useEffect, cloneElement, useCallback, useRef, useState, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutsideClick, useMergeRefs, useEventListener } from '@clearq/core'
import { Container, ContainerProps } from '@/atoms/container'
import { PopupContent, PopupTarget, PopupAlignment, PopupPosition, PopupWidth, PopupStyles } from './popup.types'
import { calcutatePopupStyles } from './popup.utils'
import styles from './popup.module.css'


/**
 * Popup component
 */
export interface PopupProps extends Pick<ContainerProps, 'children' | 'className' | 'color' | 'variant' | 'padding'> {
  /** Target element or function that returns target element **/
  target: React.ReactElement | (({ ref, visible }: {
    ref: React.Ref<HTMLElement>
    visible: boolean
  }) => React.ReactNode)
  /**
   * Show or hide popup
   * @default true
   **/
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

export const Popup = forwardRef<HTMLElement, PopupProps>(
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
    const [popupStyles, setPopupStyles] = useState<PopupStyles | undefined>(undefined)

    const setContentPosition = useCallback(() => {
      if (visible && targetRef.current && contentRef.current) {
        setPopupStyles(calcutatePopupStyles({
          targetRect: targetRef.current.getBoundingClientRect(),
          contentRect: contentRef.current.getBoundingClientRect(),
          width,
          position,
          alignment,
          offsetX,
          offsetY,
        }))
      } else {
        setPopupStyles(undefined)
      }
    }, [alignment, offsetX, offsetY, position, visible, width])

    const normalizedPopupStyles = popupStyles ? {
      top: `${Math.max(0, popupStyles.top)}px`,
      left: `${Math.max(0, popupStyles.left)}px`,
      maxWidth: `${popupStyles.maxWidth}px`,
      minWidth: `${popupStyles.minWidth}px`,
      width: popupStyles.width === 'auto' ? 'auto' : `${popupStyles.width}px`,
      transform: `translate(${popupStyles.transformX}%, ${popupStyles.transformY}%)`,
    } : {}


    useEventListener(document, 'scroll', () => {
      setContentPosition()
    })

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
      setContentPosition()
    }, [setContentPosition])

    return (
      <>
        {(typeof target === 'function'
          ? target({ visible, ref: mergedRefs })
          : cloneElement(target, { ref: mergedRefs }))}
        {createPortal(
          <AnimatePresence>
            {visible && (
              <PopupContentWrapper
                key={`${position} - ${alignment} - ${width}`}
                ref={contentRef}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={normalizedPopupStyles}
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
