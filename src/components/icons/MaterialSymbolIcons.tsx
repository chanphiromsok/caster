import { cssInterop } from "nativewind";
import { ComponentProps } from "react";
import MsiIcons from "./MsiIcon";
const MaterialSymbolIcons = MsiIcons;
export type MaterialSymbolIconsName = ComponentProps<typeof MaterialSymbolIcons>["name"];
cssInterop(MaterialSymbolIcons, {
  className: {
    target: "style"
  }
});
export default MaterialSymbolIcons;
