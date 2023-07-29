import { useCallback, useState } from 'react'

export const useToggleState = (stateValue = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(stateValue)

  return [
    state,
    useCallback(() => {
      setState((state) => !state)
    }, []),
  ]
}
