import { forwardRef } from 'react'
import classnames from 'classnames'
import { FlexBox, FlexBoxProps } from '@/atoms'
import styles from './grouped-buttons.module.css'

export interface GroupedButtonsProps extends Omit<FlexBoxProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export const GroupedButtons = forwardRef<HTMLDivElement, GroupedButtonsProps>(
  ({ variant = 'primary', children, className, ...props }, ref) => {
    return (
      <FlexBox ref={ref} className={classnames([className, styles['grouped-buttons'], styles[variant]])} {...props}>
        {children}
      </FlexBox>
    )
  },
)
