import React from 'react'
import { describe, expect, test, vi } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { useOutsideClick } from './use-outside-click'
import '@testing-library/jest-dom'

const ClickOutsideTestComponent = ({ handler }: { handler: () => void }) => {
  const inside1Ref = React.useRef<HTMLDivElement>(null)
  const inside2Ref = React.useRef<HTMLDivElement>(null)
  useOutsideClick([inside1Ref, inside2Ref], handler, true)
  const handleClickWithStopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }
  return (
    <div data-testid="parent">
      <div ref={inside1Ref} data-testid="inside-1" onClick={handleClickWithStopPropagation} />
      <div data-testid="outside" />
    </div>
  )
}

describe('useOutsideClick', () => {
  test('callback should be called when clicking outside the elements', async () => {
    const mockCallback = vi.fn()

    const { getByTestId } = render(<ClickOutsideTestComponent handler={mockCallback} />)

    fireEvent.click(getByTestId('outside'))
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })
  test('callback should be called when clicking element parent', async () => {
    const mockCallback = vi.fn()

    const { getByTestId } = render(<ClickOutsideTestComponent handler={mockCallback} />)

    fireEvent.click(getByTestId('parent'))
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })
  test('callback should be called when clicking inside the elements', async () => {
    const mockCallback = vi.fn()

    const { getByTestId } = render(<ClickOutsideTestComponent handler={mockCallback} />)

    fireEvent.click(getByTestId('inside-1'))
    await waitFor(() => {
      expect(mockCallback).not.toHaveBeenCalled()
    })
  })
})
