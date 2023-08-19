import React, { forwardRef, useState } from 'react'
import cn from 'classnames'
import { Text } from '@/atoms/text'
import { Label } from '@/atoms/label'
import { InputProps } from '@/atoms/input'
import styles from './checkbox.module.css'

export interface CheckboxProps extends Omit<InputProps, 'type' | 'onChange' | 'value'> {
  value: boolean
  label: string
  onChange: (value: boolean) => void
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, value, onChange, label, ...rest }, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }
  const [focused, setFocused] = useState(false)
  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)
  return <Label className={cn([className, styles.checkbox, {
    [styles.checked]: value,
    [styles.focused]: focused,
  }])}>
    <span className={cn(styles.check)}>
      <input ref={ref} type={'checkbox'} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} checked={value}  {...rest} />
    </span>
    {label && <Text>{label}</Text>}
  </Label>
})
