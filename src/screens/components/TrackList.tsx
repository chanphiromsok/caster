import {
  LegendList,
  LegendListRef,
  LegendListRenderItemProps,
  ViewToken,
} from "@legendapp/list";
import { useQuery } from "@tanstack/react-query";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TrackPlayer, { Event, type Track } from "react-native-track-player";
import device from "../../platform/device";
import TrackCardPlayer from "./TrackCardPlayer";
const TrackList = () => {
  const { data } = useQuery({
    queryKey: ["queryTrack"],
    queryFn: () => {
      return TrackPlayer.getQueue();
    },
  });
  const [visibleIndex, setVisibleIndex] = useState(0);
  const renderItem = useCallback(
    ({ item, extraData, index }: LegendListRenderItemProps<Track>) => {
      const onSkipNext = () => listRef.current.scrollToIndex({ index: index+1 });
      const onSkipPrev = () => {
        if (index !== 0) {
          listRef.current.scrollToIndex({ index: index - 1 });
        }
      };

      return (
        <TrackCardPlayer
          onSkipPrev={onSkipPrev}
          onSkipNext={onSkipNext}
          visibleIndex={extraData}
          index={index}
          {...item}
        />
      );
    },
    []
  );
  const listRef = useRef(null) as MutableRefObject<LegendListRef | null>;

  const [onViewableItemsChanged, viewabilityConfig] = useMemo(() => {
    return [
      (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
        for (const item of info.changed) {
          if (item.isViewable) {
            setVisibleIndex(item.index);
          }
        }
      },
      {
        itemVisiblePercentThreshold: 100,
        minimumViewTime: 0.5e3,
      },
    ];
  }, []);
  return (
    <LegendList
      data={data || []}
      ref={listRef}
      horizontal
      extraData={visibleIndex}
      pagingEnabled
      renderItem={renderItem}
      recycleItems
      estimatedItemSize={device.width}
      drawDistance={device.width}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default TrackList;
