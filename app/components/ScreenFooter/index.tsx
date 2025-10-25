import { memo } from "react"
import { View } from "react-native"
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller"
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { getTokens, Stack } from "tamagui"

import { ScreenFooterProps } from "./props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const AnimatedStack = Animated.createAnimatedComponent(Stack)

const ScreenFooterView: React.FC<ScreenFooterProps> = (props) => {
  const { children, containerProps, isElevated } = props

  // =============== HOOKS
  const insets = useSafeAreaInsets()

  const { progress } = useReanimatedKeyboardAnimation()

  // =============== VARIABLES
  const spaceTamaguiTokens = getTokens().space

  const animatedStyle = useAnimatedStyle(() => {
    const paddingBottom = interpolate(
      progress.value,
      [0, 1],
      [insets.bottom, spaceTamaguiTokens.$xl.val],
      Extrapolation.CLAMP,
    )

    return { paddingBottom }
  }, [])

  // =============== VIEWS
  return (
    <View
      style={
        isElevated
          ? {
              elevation: 10,
              shadowColor: "black",
              shadowOffset: { width: 0, height: -1 },
              shadowRadius: 6,
              shadowOpacity: 0.2,
              backgroundColor: "white",
            }
          : {}
      }
    >
      <AnimatedStack
        {...containerProps}
        style={[
          animatedStyle,
          {
            paddingHorizontal: spaceTamaguiTokens.$screenPadding.val,
            paddingTop: spaceTamaguiTokens.$xl.val,
          },
          containerProps?.style,
        ]}
      >
        {children && children}
      </AnimatedStack>
    </View>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const ScreenFooter = memo(ScreenFooterView)
export default ScreenFooter

export * from "./props"
