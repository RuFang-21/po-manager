import { createFont } from "tamagui"

export const fontTokens = {
  family: "Poppins",
  size: {
    1: 6,
    2: 8,
    3: 10,
    4: 12,
    5: 14,
    "true": 14,
    "2xs": 8,
    "xs": 10,
    "sm": 12,
    "md": 14,
    "lg": 16,
    "xl": 18,
    "2xl": 20,
    "3xl": 24,
    "4xl": 28,
    "5xl": 30,
    "6xl": 32,
    "7xl": 36,
    "8xl": 48,
    "9xl": 60,
    "10xl": 72,
  },
  lineHeight: {
    "xs": 16,
    "sm": 18,
    "md": 20,
    "lg": 22,
    "xl": 26,
    "2xl": 28,
    "3xl": 32,
    "4xl": 32,
    "5xl": 34,
  },
  weight: {
    // tamagui seems like always start with this default family, it does not work even we use the regular one as default and having face - 300 font weight setting
    100: 100,
    200: 200,
    300: 300,
    400: 400,
    500: 500,
    600: 600,
    700: 700,
    800: 800,
    900: 900,
  },
  letterSpacing: {
    1: 0,
    2: -1,
    // 3 will be -1
  },
  // (native) swap out fonts by face/style
  face: {
    // tamagui seems like always start with this default family, it does not work even we use the regular one as default and having face - 300 font weight setting
    100: {
      normal: "Poppins-Thin",
      italic: "Poppins-ThinItalic",
    },
    200: {
      normal: "Poppins-Light",
      italic: "Poppins-LightItalic",
    },
    300: {
      normal: "Poppins-Light",
      italic: "Poppins-LightItalic",
    },
    400: {
      normal: "Poppins-Regular",
      italic: "Poppins-Italic",
    },
    500: {
      normal: "Poppins-Medium",
      italic: "Poppins-MediumItalic",
    },
    600: {
      normal: "Poppins-SemiBold",
      italic: "Poppins-SemiBoldItalic",
    },
    700: {
      normal: "Poppins-Bold",
      italic: "Poppins-BoldItalic",
    },
    800: {
      normal: "Poppins-Bold",
      italic: "Poppins-BoldItalic",
    },
    900: {
      normal: "Poppins-Black",
      italic: "Poppins-BlackItalic",
    },
  },
}

export const poppinsFont = createFont(fontTokens)
