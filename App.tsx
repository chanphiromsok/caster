import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Splash from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import AppNavigation from "./src/AppNavigation";
import { enableScreens } from "react-native-screens";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
enableScreens(true);
Splash.preventAutoHideAsync();
const queryClient = new QueryClient();
const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <QueryClientProvider client={queryClient}>
          <AppNavigation />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
