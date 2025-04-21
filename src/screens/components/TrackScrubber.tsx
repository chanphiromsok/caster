import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Slider } from "react-native-awesome-slider";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import TrackPlayer, { Event } from "react-native-track-player";
import HStack from "../../components/views/HStack";
import Stack from "../../components/views/Stack";
import TextFigtree from "../../components/views/TextFigtree";
import { useThemeVariable } from "../../theme/hook/useThemeVariable";
import { formatTime } from "../../utils/formatTime";

const renderNope = () => null;

interface TrackScrubberProps {
  duration: number;
  isScrubbing: SharedValue<boolean>;
  onValueChange: (value: number) => void;
}
export interface TrackScrubberRef {
  onUpdateProgress: (value: number) => void;
}
const TrackScrubber = forwardRef<TrackScrubberRef, TrackScrubberProps>(
  ({ duration, isScrubbing, onValueChange }, ref) => {
    const maximumValue = useSharedValue(duration);
    const minimumValue = useSharedValue(0);
    const progress = useSharedValue(0);
    const [second, setSecond] = useState(0);
    const onInnerValueChange = useCallback((value: number) => {
      const second = Math.floor(value);
      progress.value = second;
      onValueChange(second);
    }, []);
    useImperativeHandle(ref, () => {
      return {
        onUpdateProgress: (value) => {
          setSecond(value);
          progress.value = value;
        },
      };
    });
    useEffect(() => {
      const subscribe = TrackPlayer.addEventListener(
        Event.PlaybackProgressUpdated,
        (payload) => {
          if (isScrubbing.get() === true) {
            return;
          }
          const value = Math.floor(payload.position);
          setSecond(value);
          progress.value = value;
        }
      );
      return subscribe.remove;
    }, [isScrubbing]);
    const onSlidingComplete = useCallback((value: number) => {
      TrackPlayer.seekTo(Math.floor(value));
    }, []);
    const minimumTrackTintColor = useThemeVariable("card-reverse");
    return (
      <Stack>
        <Slider
          progress={progress}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          onValueChange={onInnerValueChange}
          isScrubbing={isScrubbing}
          onSlidingComplete={onSlidingComplete}
          theme={{
            maximumTrackTintColor: "gray",
            minimumTrackTintColor,
          }}
          renderBubble={renderNope}
          renderThumb={renderNope}
          panHitSlop={{ bottom: 20, top: 20, right: 10, left: 20 }}
          containerStyle={{ borderRadius: 10 }}
        />
        <HStack className="justify-between mt-2" center="vertical">
          <TextFigtree>{formatTime(second)}</TextFigtree>
          <TextFigtree>{formatTime(duration)}</TextFigtree>
        </HStack>
      </Stack>
    );
  }
);

export default TrackScrubber;
