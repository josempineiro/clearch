import React, { useEffect, useState, useRef } from 'react'
import { Bar, Button, FlexBox, FlexItem, Input, Text } from '@/atoms'
import type { BarProps } from '@/atoms'

export interface SearchBarProps extends BarProps {
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
  matches = 0,
  onNext,
  onPrevious,
  children,
  ...rest
}: SearchBarProps) => {
  const [search, setSearch] = useState<string>(value)
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearch(value)
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(setTimeout(() => onSearch(value), debounce))
  }

  const handleOnPrevious = () => {
    if (onPrevious) {
      onPrevious()
    }
    searchInputRef.current?.focus()
  }

  const handleOnNext = () => {
    if (onNext) {
      onNext()
    }
    searchInputRef.current?.focus()
  }

  useEffect(() => {
    setSearch(value)
  }, [value])

  return (
    <Bar {...rest}>
      <FlexBox alignItems="center" padding={['xs', 's']} gap={'s'} variant="filled">
        <FlexItem grow={1}>
          <Input ref={searchInputRef} type="search" onChange={handleChange} placeholder={placeholder} value={search} />
        </FlexItem>
        <FlexBox alignItems="center" gap={'s'}>
          <Button onClick={handleOnPrevious} disabled={current === 1} variant="tertiary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width={16} height={16}>
              <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
            </svg>
          </Button>
          <Text whiteSpace="pre">
            {current} / {matches}
          </Text>
          <Button onClick={handleOnNext} disabled={current === matches} variant="tertiary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width={16} height={16}>
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </Button>
        </FlexBox>
        {children}
      </FlexBox>
    </Bar>
  )
}
