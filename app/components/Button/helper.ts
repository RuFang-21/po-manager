import { ColorValue } from "react-native"

import { ButtonVariant } from "./props"

export const createButtonTheme = (props: {
  variant: ButtonVariant
  disabled: boolean
  backgroundColor?: string
  color?: ColorValue
}) => {
  const { variant, disabled, backgroundColor, color } = props

  let backgroundColorTheme = "$primary500"
  let colorTheme = "white"
  let borderTheme = {}

  switch (variant) {
    case "text":
      backgroundColorTheme = "transparent"
      colorTheme = "$primary500"
      break

    case "outlined":
      backgroundColorTheme = "white"
      colorTheme = "$primaryText"
      borderTheme = {
        borderWidth: 1,
        borderColor: "$line",
      }
      break

    case "contained":
    default:
      if (disabled) {
        backgroundColorTheme = "$placeholderText"
        colorTheme = "white"
      }
      break
  }

  return {
    backgroundColor: backgroundColor || backgroundColorTheme,
    color: color ?? colorTheme,
    border: borderTheme,
  }
}
