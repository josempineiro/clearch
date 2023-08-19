import React from 'react'
import cn from 'classnames'
import styles from './card.module.css'
import { FlexBox, FlexItem, Image, Text } from '@/atoms'
import { AbsolutePosition } from '@/atoms/absolute-position'

export interface CardProps {
  className?: string
  media: React.ReactNode
  label: React.ReactNode
  heading: string
  subheading: string
  children: React.ReactNode
  multimedia?: string
  actions: React.ReactNode
  size?: 's' | 'm' | 'l'
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  label,
  actions,
  multimedia,
  heading,
  subheading,
  size = 's',
  ...rest
}) => {
  return (
    <FlexBox
      className={cn(styles.card, className, {
        [styles[size]]: true,
      })}
      direction={size === 'l' ? 'row' : 'column'}
      {...rest}
    >
      <FlexItem className={styles['card-header']} direction="column" flex={1}>
        {multimedia && <Image objectFit="cover" width="100%" src={multimedia} className={styles['card-multimedia']} />}

        {label && (
          <AbsolutePosition offsetX={8} offsetY={8} position="top-left">
            {label}
          </AbsolutePosition>
        )}
        {actions && (
          <AbsolutePosition offsetX={8} offsetY={8} position="bottom-right">
            {actions}
          </AbsolutePosition>
        )}
      </FlexItem>
      <FlexItem padding={'xs'} direction="column" className={styles['card-content']}>
        {heading && <Text variant="title">{heading}</Text>}
        {subheading && <Text variant="subtitle">{subheading}</Text>}
        {children}
      </FlexItem>
    </FlexBox>
  )
}

export default Card
