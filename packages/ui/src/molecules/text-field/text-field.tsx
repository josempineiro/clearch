import React from 'react'
import cn from 'classnames'
import styles from './text-field.module.css'
import { InputProps, Input } from '@/atoms'
import { Field, FieldProps } from '@/molecules'

export interface TextFieldProps extends Omit<FieldProps, 'children'>, Omit<InputProps, 'onChange' | 'value'> {
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const TextField: React.FC<TextFieldProps> = ({ value, onChange, className, ...rest }: TextFieldProps) => {
  return (
    <Field className={cn(styles['text-field'], className)} {...rest}>
      <Input value={value} onChange={(event) => onChange(event.target.value, event)} {...rest} />
    </Field>
  )
}
