import { useThemeVariable } from "./useThemeVariable";

export type GradientColors = "primary" | "secondary" | "accent";
const useGradientColors = (gradient: GradientColors, reverse = false) => {
  const first = useThemeVariable("card");
  const second = useThemeVariable(
    gradient === "primary" ? "green-300" : gradient === "secondary" ? "blue-300" : "orange-300"
  );
  return (reverse ? [second, first] : [first, second]) as readonly [string, string, ...string[]];
};

export default useGradientColors;
