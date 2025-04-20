import { ConfigContext, ExpoConfig } from "@expo/config";
import { Env } from "./env";

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    name: Env.NAME,
    slug: Env.SCHEME,
    scheme: Env.SCHEME,
    version: Env.VERSION,
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    assetBundlePatterns: ["**/*"],
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: Env.BUNDLE_ID,
      buildNumber: Env.IOS_BUILD_NUMBER,
      config: {
        usesNonExemptEncryption: false,
      },
      infoPlist: {
        UIBackgroundModes: ["audio"],
      },
    },
    platforms: ["ios", "android"],
    plugins: [
      ["react-native-edge-to-edge", { android: { parentTheme: "Light" } }],
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
      ["expo-dev-launcher", { launchMode: "most-recent" }],
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/material-symbols.ttf",
            "./assets/fonts/Silkscreen-Regular.ttf",
            "./assets/fonts/Figtree-Regular.ttf",
            "./assets/fonts/Figtree-Medium.ttf",
            "./assets/fonts/Figtree-SemiBold.ttf",
            "./assets/fonts/Figtree-Bold.ttf",
            "./assets/fonts/Figtree-ExtraBold.ttf",
          ],
        },
      ],
    ],
    android: {
      package: Env.PACKAGE,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    experiments: {
      reactCompiler: true,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  };
};
