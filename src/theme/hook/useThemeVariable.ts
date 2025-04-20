import { useUnstableNativeVariable } from "nativewind";
import { TrimmedThemeKeys } from "../ThemeType";

export function useThemeVariable<T extends TrimmedThemeKeys>(variable: T) {
  return useUnstableNativeVariable(`--${variable}`) as string;
}
