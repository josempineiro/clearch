import React, { useEffect, useState } from 'react'
import { Bar, Button, FlexBox } from '@/atoms'
import type { BarProps } from '@/atoms'

export interface SearchBarProps extends Omit<BarProps, 'children'> {
  onSearch: (search: string) => void
  placeholder?: string
  value?: string
  debounce?: number
  onNext?: () => void
  onPrevious?: () => void
  current?: number
  matches?: number
  total?: number
}

export const SearchBar = ({
  onSearch,
  placeholder = 'Search...',
  value = '',
  debounce = 500,
  current = 0,
  total = 0,
  matches = 0,
  onNext,
  onPrevious,
  ...rest
}: SearchBarProps) => {
  const [search, setSearch] = useState<string>(value)
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearch(value)
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(setTimeout(() => onSearch(value), debounce))
  }

  useEffect(() => {
    setSearch(value)
  }, [value])

  return (
    <Bar {...rest}>
      <FlexBox>
        <input onChange={handleChange} placeholder={placeholder} value={search} />
        <div>
          {current} / {matches} of {total}
        </div>
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={onNext}>Next</Button>
      </FlexBox>
    </Bar>
  )
}
