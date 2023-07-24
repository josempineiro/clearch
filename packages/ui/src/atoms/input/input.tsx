import React, { forwardRef } from 'react'
import styles from './input.module.css'
import cn from 'classnames'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type = 'text', className, ...rest }, ref) => {
  return <input ref={ref} type={type} className={cn([className, styles.input])} {...rest} />
})
