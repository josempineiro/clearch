import { PopupAlignment, PopupPosition, PopupWidth } from './popup.types'

export const CONENT_WIDTH_S = 200
export const CONENT_WIDTH_M = 300
export const CONENT_WIDTH_L = 400

export interface CalculatePopupPositionParameters {
  targetRect: DOMRect
  contentRect: DOMRect
  width: PopupWidth
  position: PopupPosition
  alignment: PopupAlignment
  offsetX: number
  offsetY: number
}

export const calcutatePopupPosition = ({
  targetRect,
  contentRect,
  width,
  position,
  alignment,
  offsetX,
  offsetY,
}: CalculatePopupPositionParameters): {
  x: number
  y: number
  width: number
  height: number
} => {
  const popupWidth = (() => {
    switch (width) {
      case 's':
        return CONENT_WIDTH_S
      case 'm':
        return CONENT_WIDTH_M
      case 'l':
        return CONENT_WIDTH_L
      case 'target':
        if (position === 'bottom' || position === 'top') {
          return targetRect.width
        }
        return contentRect.width
      case 'content':
      default:
        return contentRect.width
    }
  })()
  const popupHeight = (() => {
    switch (width) {
      case 'target':
        if (position === 'left' || position === 'right') {
          return targetRect.height
        }
        return contentRect.height
      case 'content':
      default:
        return contentRect.height
    }
  })()
  const popupX = (() => {
    switch (position) {
      case 'left':
        return targetRect.left - contentRect.width - offsetX
      case 'right':
        return targetRect.left + targetRect.width + offsetX
      case 'top':
      case 'bottom':
      default:
        switch (alignment) {
          case 'middle':
            return targetRect.left + targetRect.width / 2 - popupWidth / 2 + offsetX
          case 'end':
            return targetRect.left + targetRect.width - popupWidth - offsetX
          case 'start':
          default:
            return targetRect.left + offsetX
        }
    }
  })()

  const popupY = (() => {
    switch (position) {
      case 'top':
        return targetRect.top - contentRect.height - offsetY
      case 'bottom':
        return targetRect.top + targetRect.height + offsetY
      case 'left':
      case 'right':
      default:
        switch (alignment) {
          case 'middle':
            return targetRect.top + targetRect.height / 2 - contentRect.height / 2 + offsetY
          case 'end':
            return targetRect.top + targetRect.height - contentRect.height - offsetX
          case 'start':
          default:
            return targetRect.top + offsetY
        }
    }
  })()
  return {
    x: popupX,
    y: popupY,
    width: popupWidth,
    height: popupHeight,
  }
}
