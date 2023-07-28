import { useEffect } from 'react'

export function useOutsideClick(
  elements: Array<React.RefObject<HTMLElement>>,
  callback: (event: MouseEvent | TouchEvent) => void,
  enable = true,
) {
  useEffect(() => {
    if (enable) {
      const handler: (event: MouseEvent | TouchEvent) => void = (event) => {
        if (!elements.some((element) => element.current?.contains(event.target as HTMLElement))) {
          callback(event)
        }
      }
      document.addEventListener('touchstart', handler)
      document.addEventListener('mousedown', handler)
      return () => {
        document.removeEventListener('touchstart', handler)
        document.removeEventListener('mousedown', handler)
      }
    }
  }, [enable, callback, elements])
}
