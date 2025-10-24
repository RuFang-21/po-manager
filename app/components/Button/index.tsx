import { memo } from "react"
import { Stack, Button as TMGButton } from "tamagui"

import Spinner from "../Spinner"
import Text from "../Text"
import { createButtonTheme } from "./helper"
import { ButtonProps } from "./props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const ButtonView: React.FC<ButtonProps> = (props) => {
  const {
    title,
    textProps,
    loading,
    disabled = false,
    containerProps,
    children,
    variant = "contained",
    spinnerProps,
    backgroundColor,
    color,
    onPress,
    ...restProps
  } = props

  // =============== HOOKS
  const {
    backgroundColor: backgroundColorTheme,
    color: colorTheme,
    border: borderTheme,
  } = createButtonTheme({
    variant,
    disabled,
    backgroundColor,
    color,
  })

  // =============== EVENTS

  // =============== VIEWS
  return (
    <Stack {...containerProps}>
      <TMGButton
        disabled={disabled || loading}
        backgroundColor={backgroundColorTheme}
        alignItems="center"
        justifyContent="center"
        borderRadius={"$common"}
        color={colorTheme}
        pressStyle={{
          backgroundColor: backgroundColorTheme,
        }}
        onPress={onPress}
        {...borderTheme}
        {...restProps}
      >
        {loading ? (
          <Stack>
            <Spinner color={variant === "contained" ? "white" : "$primaryText"} {...spinnerProps} />
          </Stack>
        ) : (
          children || (
            <Text fontWeight={"$600"} color={colorTheme} textAlign="center" {...textProps}>
              {title}
            </Text>
          )
        )}
      </TMGButton>
    </Stack>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from "./props"
export const Button = memo(ButtonView)
export default Button
