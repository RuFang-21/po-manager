/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
  "@babel/plugin-proposal-export-namespace-from",
  "inline-dotenv",
  [
    "module-resolver",
    {
      root: ["."],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        // This has to be mirrored in tsconfig.json
        // "^@app/(.+)": "./app/\\1",
        // "^@assets/(.+)": "./assets/\\1",
        "@assets": "./assets",
        "@": "./src",
      },
    },
  ],
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {},
    },
    plugins: ["react-native-reanimated/plugin"],
  }
}
