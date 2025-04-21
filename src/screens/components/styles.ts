import { StyleSheet } from "react-native";
import device from "../../platform/device";

export const styles = StyleSheet.create({
  container: {
    width: device.width,
    height: device.width,
  },
  artwork: {
    width: device.width - 32,
    height: device.width - 32,
    alignSelf: "center",
    borderRadius: 10,
  },
});
