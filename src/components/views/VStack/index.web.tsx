import { PropsWithChildren } from "react";
import { View } from "react-native";
import { cn } from "../../../utils/cn";


type VStackProps = PropsWithChildren<{
  className?: string;
  flex?: boolean;
  center?: "both" | "vertical" | "horizontal";
}>;
const VStack = ({ children, className, flex, center, ...props }: VStackProps) => {
  return (
    <View
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
    </View>
  );
};

export default VStack;
