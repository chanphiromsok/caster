import { MutableRefObject, useCallback, useRef } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import TrackPlayer, {
    useActiveTrack,
    useIsPlaying,
} from "react-native-track-player";
import MaterialSymbolIcons from "../../components/icons/MaterialSymbolIcons";
import Marquee from "../../components/Marquee";
import HStack from "../../components/views/HStack";
import TextFigtree from "../../components/views/TextFigtree";
import VStack from "../../components/views/VStack";
import TrackScrubber, { TrackScrubberRef } from "./TrackScrubber";
import TrackTimingBubble, { TrackTimingBubbleRef } from "./TrackTimingBubble";

interface TrackControlProps {
  goTo: (to: "next" | "prev") => void;
}
const TrackControl = ({ goTo }: TrackControlProps) => {
  const isScrubbing = useSharedValue(false);
  const track = useActiveTrack();
  const { playing } = useIsPlaying();
  const scrubberRef = useRef() as MutableRefObject<TrackScrubberRef>;
  const onSkipPrev = () => {
    goTo("prev");
    TrackPlayer.skipToPrevious();
  };
  function onSkipNext() {
    goTo("next");
    TrackPlayer.skipToNext();
  }
  const timingRef = useRef() as MutableRefObject<TrackTimingBubbleRef>;
  const bubbleStyle = useAnimatedStyle(() => {
    return {
      opacity: isScrubbing.get() ? 1 : withTiming(0, { duration: 300 }),
      zIndex: -1,
    };
  }, [isScrubbing]);
  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: isScrubbing.get()
        ? 0
        : withTiming(1, { duration: 300 }),
    };
  }, [isScrubbing]);
  const onValueChange = useCallback((value: number) => {
    timingRef.current.onChange(Math.round(value));
  }, []);
  if (!track) {
    return <ActivityIndicator />;
  }

  return (
    <VStack className="mt-4 mx-4">
      <Animated.View style={overlayStyle}>
        <Marquee reverse>
          <TextFigtree className={"font-bold text-xl mt-1"}>
            {track?.title}
          </TextFigtree>
        </Marquee>
        <TextFigtree className={"text-lg mb-4  font-semibold"}>
          {track?.artist}
        </TextFigtree>
      </Animated.View>
      <VStack>
        <TrackTimingBubble
          ref={timingRef}
          totalSeconds={track?.duration || 0}
          animatedStyle={bubbleStyle}
        />
        <TrackScrubber
          onValueChange={onValueChange}
          isScrubbing={isScrubbing}
          duration={track?.duration!}
          ref={scrubberRef}
        />
      </VStack>
      <HStack center="both">
        <TouchableOpacity onPress={onSkipPrev}>
          <MaterialSymbolIcons
            className="left-[9px]"
            name="arrow_back_ios_400"
            size={30}
            color={"white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
        >
          <MaterialSymbolIcons
            className="mx-8 rounded-full"
            name={playing ? "pause_circle" : "play_arrow"}
            size={48}
            color={"white"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkipNext}>
          <MaterialSymbolIcons
            name="arrow_forward_ios_400"
            size={30}
            color={"white"}
          />
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};

export default TrackControl;
