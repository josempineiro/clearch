import { forwardRef } from 'react'
import cn from 'classnames'
import { Container, ContainerProps } from '@/atoms/container'
import styles from './flex-box.module.css'

export interface FlexBoxProps extends ContainerProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
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
      gap,
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
          styles[`gap-${gap}`],
          styles[flexWrap],
        ])}
      >
        {children}
      </Container>
    )
  },
)

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>(
  ({ children, flex, grow, shrink, basis, className, ...rest }, ref) => {
    return (
      <FlexBox
        {...rest}
        ref={ref}
        style={{
          flex: flex ?? `${grow} ${shrink} ${basis}`,
        }}
        className={cn([className, styles.item])}
      >
        {children}
      </FlexBox>
    )
  },
)
