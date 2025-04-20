import { Text, TextProps } from "react-native";
import { cn } from "../../../utils/cn";


type Props = {
  children: string;
  className?: string;
} & TextProps;
const TextFigtree = ({ children, className, ...props }: Props) => {
  return (
    <Text className={cn("text-typography", className)} {...props}>
      {children}
    </Text>
  );
};

export default TextFigtree;
