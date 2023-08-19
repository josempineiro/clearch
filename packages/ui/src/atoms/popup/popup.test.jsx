import React from 'react'
import { describe, test, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/atoms/button'
import { Popup } from './popup'

const onClickOutsideSpy = vi.fn()

const PopupTest = ({ visible, onClickOutside }) => {
  return (
    <div>
      <div>Outside</div>
      <Popup visible={visible} onClickOutside={onClickOutside} target={<Button role="popup">Target</Button>}>
        Content
      </Popup>
    </div>
  )
}

describe('Popup', () => {
  beforeEach(() => {
    onClickOutsideSpy.mockClear()
  })
  test('should renders popup content when visible', () => {
    render(<PopupTest visible={true} onClickOutside={onClickOutsideSpy} />)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
  test('should not renders popup content when not visible', () => {
    render(<PopupTest visible={false} onClickOutside={onClickOutsideSpy} />)
    expect(screen.queryAllByText('Content')).toHaveLength(0)
  })
  test('should calls to onClickOutside when clicking outside', () => {
    render(<PopupTest visible={true} onClickOutside={onClickOutsideSpy} />)
    fireEvent.click(screen.getByText('Outside'))
    expect(onClickOutsideSpy).toHaveBeenCalledTimes(1)
  })
})
