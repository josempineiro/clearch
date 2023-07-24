import React, { forwardRef } from 'react'
import classnames from 'classnames'
import styles from './button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  active?: boolean
  size?: 's' | 'm' | 'l'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'm', children, className, active, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classnames([
          className,
          styles.button,
          styles[variant],
          styles[size],
          { [styles['active']]: active },
        ])}
        {...props}
      >
        {children}
      </button>
    )
  },
)
