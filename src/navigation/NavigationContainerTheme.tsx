import { NavigationContainer } from "@react-navigation/native";
import * as Splash from "expo-splash-screen";
import { PropsWithChildren, useCallback } from "react";
import { Theme } from "../theme";
import { useThemeConfig } from "../theme/hook/useThemeConfig";

const NavigationContainerTheme = ({ children }: PropsWithChildren) => {
  const { selectedTheme, theme } = useThemeConfig();
  const onReady = useCallback(async () => {
    await Splash.hideAsync();
  }, []);
  return (
    <Theme theme={selectedTheme}>
      <NavigationContainer onReady={onReady} theme={theme}>
        {children}
      </NavigationContainer>
    </Theme>
  );
};

export default NavigationContainerTheme;
