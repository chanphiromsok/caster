import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { cn } from "../../../utils/cn";


type StackProps = PropsWithChildren<{
  className?: string;
  flex?: boolean;
  center?: "both" | "vertical" | "horizontal";
}>;
const Stack = ({ children, className, flex, center, ...props }: StackProps) => {
  return (
    <View
      className={cn(
        flex && "flex-1",
        center === "vertical" && "justify-center",
        center === "horizontal" && "items-center",
        center === "both" && "justify-center items-center",
        className
      )}
      {...props}>
      {children}
    </View>
  );
};

export default Stack;
