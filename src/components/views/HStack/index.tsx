import type { ClassValue } from "clsx";
import { PropsWithChildren } from "react";
import { ViewProps } from "react-native";

import { cn } from "../../../utils/cn";
import { RTCView } from "../RTCView";

type HStackProps = PropsWithChildren<
  {
    className?: ClassValue;
    flex?: boolean;
    center?: "both" | "vertical" | "horizontal";
  } & ViewProps
>;
const HStack = ({ children, className, flex, center, ...props }: HStackProps) => {
  return (
    <RTCView
      className={cn(
        "flex-row",
        flex && "flex-1",
        center === "vertical" && "items-center", // Corrected to only vertically center
        center === "horizontal" && "justify-center", // Centers horizontally
        center === "both" && "justify-center items-center", // Centers both horizontally and vertically
        className
      )}
      {...props}>
      {children}
    </RTCView>
  );
};

export default HStack;
