import { createIconSet } from "@react-native-vector-icons/common";
import MaterialSymbolsGlyphJson from "./glyphmaps/material-symbols.json";
const MsiIcons = createIconSet(
  MaterialSymbolsGlyphJson,
  "material-symbols", //postScriptName
  "material-symbols" // fontFileName,
);
/**
 * use for none reflect change with dark mode for static color because cssInterop
 */
export default MsiIcons;
