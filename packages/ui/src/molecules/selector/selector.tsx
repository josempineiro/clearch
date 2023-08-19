import { useState } from 'react'
import { Input, MenuItem, Scrollable, Menu, FlexBox } from '@/atoms'
import { Dropdown, Field } from '@/molecules'

export interface Option {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectorProps {
  label: string
  value?: string
  options: Array<Option>
  onChange: (option: Option | undefined, event: React.MouseEvent) => void
  optionFilter?: (option: Option, search: string) => boolean
}

export const Selector = ({ label, value, options, onChange, optionFilter = (option, search) => new RegExp(search, 'img').test(option.label) }: SelectorProps) => {
  const [focused, setFocused] = useState(false)
  const [search, setSearch] = useState<string>('')
  const findOptionByValue = (value?: string) => (value ? options.find((option) => option.value === value) : undefined)
  const filteredOptions = options.filter((option) => optionFilter(option, search))
  return (
    <Field label={label}>
      <Dropdown width='content'
        visible={focused}
        onClickOutside={() => {
          setFocused(false)
        }}
        target={
          <Input
            onClick={() => {
              setFocused(focused => !focused)
            }}
            value={findOptionByValue(value)?.label}
            readOnly
          />
        }>
        <FlexBox direction='column' gap={'xs'} padding={['xs', 'none']}>
          <FlexBox padding={['none', 'xs']}>
            <Input
              value={search}
              autoFocus
              onChange={(event) => setSearch(event.target.value)}
            />
          </FlexBox>
          {filteredOptions.length > 0 && <Scrollable>
            <Menu>{filteredOptions.map((option) => (
              <MenuItem
                key={option.value}
                label={option.label}
                onMouseDown={(event) => {
                  setFocused(false)
                  onChange(option, event)
                }}
              />
            ))}</Menu>
          </Scrollable>}
        </FlexBox>
      </Dropdown>
    </Field >
  )
}
