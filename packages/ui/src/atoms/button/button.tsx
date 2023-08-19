import React, { forwardRef } from 'react'
import classnames from 'classnames'
import styles from './button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Determines the visual style of the button. */
  variant?: 'filled' | 'outlined' | 'default'
  /** Determines the color of the button. */
  color?: 'primary' | 'secondary' | 'danger'
  /** Specifies whether the button is in an active or selected state. */
  active?: boolean
  /** Determines the size of the button. */
  size?: 's' | 'm' | 'l'
  /** The content of the button. */
  children: React.ReactNode
}

/**
 * A customizable button component. It can be interacted with by users to trigger an action.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', color = 'secondary', size = 'm', children, className, active, ...props }, ref) => (
    <button
      ref={ref}
      className={classnames([
        styles.button,
        styles[variant],
        styles[color],
        styles[size],
        { [styles['active']]: active },
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  )
)
