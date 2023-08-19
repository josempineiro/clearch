import { useEffect, useRef } from 'react'


export function useEventListener(
  element: HTMLElement | Window | Document | null,
  type: string,
  listener: (event: Event) => void,
  options: boolean | AddEventListenerOptions = false,
) {
  const listenerRef = useRef(listener)
  useEffect(() => {
    listenerRef.current = listener
  }, [listener])
  useEffect(() => {
    if (element) {
      element.addEventListener(type, listenerRef.current)
      return () => {
        element.removeEventListener(type, listenerRef.current)
      }
    }
  }, [element, type, listener, options])
}
