module.exports = function (api) {
  api.cache(true);
  const isTestEnv = process.env.NODE_ENV === "test";
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          lazyImports: true,
          disableImportExportTransform: !isTestEnv, // set to false when running unit test
          native: {
            minifyTypeofWindow: false, //https://github.com/expo/expo/tree/main/packages/babel-preset-expo#minifytypeofwindow
          },
        },
      ],
      "nativewind/babel",
    ],
    plugins: [
      ["babel-plugin-react-compiler", { target: "18" }], // must run first!
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            tests: ["./tests/"],
            "@components": "./src/components",
          },
        },
      ],
      "@lingui/babel-plugin-lingui-macro",
      "react-native-reanimated/plugin", //Reanimated must be last
    ],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
  };
};
