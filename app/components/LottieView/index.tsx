import LottieView from "lottie-react-native"
import { View } from "tamagui"

import { LottieProps } from "./props"

/**
 * Lottie animation component that works with Tamagui
 */
export function Lottie(props: LottieProps) {
  const {
    source,
    loop = true,
    autoPlay = true,
    speed = 1,
    style,
    width = 200,
    height = 200,
    resizeMode = "contain",
    ...rest
  } = props

  return (
    <View width={width} height={height} style={style}>
      <LottieView
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        speed={speed}
        resizeMode={resizeMode}
        style={{
          width: "100%",
          height: "100%",
        }}
        {...rest}
      />
    </View>
  )
}

// Predefined Lottie animations from assets
export const LottieAnimations = {
  inventory: require("@assets/lottie/inventory.json"),
}
