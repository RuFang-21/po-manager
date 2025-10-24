import { ColorValue } from "react-native"
import { ButtonProps as TMBButtonProps, ColorTokens, SpinnerProps, StackProps } from "tamagui"

import { TextProps } from "../Text/props"

type OmitButtonProps = "variant" | "onPress" | "icon" | "iconAfter" | "backgroundColor" | "color"

export type ButtonVariant = "outlined" | "contained" | "text"

export type ButtonProps = Omit<TMBButtonProps, OmitButtonProps> & {
  variant?: ButtonVariant
  loading?: boolean

  title?: string
  titleProps?: TextProps

  color?: ColorValue | string
  spinnerProps?: SpinnerProps

  backgroundColor?: ColorTokens | string
  containerProps?: StackProps

  onPress?: () => void
}
