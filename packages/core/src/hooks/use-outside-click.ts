import { useEffect, useRef } from 'react'

export function useOutsideClick(
  elements: Array<React.RefObject<HTMLElement>>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enable: boolean,
) {
  const handlerRef = useRef(handler)
  useEffect(() => {
    handlerRef.current = handler
  }, [handler, elements])
  useEffect(() => {
    if (enable) {
      const eventHandler: (event: MouseEvent | TouchEvent) => void = (event) => {
        if (!elements.some((element) => element.current?.contains(event.target as HTMLElement))) {
          handlerRef.current(event)
        }
      }
      document.addEventListener('click', eventHandler)

      return () => {
        document.removeEventListener('click', eventHandler)
      }
    }
  }, [enable, handler, elements])
}
