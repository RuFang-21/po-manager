import { ViewStyle } from "react-native"

export interface LottieProps {
  /**
   * The source for the Lottie animation
   */
  source: any
  /**
   * Whether the animation should loop
   */
  loop?: boolean
  /**
   * Whether the animation should auto play
   */
  autoPlay?: boolean
  /**
   * Speed of the animation
   */
  speed?: number
  /**
   * Style for the Lottie view
   */
  style?: ViewStyle
  /**
   * Width of the animation
   */
  width?: number
  /**
   * Height of the animation
   */
  height?: number
  /**
   * Resize mode for the animation
   */
  resizeMode?: "cover" | "contain" | "center"
}
