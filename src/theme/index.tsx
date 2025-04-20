import { PropsWithChildren } from "react";
import Stack from "../components/views/Stack";
import { themesVars } from "./themeVars";

export const Theme = ({
  children,
  theme: selectedTheme,
}: PropsWithChildren<{ theme: "dark" | "light" | "system" }>) => {
  return (
    <Stack
      className="flex-1"
      style={themesVars[selectedTheme as "dark" | "light"]}
    >
      {children}
    </Stack>
  );
};
