import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './input.module.css'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type = 'text', className, ...rest }, ref) => {
  return <input ref={ref} type={type} className={cn([className, styles.input])}  {...rest} />
})
