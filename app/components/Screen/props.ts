import { ReactNode } from "react"
import {
  ImageBackgroundProps,
  ImageSourcePropType,
  ScrollViewProps,
  StyleProp,
  ViewProps,
  ViewStyle,
} from "react-native"
import { SystemBarsProps } from "react-native-edge-to-edge"
import { KeyboardAvoidingViewProps } from "react-native-keyboard-controller"

import { ExtendedEdge } from "../../utils/useSafeAreaInsetsStyle"

export interface BaseScreenProps {
  /**
   * Children components.
   */
  children?: ReactNode
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[]
  /**
   * Background color
   */
  backgroundColor?: string
  /**
   * System bar setting. Defaults to dark.
   */
  systemBarStyle?: SystemBarsProps["style"]
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number
  /**
   * By how much we scroll up when the keyboard is shown. Defaults to 50.
   */
  keyboardBottomOffset?: number
  /**
   * Pass any additional props directly to the SystemBars component.
   */
  systemBarsProps?: SystemBarsProps
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  keyboardAvoidingViewProps?: Omit<KeyboardAvoidingViewProps, "behavior" | "contentContainerStyle">

  /**
   * Header component of the screen, by default should use the `ScreenHeader` component
   */
  StickyHeader?: React.ReactElement

  /**
   * Footer component of the screen, by default should use the `ScreenFooter` component
   */
  StickyFooter?: React.ReactElement

  /**
   * An optional background image source.
   * If provided, the screen will render an fullscreen ImageBackground.
   * Else, `backgroundColor` will be used.
   */
  backgroundImageSource?: ImageSourcePropType

  backgroundImageProps?: ImageBackgroundProps

  containerProps?: ViewProps

  unsafe?: boolean
}

export interface FixedScreenProps extends BaseScreenProps {
  preset?: "fixed"
}
export interface ScrollScreenProps extends BaseScreenProps {
  preset?: "scroll"
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  scrollViewProps?: ScrollViewProps
}

export interface AutoScreenProps extends Omit<ScrollScreenProps, "preset"> {
  preset?: "auto"
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number }
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps | AutoScreenProps

export type ScreenPreset = "fixed" | "scroll" | "auto"
