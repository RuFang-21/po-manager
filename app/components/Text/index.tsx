import { Paragraph, H2, H3 } from "@tamagui/text"

import { translate } from "@/i18n/translate"

import { TextProps } from "./props"

// Size mappings for different presets
const sizeMap = {
  xxs: 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
  xxl: 7,
}

// Weight mappings
const weightMap = {
  light: "300",
  normal: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
} as const

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  const {
    tx,
    text,
    txOptions,
    size = "md",
    weight = "normal",
    preset = "default",
    style,
    ...rest
  } = props

  // Figure out the content
  const content = tx ? translate(tx as any, txOptions) : text

  // Map our custom size to Tamagui size
  const tamaguiSize = sizeMap[size] || sizeMap.md
  const fontWeight = weightMap[weight] || weightMap.normal

  // Choose component based on preset
  const getComponent = () => {
    switch (preset) {
      case "heading":
        return (
          <H2 size={tamaguiSize} fontWeight={fontWeight} style={style} {...rest}>
            {content}
          </H2>
        )
      case "subheading":
        return (
          <H3 size={tamaguiSize} fontWeight={fontWeight} style={style} {...rest}>
            {content}
          </H3>
        )
      case "bold":
        return (
          <Paragraph size={tamaguiSize} fontWeight="700" style={style} {...rest}>
            {content}
          </Paragraph>
        )
      case "formLabel":
        return (
          <Paragraph size={3} fontWeight="600" style={style} {...rest}>
            {content}
          </Paragraph>
        )
      case "formHelper":
        return (
          <Paragraph size={2} color="$colorPress" style={style} {...rest}>
            {content}
          </Paragraph>
        )
      default:
        return (
          <Paragraph size={tamaguiSize} fontWeight={fontWeight} style={style} {...rest}>
            {content}
          </Paragraph>
        )
    }
  }

  return getComponent()
}
