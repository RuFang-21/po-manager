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

// Fix axios/apisauce issue
config.resolver.unstable_conditionNames = ["require", "default", "browser"]

// Support for .cjs
config.resolver.sourceExts.push("cjs")

// ✅ Add alias support (for @ and @assets)
config.resolver.alias = {
  "@": path.resolve(__dirname, "app"),
  "@assets": path.resolve(__dirname, "assets"),
}

// ✅ (Optional but recommended for Tamagui + monorepo setups)
config.resolver.unstable_enableSymlinks = true

module.exports = config
