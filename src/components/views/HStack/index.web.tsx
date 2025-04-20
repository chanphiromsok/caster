import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { cn } from "../../../utils/cn";

type HStackProps = PropsWithChildren<{
  className?: string;
  flex?: boolean;
  center?: "both" | "vertical" | "horizontal";
}>;
const HStack = ({
  children,
  className,
  flex,
  center,
  ...props
}: HStackProps) => {
  return (
    <View
      className={cn(
        "flex-row",
        flex && "flex-1",
        center === "vertical" && "items-center", // Corrected to only vertically center
        center === "horizontal" && "justify-center", // Centers horizontally
        center === "both" && "justify-center items-center", // Centers both horizontally and vertically
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};

export default HStack;
