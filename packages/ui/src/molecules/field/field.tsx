import React from 'react'
import cn from 'classnames'
import styles from './field.module.css'
import { Label, Text, FlexBox } from '@/atoms'

export interface FieldProps {
  className?: string
  label: React.ReactNode
  children: React.ReactNode
  error?: React.ReactNode
  hint?: React.ReactNode
}

export const Field: React.FC<FieldProps> = ({ label, className, children, error, hint }: FieldProps) => {
  return (
    <FlexBox className={cn(styles.field, className)} direction='column'>
      <Label className={cn(styles['field-label'])} variant="caption" color="tertiary" transform='uppercase'>{label}</Label>
      {children}
      {hint && !error && <Text variant="caption" className={styles.hint}>{hint}</Text>}
      {error && <Text variant="caption" className={styles.error}>{error}</Text>}
    </FlexBox>
  )
}
