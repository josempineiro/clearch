import { forwardRef } from 'react'
import cn from 'classnames'
import { Container, ContainerProps } from '@/atoms/container'
import styles from './flex-box.module.css'

export interface FlexBoxProps extends ContainerProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
}

export interface FlexItemProps extends FlexBoxProps {
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  order?: number
  flex?: number
  grow?: number
  shrink?: number
  basis?: string
}

export const FlexBox = forwardRef<HTMLDivElement, FlexBoxProps>(
  (
    {
      direction = 'row',
      justifyContent = 'flex-start',
      alignItems = 'stretch',
      flexWrap = 'nowrap',
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <Container
        {...rest}
        ref={ref}
        className={cn([
          className,
          styles['flex-box'],
          styles[direction],
          styles[`justify-${justifyContent}`],
          styles[`align-${alignItems}`],
          styles[flexWrap],
        ])}
      >
        {children}
      </Container>
    )
  },
)

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>(
  ({ children, flex, grow, shrink, basis, ...rest }, ref) => {
    return (
      <FlexBox
        {...rest}
        ref={ref}
        style={{
          flex: flex ?? `${grow} ${shrink} ${basis}`,
        }}
        className={cn([styles.item])}
      >
        {children}
      </FlexBox>
    )
  },
)
