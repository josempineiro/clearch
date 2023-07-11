import React, { useEffect, useCallback } from 'react'
import styles from './image.module.css'
import cn from 'classnames'
export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  fallbackSrc?: string
  placeholderSrc?: string
  height?: number | string
  width: number | string
  aspectRatio?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

const defaultPlaceholderSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAPoCAQAAAC1v1zVAAAAH0lEQVR42u3CMQ0AAAwDoNT/VxWVORs7IKSLqqr6+wFUQc61Ue8DtgAAAABJRU5ErkJggg=='

export const Image = ({
  fallbackSrc = defaultPlaceholderSrc,
  placeholderSrc = defaultPlaceholderSrc,
  height,
  width,
  src,
  objectFit,
  aspectRatio,
  ...rest
}: ImageProps) => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [imageSrc, setImageSrc] = React.useState(placeholderSrc)

  const loadImage = useCallback(
    (loadedSrc: string) => {
      const image = new window.Image()
      image.src = loadedSrc
      setImageSrc(placeholderSrc)
      setLoading(true)
      image.onload = () => {
        setLoading(false)
        setImageSrc(loadedSrc)
      }
      image.onerror = () => {
        setImageSrc(fallbackSrc)
        setLoading(false)
        setError(true)
      }
    },
    [fallbackSrc, placeholderSrc],
  )

  useEffect(() => {
    if (src) {
      loadImage(src)
    }
  }, [loadImage, src])

  const placeholder = (() => {
    if (loading) {
      return 'Loading...'
    }
    if (error) {
      return 'Error'
    }
    return undefined
  })()

  return (
    <span
      className={cn(styles.wrapper, {})}
      style={
        {
          ['--image-placeholder']: placeholder,
        } as React.CSSProperties
      }
    >
      <img
        {...rest}
        style={{
          objectFit,
          display: loading ? 'none' : 'block',
          aspectRatio,
          height,
          width,
        }}
        className={styles.image}
        src={imageSrc}
      />
    </span>
  )
}

export default Image
