import React from 'react'
import cn from 'classnames'
import styles from './auto-sizer.module.css'

export interface AutoSizerChildrenProps {
  width: number
  height: number
}

export interface AutoSizerProps extends Omit<React.HTMLProps<HTMLDivElement>, 'children'> {
  children: React.ReactElement | (({ width, height }: AutoSizerChildrenProps) => React.ReactNode)
  initialWidth?: number
  initialHeight?: number
}

export const AutoSizer = ({ children, className, initialWidth = 0, initialHeight = 0 }: AutoSizerProps) => {
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
    <div className={cn(styles.autoSizer, className)} ref={autoSizerRef} data-height={height}>
      {height &&
        width &&
        (typeof children === 'function'
          ? children({ width, height })
          : React.cloneElement(children as React.ReactElement, { width, height }))}
    </div>
  )
}

export default AutoSizer
