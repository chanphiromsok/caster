const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, { isCSSEnabled: true });
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true,
    nonInlinedRequires: [
      "React",
      "react",
      "react-compiler-runtime",
      "react/jsx-dev-runtime",
      "react/jsx-runtime",
      "react-native"
    ]
  }
});
config.transformer.babelTransformerPath = require.resolve("./metro.transformer.js");
config.transformer.minifierConfig.compress.drop_console = true;
config.resolver.sourceExts = [...config.resolver.sourceExts, "po"];
module.exports = withNativeWind(config, { input: "./global.css" })