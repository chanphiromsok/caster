import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigationContainerTheme from "./navigation/NavigationContainerTheme";
import TrackPlayerScreen from "./screens/TrackPlayerScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainerTheme>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="track" component={TrackPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainerTheme>
  );
};

export default AppNavigation;
