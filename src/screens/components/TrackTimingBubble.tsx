import { atom, useAtom } from "jotai";
import React, { forwardRef, useImperativeHandle } from "react";
import { ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import TextFigtree from "../../components/views/TextFigtree";
import { formatTime } from "../../utils/formatTime";
import { tabularFontVariant } from "../../utils/tabularFontVariant";

const timingAtom = atom(0);
interface TrackTimingBubbleProps {
  totalSeconds: number;
  animatedStyle: ViewStyle;
}
export interface TrackTimingBubbleRef {
  onChange: (value: number) => void;
}
const TrackTimingBubble = (
  { totalSeconds, animatedStyle }: TrackTimingBubbleProps,
  ref: React.ForwardedRef<TrackTimingBubbleRef>
) => {
  const [time, setTime] = useAtom(timingAtom);
  useImperativeHandle(ref, () => ({
    onChange: (value: number) => {
      setTime(value);
    },
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="bg-transparent rounded-full px-2 absolute bottom-safe-or-10 self-center"
    >
      <TextFigtree
        style={tabularFontVariant}
        className="text-white text-4xl font-bold"
      >
        {formatTime(time)}/{formatTime(totalSeconds)}
      </TextFigtree>
    </Animated.View>
  );
};

export default forwardRef<TrackTimingBubbleRef, TrackTimingBubbleProps>(
  TrackTimingBubble
);
