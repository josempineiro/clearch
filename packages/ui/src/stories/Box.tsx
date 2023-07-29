import { forwardRef } from 'react'
import { FlexBox } from '@/atoms'

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  children?: React.ReactNode
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ size, children, ...rest }, ref) => {
  return (
    <FlexBox
      {...rest}
      ref={ref}
      variant="outlined"
      color="primary"
      justifyContent="center"
      alignItems="center"
      style={
        size
          ? {
              width: `${size}px`,
              height: `${size}px`,
            }
          : {
              width: '100%',
              height: '100%',
            }
      }
    >
      {children}
    </FlexBox>
  )
})
