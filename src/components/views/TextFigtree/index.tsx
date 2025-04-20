import type { ClassValue } from "clsx";
import { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { cn } from "../../../utils/cn";
import RTCText from "../RTCText";

type Props = {
  children: ReactNode;
  className?: ClassValue;
} & TextProps;
const defaultClass: ClassValue = "text-typography font-regular";
const TextFigtree = ({ children, className, ...props }: Props) => {
  if (children !== "string") {
    return (
      <Text className={cn(defaultClass, className)} {...props}>
        {children}
      </Text>
    );
  }
  return (
    <RTCText className={cn(defaultClass, className)} {...props}>
      {children}
    </RTCText>
  );
};

export default TextFigtree;
