import { Image } from "expo-image";
import {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, {
  Event,
  useIsPlaying,
  type Track,
} from "react-native-track-player";
import MaterialSymbolIcons from "../../components/icons/MaterialSymbolIcons";
import HStack from "../../components/views/HStack";
import Stack from "../../components/views/Stack";
import TextFigtree from "../../components/views/TextFigtree";
import VStack from "../../components/views/VStack";
import device from "../../platform/device";
import { formatTime } from "../../utils/formatTime";
import { useRecyclingState } from "@legendapp/list";
interface TrackCardPlayerProps extends Track {
  visibleIndex: number;
  index: number;
  onSkipPrev: () => void;
  onSkipNext: () => void;
}
const TrackCardPlayer = ({
  artist,
  artwork,
  duration,
  title,
  index,
  visibleIndex,
  onSkipNext,
  onSkipPrev,
}: TrackCardPlayerProps) => {
  const { playing } = useIsPlaying();
  const scrubberRef = useRef() as MutableRefObject<TrackScrubberRef>;
  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, (event) => {
      scrubberRef.current?.onUpdateProgress?.(Math.floor(event.position));
    });
  }, []);
  useEffect(() => {
    TrackPlayer.skip(index);
  }, [index]);
  useEffect(() => {
    if (visibleIndex !== index) {
      TrackPlayer.play();
    } else {
      TrackPlayer.stop();
    }
  }, [visibleIndex]);

  return (
    <VStack style={styles.container}>
      <Image source={{ uri: artwork }} style={styles.artwork} />
      <VStack className="mt-4 mx-4">
        <TextFigtree className={"font-bold text-xl mt-1"}>{title}</TextFigtree>
        <TextFigtree className={"mb-4"}>{artist}</TextFigtree>
        <TrackScrubber duration={duration!} ref={scrubberRef} />
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
    </VStack>
  );
};

export default TrackCardPlayer;
const styles = StyleSheet.create({
  container: {
    width: device.width,
    height: device.width,
  },
  artwork: {
    width: device.width - 32,
    height: device.width - 32,
    alignSelf: "center",
    borderRadius: 10,
  },
});

const renderNope = () => null;

interface TrackScrubberProps {
  duration: number;
}
interface TrackScrubberRef {
  onUpdateProgress: (value: number) => void;
}
const TrackScrubber = forwardRef<TrackScrubberRef, TrackScrubberProps>(
  (prop, ref) => {
    const maximumValue = useSharedValue(prop.duration);
    const minimumValue = useSharedValue(0);
    const progress = useSharedValue(0);
    const [second, setSecond] = useRecyclingState(() => 0);

    const onValueChange = useCallback((value: number) => {
      progress.value = Math.floor(value);
    }, []);
    useImperativeHandle(ref, () => {
      return {
        onUpdateProgress: (value) => {
          setSecond(value);
          progress.value = value;
        },
      };
    });
    return (
      <Stack>
        <Slider
          progress={progress}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          onValueChange={onValueChange}
          theme={{
            cacheTrackTintColor: "red",
            maximumTrackTintColor: "gray",
            minimumTrackTintColor: "white",
          }}
          renderBubble={renderNope}
          renderThumb={renderNope}
          panHitSlop={{ bottom: 20, top: 20, right: 10, left: 20 }}
          containerStyle={{ borderRadius: 10 }}
        />
        <HStack className="justify-between mt-2" center="vertical">
          <TextFigtree>{formatTime(second as number)}</TextFigtree>
          <TextFigtree>{formatTime(prop.duration || 0)}</TextFigtree>
        </HStack>
      </Stack>
    );
  }
);
