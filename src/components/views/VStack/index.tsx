import { PropsWithChildren } from "react";

import type { ClassValue } from "clsx";
import { ViewProps } from "react-native";
import { cn } from "../../../utils/cn";
import { RTCView } from "../RTCView";

type VStackProps = PropsWithChildren<
  {
    className?: ClassValue;
    flex?: boolean;
    center?: "both" | "vertical" | "horizontal";
  } & ViewProps
>;
const VStack = ({ children, className, flex, center, ...props }: VStackProps) => {
  return (
    <RTCView
      className={cn(
        "flex-col",
        flex && "flex-1",
        center === "vertical" && "justify-center",
        center === "horizontal" && "items-center",
        center === "both" && "justify-center items-center",
        className
      )}
      {...props}>
      {children}
    </RTCView>
  );
};

export default VStack;
