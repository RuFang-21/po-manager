import { ParagraphProps } from "@tamagui/text"

export interface TextProps extends Omit<ParagraphProps, "size"> {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: Record<string, any>
  /**
   * The text preset sizes
   */
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
  /**
   * The text preset weights
   */
  weight?: "light" | "normal" | "medium" | "semiBold" | "bold"
  /**
   * The text preset variants
   */
  preset?: "default" | "bold" | "heading" | "subheading" | "formLabel" | "formHelper"
}
