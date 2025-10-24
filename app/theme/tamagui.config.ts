// the v2 config imports the css driver on web and react-native on native
// for reanimated: @tamagui/config/v2-reanimated
// for react-native only: @tamagui/config/v2-native
import { config } from "@tamagui/config/v2"
import { createTamagui, createTokens } from "tamagui"

import { color } from "./color"
import { fontTokens, poppinsFont } from "./font"
import { radius } from "./radius"
import { space } from "./space"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const tokens = createTokens({
  ...config?.tokens,
  color,
  radius: {
    ...config?.tokens?.radius,
    ...radius,
  },
  fontSize: {
    ...fontTokens?.size,
  },
  space: {
    ...config?.tokens?.space,
    ...space,
  },
})

const appConfig = createTamagui({
  ...config,
  tokens,
  fonts: {
    // for tamagui, heading and body are assumed
    heading: poppinsFont,
    body: poppinsFont,
  },
  defaultFont: "body",
})

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default appConfig
