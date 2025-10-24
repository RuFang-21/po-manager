import { ReactElement } from "react"
import { InputProps, StackProps, XStackProps } from "tamagui"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type TextInputProps = Omit<InputProps, "onChange" | "onChangeText"> & {
  prefix?: string | ReactElement
  postfix?: string | ReactElement
  extra?: ReactElement

  /**
   * Value to be used when `isControlled` is `true`
   */
  value?: string

  /**
   * Value updating function to be used when `isControlled` is `true`
   */
  onChange?: (value: string) => void

  /**
   * Callback function to be called regardless value of `isControlled`
   */
  onChangeCallback?: (value: string) => void

  isControlled?: boolean

  defaultValue?: string

  inputContainerProps?: XStackProps
  parentContainerProps?: StackProps

  isMultiline?: boolean

  useBottomSheetInput?: boolean
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default TextInputProps
