import React, { useEffect, useCallback } from 'react'

export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  fallbackSrc?: string
  placeholderSrc?: string
}

const defaultPlaceholderSrc = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

export const Image = ({ fallbackSrc, placeholderSrc = defaultPlaceholderSrc, src, ...rest }: ImageProps) => {
  const [imageSrc, setImageSrc] = React.useState(placeholderSrc)

  const onError = () => {
    if (fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  const loadImage = useCallback(
    (loadedSrc: string) => {
      const image = new window.Image()
      image.src = loadedSrc
      image.onload = () => setImageSrc(loadedSrc)
      image.onerror = () => setImageSrc(fallbackSrc || placeholderSrc)
    },
    [fallbackSrc, placeholderSrc],
  )

  useEffect(() => {
    if (src) {
      loadImage(src)
    }
  }, [loadImage, src])

  return <img {...rest} src={imageSrc} onError={onError} />
}

export default Image
