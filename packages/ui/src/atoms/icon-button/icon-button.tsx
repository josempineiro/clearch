import { forwardRef } from 'react'
import classnames from 'classnames'
import { Button } from '@/atoms/button/button';
import type { ButtonProps } from '@/atoms/button/button';
import styles from './icon-button.module.css'

export type IconButtonProps = ButtonProps
/**
 * A customizable button component. It can be interacted with by users to trigger an action.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'default', size = 'm', children, className, ...props }, ref) => (
    <Button
      ref={ref}
      variant={variant}
      className={classnames([
        className,
        styles['icon-button'],
        styles[variant],
        styles[size],
      ])}
      {...props}
    >
      {children}
    </Button>
  )
)
