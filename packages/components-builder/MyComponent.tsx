import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './my-module.module.css'

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <div className={cn(styles.container, props.className)}>{props.children}</div>
}

export default MyComponent
