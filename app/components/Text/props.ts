import { TOptions } from "i18next"
import { SizableTextProps } from "tamagui"

export type TextProps = SizableTextProps & {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: React.ReactNode
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions

  loading?: boolean
  loadingWidth?: number | string
  loadingLines?: number
}
