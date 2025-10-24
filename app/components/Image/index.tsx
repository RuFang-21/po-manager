import { memo, useState } from "react"
import { Image as ExpoImage } from "expo-image"
import EmptyImage from "@assets/images/empty_image.png"

import { ImageProps } from "./props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const ImageView: React.FC<ImageProps> = (props) => {
  const [insideImage, setInsideImage] = useState(props?.source ?? EmptyImage)
  const [insideStyle, setInsideStyle] = useState(props?.style)

  return (
    <ExpoImage
      {...props}
      source={insideImage}
      onError={(e) => {
        setInsideImage(props.errorImageSource ?? EmptyImage)
        if (props.errorImageStyle) {
          setInsideStyle(props.errorImageStyle)
        }
        props?.onError?.(e)
      }}
      style={insideStyle}
    />
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Image = memo(ImageView)
export default Image

export * from "./props"
