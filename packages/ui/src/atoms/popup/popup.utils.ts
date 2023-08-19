import { PopupAlignment, PopupPosition, PopupWidth, PopupStyles } from './popup.types'

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

export const calcutatePopupStyles = ({
  targetRect,
  contentRect,
  width,
  position,
  alignment,
  offsetX,
  offsetY,
}: CalculatePopupPositionParameters): PopupStyles => {
  const availableWidth = () => {
    switch (position) {
      case 'left':
        return targetRect.x - offsetX
      case 'right':
        return window.innerWidth - offsetX - (targetRect.x + targetRect.width)
      case 'top':
      case 'bottom':
      default:
        switch (alignment) {
          case 'middle':
            return window.innerWidth - offsetX
          case 'end':
            return window.innerWidth - offsetX - (window.innerWidth - (targetRect.x + targetRect.width))
          case 'start':
          default:
            return window.innerWidth - offsetX - targetRect.x
        }
    }
  }

  const popupMaxWidth = (() => {
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
        return Math.min(contentRect.width, availableWidth())
    }
  })()

  const popupWidth = (() => {
    switch (width) {
      case 'content':
        return Math.min(contentRect.width, availableWidth())
      default:
        return 'auto'
    }
  })()

  const popupMinWidth = (() => {
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
        return 0
    }
  })()

  const popupX = (() => {
    switch (position) {
      case 'left':
        return targetRect.left - offsetX
      case 'right':
        return targetRect.left + targetRect.width + offsetX
      case 'top':
      case 'bottom':
      default:
        switch (alignment) {
          case 'middle':
            return targetRect.left + targetRect.width / 2 + offsetX
          case 'end':
            return targetRect.left + targetRect.width - offsetX
          case 'start':
          default:
            return targetRect.left + offsetX
        }
    }
  })()

  const popupY = (() => {
    switch (position) {
      case 'top':
        return targetRect.top - offsetY
      case 'bottom':
        return targetRect.top + targetRect.height + offsetY
      case 'left':
      case 'right':
      default:
        switch (alignment) {
          case 'middle':
            return targetRect.top + targetRect.height / 2 + offsetY
          case 'end':
            return targetRect.top + targetRect.height - offsetX
          case 'start':
          default:
            return targetRect.top + offsetY
        }
    }
  })()

  const transformY = (() => {
    switch (position) {
      case 'top':
        return -100
      case 'bottom':
        return 0
      case 'left':
      case 'right':
      default:
        switch (alignment) {
          case 'middle':
            return -50
          case 'end':
            return -100
          case 'start':
          default:
            return 0
        }
    }
  })()

  const transformX = (() => {
    switch (position) {
      case 'left':
        return -100
      case 'right':
        return 0
      case 'top':
      case 'bottom':
      default:
        switch (alignment) {
          case 'middle':
            return -50
          case 'end':
            return -100
          case 'start':
          default:
            return 0
        }
    }
  })()

  return {
    left: popupX,
    top: popupY,
    maxWidth: popupMaxWidth,
    minWidth: popupMinWidth,
    width: popupWidth,
    transformY,
    transformX,
  }
}
