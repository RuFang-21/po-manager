import { createTamagui, createTokens } from "@tamagui/core"
import { shorthands } from "@tamagui/shorthands"

import { color } from "./color"
import { poppinsFont } from "./font"
import { radius } from "./radius"
import { space } from "./space"

// Create comprehensive tokens
const tokens = createTokens({
  color: {
    // Basic semantic colors
    white: "#FFFFFF",
    black: "#000000",
    transparent: "rgba(0,0,0,0)",

    // Map custom colors to Tamagui semantic naming
    background: color.greyBg,
    backgroundStrong: "#FFFFFF",
    backgroundHover: color.line,
    backgroundPress: color.borderLine,
    backgroundFocus: color.line,
    backgroundTransparent: "rgba(0,0,0,0)",

    color: color.primaryText,
    colorHover: color.secondaryText,
    colorPress: color.placeholderText,
    colorFocus: color.primaryText,
    colorTransparent: "rgba(0,0,0,0)",

    borderColor: color.border,
    borderColorHover: color.borderLine,
    borderColorFocus: color.primary400,
    borderColorPress: color.borderLine,

    placeholderColor: color.placeholderText,

    // Primary colors
    primary: color.primary400,
    primaryHover: color.primary450,
    primaryPress: color.primary500,
    primaryFocus: color.primary400,

    // Secondary colors
    secondary: color.secondary500,
    secondaryHover: color.secondary500,
    secondaryPress: color.secondary500,

    // Error colors
    error: color.errorText,
    errorHover: color.redWarningText,
    errorPress: color.red400,

    // Include all custom colors
    ...color,
  },

  space: {
    0: 0,
    0.25: 1,
    0.5: 2,
    0.75: 3,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
    40: 160,
    48: 192,
    56: 224,
    64: 256,
    72: 288,
    80: 320,
    96: 384,

    // Include custom space tokens
    ...space,

    // Add common semantic names
    xxs: space["3xs"],
    xs: space.xs,
    sm: space.sm,
    md: space.md,
    lg: space.lg,
    xl: space.xl,
    xxl: space["2xl"],
    xxxl: space["4xl"],
  },

  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,

    // Include space values as sizes
    ...space,
  },

  radius: {
    0: 0,
    1: 2,
    2: 4,
    3: 6,
    4: 8,
    5: 10,
    6: 12,
    7: 14,
    8: 16,
    9: 18,
    10: 20,
    12: 24,

    // Include custom radius
    ...radius,
  },

  zIndex: {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
  },
})

// Create themes
const lightTheme = {
  background: tokens.color.background,
  backgroundHover: tokens.color.backgroundHover,
  backgroundPress: tokens.color.backgroundPress,
  backgroundFocus: tokens.color.backgroundFocus,
  backgroundStrong: tokens.color.backgroundStrong,
  backgroundTransparent: tokens.color.backgroundTransparent,
  color: tokens.color.color,
  colorHover: tokens.color.colorHover,
  colorPress: tokens.color.colorPress,
  colorFocus: tokens.color.colorFocus,
  colorTransparent: tokens.color.colorTransparent,
  borderColor: tokens.color.borderColor,
  borderColorHover: tokens.color.borderColorHover,
  borderColorFocus: tokens.color.borderColorFocus,
  borderColorPress: tokens.color.borderColorPress,
  placeholderColor: tokens.color.placeholderColor,
  primary: tokens.color.primary,
  primaryHover: tokens.color.primaryHover,
  primaryPress: tokens.color.primaryPress,
  primaryFocus: tokens.color.primaryFocus,
  secondary: tokens.color.secondary,
  secondaryHover: tokens.color.secondaryHover,
  secondaryPress: tokens.color.secondaryPress,
  error: tokens.color.error,
  errorHover: tokens.color.errorHover,
  errorPress: tokens.color.errorPress,
}

const darkTheme = {
  ...lightTheme,
  background: "#000000",
  backgroundStrong: "#111111",
  color: "#FFFFFF",
  colorPress: "#CCCCCC",
  borderColor: "#333333",
}

export const config = createTamagui({
  defaultTheme: "light",
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: poppinsFont,
    body: poppinsFont,
  },
  tokens,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
})

export default config

export type Conf = typeof config

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}
