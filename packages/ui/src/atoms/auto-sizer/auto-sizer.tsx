import React from 'react'
import cn from 'classnames'
import styles from './auto-sizer.module.css'
import { Container, ContainerProps } from '@/atoms/container'

export interface AutoSizerChildrenProps {
  width: number
  height: number
}

export interface AutoSizerProps extends Omit<ContainerProps, 'children'> {
  children: React.ReactElement | (({ width, height }: AutoSizerChildrenProps) => React.ReactNode)
  initialWidth?: number
  initialHeight?: number
}

export const AutoSizer = ({ children, className, initialWidth = 0, initialHeight = 0, ...rest }: AutoSizerProps) => {
  const autoSizerRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(initialWidth)
  const [height, setHeight] = React.useState(initialHeight)

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setWidth(width)
      setHeight(height)
    })
    if (autoSizerRef.current) {
      resizeObserver.observe(autoSizerRef.current)
    }
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <Container className={cn(styles['auto-sizer'], className)} ref={autoSizerRef} width="full" height="full" {...rest}>
      {height > 0 &&
        width > 0 &&
        (typeof children === 'function'
          ? children({ width, height })
          : React.cloneElement(children as React.ReactElement, { width, height }))}
    </Container>
  )
}

export default AutoSizer
