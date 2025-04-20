import { cssInterop } from "nativewind";
import { type ComponentType, createElement, forwardRef } from "react";
import type { ViewProps } from "react-native";

const RTCView = forwardRef((props, ref) => {
  return createElement("RCTView", { ...props, ref });
}) as ComponentType<ViewProps>;
RTCView.displayName = "RCTView";
cssInterop(RTCView, {
  className: {
    target: "style"
  }
});

export { RTCView };
