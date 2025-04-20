import type { PropsWithChildren } from "react";
import { ViewProps } from "react-native";
import { cn } from "../../../utils/cn";
import { RTCView } from "../RTCView";

type StackProps = PropsWithChildren<
  {
    className?: string;
    flex?: boolean;
    center?: "both" | "vertical" | "horizontal";
  } & ViewProps
>;
const Stack = ({ children, className, flex, center, ...props }: StackProps) => {
  return (
    <RTCView
      className={cn(
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

export default Stack;
