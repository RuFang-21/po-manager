/* eslint-env node */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Add SVG support
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer/expo")
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg")
config.resolver.sourceExts.push("svg")

config.transformer.getTransformOptions = async () => ({
  transform: {
    inlineRequires: true,
  },
})

config.resolver.unstable_conditionNames = ["require", "default", "browser"]

config.resolver.sourceExts.push("cjs")

config.resolver.alias = {
  "@": path.resolve(__dirname, "app"),
  "@assets": path.resolve(__dirname, "assets"),
}

config.resolver.alias = {
  ...config.resolver.alias,
  "react-native-reanimated/package.json": require.resolve("react-native-reanimated/package.json"),
}

config.resolver.unstable_enableSymlinks = true

module.exports = config
