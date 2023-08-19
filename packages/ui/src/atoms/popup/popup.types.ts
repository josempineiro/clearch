export type PopupContent = HTMLElement

export type PopupTarget = HTMLElement

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right'

export type PopupAlignment = 'start' | 'middle' | 'end'

export type PopupWidth = 's' | 'm' | 'l' | 'target' | 'content'

export type PopupStyles = {
  top: number
  left: number
  width: number | 'auto'
  maxWidth?: number
  minWidth?: number
  transformX: number
  transformY: number
}
