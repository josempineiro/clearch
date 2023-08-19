import React from 'react'
import cn from 'classnames'
import { Text, TextProps } from '@/atoms/text'
import styles from './label.module.css'

export type LabelProps = Omit<TextProps<HTMLLabelElement>, 'Element'>

export const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return <Text Element="label" color="secondary" className={cn(className, styles.label)} {...props} />
}

export default Label
