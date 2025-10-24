// 1. Base color object
const baseColors = {
  primaryText: "#1E1E1E",
  secondaryText: "#6F6F6F",
  placeholderText: "#BBBBBB",
  errorText: "#CC0000",
  redWarningText: "#FF4B4B",
  disabled: "#DBDBDB",
  greyBg: "#F6F6F6",
  inputBg: "#F6F6F6",
  border: "#CACACA",
  line: "#E7E7E7",
  borderLine: "#D8D8D8",
} as const

// 2. Color palettes with prefixes
const palettes = {
  primary: {
    "400": "#0025FF",
    "450": "#011AAE",
    "500": "#0D23A1",
    "550": "#00179C",
    "600": "#A3ABDB",
  },
  secondary: {
    "50": "#FFFFFF",
    "500": "#374255",
  },
  red: {
    "GradientStart": "#D20050",
    "GradientEnd": "#FF3A86",
    "100": "#FED1E3",
    "150": "#FFCAC8",
    "175": "#FFA6A6",
    "200": "#FF5C5C",
    "400": "#F42121",
  },
  blue: {
    "100": "#E2E5F4",
    "150": "#CAF1FF",
    "200": "#C7EDFF",
    "300": "#D4F1FF",
    "325": "#C1DFF7",
    "800": "#001762",
    "GradientStart": "#0026FE",
    "GradientEnd": "#2F7EFF",
  },
  orange: {
    "100": "#FEF1EB",
    "200": "#FCEAE0",
    "250": "#FFE2D3",
    "300": "#F9C4A7",
    "400": "#FFA948",
    "500": "#EE6B00",
    "600": "#FFD6A7",
    "GradientStart": "#FF0400",
    "GradientEnd": "#FF9500",
  },
  purple: {
    "200": "#F4F3FF",
    "300": "#E6E4F9",
    "400": "#BCAEF9",
    "500": "#7A5CFF",
    "600": "#DDD4FF",
  },
  yellow: {
    "100": "#FFF6F1",
    "200": "#FAF3E4",
    "300": "#FFE3B5",
    "400": "#FFEDB3",
  },

  grey: {
    "100": "#F4F7F8",
    "200": "#A9A9A9",
  },

  green: {
    "50": "#E0FFF7",
    "100": "#12D39A",
    "200": "#EEFFC4",
    "300": "#63E9C2",
    "400": "#00BF87",
  },
} as const

// 3. Utility to prefix all palette keys
const prefixAllPalettes = <T extends Record<string, Record<string, string>>>(
  obj: T,
): {
  [P in keyof T as `${string & P}${keyof T[P] & string}`]: T[P][keyof T[P]]
} => {
  const result: Record<string, string> = {}
  for (const prefix in obj) {
    for (const key in obj[prefix]) {
      result[`${prefix}${key}`] = obj[prefix][key]
    }
  }
  return result as any
}

// 4. Final merged color object
export const color = {
  ...baseColors,
  ...prefixAllPalettes(palettes),
} as const

// 5. Type helpers (optional but recommended for type safety)
type BaseColors = typeof baseColors

type PrefixedKeys<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${K & string}`]: T[K]
}

export type Color = BaseColors &
  PrefixedKeys<(typeof palettes)["primary"], "primary"> &
  PrefixedKeys<(typeof palettes)["secondary"], "secondary"> &
  PrefixedKeys<(typeof palettes)["red"], "red"> &
  PrefixedKeys<(typeof palettes)["blue"], "blue"> &
  PrefixedKeys<(typeof palettes)["orange"], "orange"> &
  PrefixedKeys<(typeof palettes)["purple"], "purple"> &
  PrefixedKeys<(typeof palettes)["yellow"], "yellow"> &
  PrefixedKeys<(typeof palettes)["grey"], "grey"> &
  PrefixedKeys<(typeof palettes)["green"], "green">

// You can now use `color.primary500`, `color.secondary50`, etc., all type-safe!
