import React from 'react'
import cn from 'classnames'
import styles from './absolute-position.module.css'

export interface AbsolutePositionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  offsetX?: number
  offsetY?: number
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right'
}

export const AbsolutePosition: React.FC<AbsolutePositionProps> = ({
  offsetX,
  offsetY,
  position = 'top-left',
  className,
  children,
}) => {
  return (
    <div
      className={cn(className, styles['absolute-position'], {
        [styles[position]]: true,
      })}
      style={{ margin: `${offsetX}px ${offsetY}px` }}
    >
      {children}
    </div>
  )
}

export default AbsolutePosition
