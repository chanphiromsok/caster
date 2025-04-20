import { useColorScheme } from "nativewind";
import React, { useMemo } from "react";
import { useColorScheme as useRNCS } from "react-native";
import { useMMKVString } from "react-native-mmkv";
import { mmkvStorage } from "../../persist/Mmkv.native";
const SELECTED_THEME = "SELECTED_THEME";
export type ColorSchemeType = "light" | "dark" | "system";
/**
 * this hooks should only be used while selecting the theme
 * This hooks will return the selected theme which is stored in MMKV
 * selectedTheme should be one of the following values 'light', 'dark' or 'system'
 * don't use this hooks if you want to use it to style your component based on the theme use useColorScheme from nativewind instead
 *
 */
export const useSelectedTheme = () => {
  const { setColorScheme } = useColorScheme();
  const [theme, _setTheme] = useMMKVString(SELECTED_THEME, mmkvStorage);
  const _color = useRNCS();
  const setSelectedTheme = React.useCallback(
    (t: ColorSchemeType) => {
      setColorScheme(t);
      _setTheme(t);
    },
    [setColorScheme, _setTheme]
  );
  const selectedTheme = useMemo(
    () => (theme === "system" ? _color : theme || _color),
    [theme, _color]
  ) as "light" | "dark";
  console.log("SWITCH [THEME]", selectedTheme);
  return { selectedTheme, setSelectedTheme, localStorageTheme: theme } as const;
};
