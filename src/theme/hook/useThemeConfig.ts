import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
  type Theme,
} from "@react-navigation/native";
import { useSelectedTheme } from "./useSelectTheme";

const DarkTheme: Theme = {
  ..._DarkTheme,
  dark: true,
  colors: {
    ..._DarkTheme.colors,
    background: "#111111",
    card: "#111111",
    text: "#E0E0E0",
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#2B2B2B",
  },
};
export function useThemeConfig() {
  const { selectedTheme } = useSelectedTheme();
  if (selectedTheme === "dark") return { theme: DarkTheme, selectedTheme };
  return { theme: LightTheme, selectedTheme };
}
