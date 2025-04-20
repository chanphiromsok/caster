import { useMemo } from "react";
import { type ViewStyle } from "react-native";
import { useThemeVariable } from "./useThemeVariable";

const useBottomSheetTheme = () => {
  const cardInvert = useThemeVariable("card-reverse");
  const card = useThemeVariable("card");
  const bgStyle = useMemo<ViewStyle>(() => ({ backgroundColor: card }), [card]);
  const indicatorStyle = useMemo<ViewStyle>(() => ({ backgroundColor: cardInvert }), [cardInvert]);
  return {
    bgStyle,
    indicatorStyle
  };
};

export default useBottomSheetTheme;
