import { memo } from "react"
import { Text as TMGText } from "tamagui"

import { getTextLineHeight } from "./helper"
import { TextProps } from "./props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const TextView: React.FC<TextProps> = (props) => {
  const { fontSize = "$md", text, children, ...restProps } = props

  // =============== VARIABLES
  const content = children ?? text

  return (
    <TMGText
      color={"$primaryText"}
      fontWeight={"$400"}
      // fontFamily={"Poppins"}
      fontSize={fontSize}
      lineHeight={getTextLineHeight(fontSize)}
      minHeight={getTextLineHeight(fontSize)}
      style={{
        includeFontPadding: false,
        textAlignVertical: "center",
      }}
      {...restProps}
    >
      {content}
    </TMGText>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Text = memo(TextView)
export default Text

export * from "./helper"
export * from "./props"
