import { cssInterop } from "nativewind";
import { ComponentType, createElement, forwardRef } from "react";
import type { TextProps } from "react-native";
interface RTCTextProps
  extends Omit<
    TextProps,
    "onPress" | "onPressIn" | "onPressOut" | "onLongPress" | "pressRetentionOffset"
  > {}

const RTCText = forwardRef((props, ref) => {
  return createElement("RCTText", { ...props, ref });
}) as ComponentType<RTCTextProps>;
RTCText.displayName = "RCTText";
cssInterop(RTCText, {
  className: {
    target: "style"
  }
});

export default RTCText;
