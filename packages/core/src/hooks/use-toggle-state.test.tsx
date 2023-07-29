import React from 'react'
import { describe, expect, test } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { useToggleState } from './use-toggle-state'
import '@testing-library/jest-dom'

const ToggleStateTestComponent = ({ initialValue }: { initialValue: boolean }) => {
  const [state, toggleState] = useToggleState(initialValue)

  return (
    <button role="button" onClick={toggleState}>
      {state ? 'true' : 'false'}
    </button>
  )
}

describe('useToggleState', () => {
  test('state should be true when toggle is executed', async () => {
    const { getByRole } = render(<ToggleStateTestComponent initialValue={false} />)
    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(getByRole('button')).toHaveTextContent('true')
    })
  })
  test('state should be false when toggle is executed and initial value is true', async () => {
    const { getByRole } = render(<ToggleStateTestComponent initialValue={true} />)
    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(getByRole('button')).toHaveTextContent('false')
    })
  })
})
