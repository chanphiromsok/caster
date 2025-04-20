import type { ClassValue } from "clsx";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";

import { cn } from "../../utils/cn";
import TextFigtree from "../views/TextFigtree";
import VStack from "../views/VStack";

interface Props<T extends FieldValues> extends Omit<TextInputProps, "defaultValue"> {
  control: Control<T>; // Use Control<T> for type safety
  name: Path<T>; // Use Path<T> to restrict name to keys of T
  label?: string;
  isError: boolean;
  labelClassName?: ClassValue;
  disabled?: boolean; // Add disabled prop
}

const TextController = <T extends FieldValues>({
  control,
  label,
  name,
  isError,
  labelClassName,
  disabled,
  ...props
}: Props<T>) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <VStack
          className={cn(
            "border rounded-xl w-full border-divider pl-3 py-2",
            !!isError && "border-red"
          )}>
          <TextFigtree
            className={cn(
              "text-sm text-typography capitalize",
              labelClassName,
              isError && "text-red font-semibold"
            )}>
            {label || name}
          </TextFigtree>
          <TextInput
            className={cn("text-typography py-1 mt-1", "placeholder:text-sub-text")}
            {...props}
            keyboardType="default"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            editable={!disabled} // Map disabled to editable
          />
        </VStack>
      )}
      name={name}
      disabled={disabled}
    />
  );
};

export default TextController;
