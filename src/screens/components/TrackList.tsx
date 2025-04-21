import {
  LegendList,
  LegendListRef,
  LegendListRenderItemProps,
  ViewToken,
} from "@legendapp/list";
import { useQuery } from "@tanstack/react-query";
import {
  forwardRef,
  MutableRefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import TrackPlayer, { type Track } from "react-native-track-player";
import device from "../../platform/device";
import TrackCardPlayer from "./TrackCardPlayer";

export interface TrackListRef {
  scrollTo: (to: "prev" | "next") => void;
}
const TrackList = (_: any, ref: any) => {
  const { data } = useQuery({
    queryKey: ["queryTrack"],
    queryFn: () => {
      return TrackPlayer.getQueue();
    },
  });
  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<Track>) => {
      return <TrackCardPlayer {...item} />;
    },
    []
  );
  const listRef = useRef(null) as MutableRefObject<LegendListRef | null>;
  const [visibleIndex, setVisibleIndex] = useState(0);
  useImperativeHandle(
    ref,
    () => ({
      scrollTo: (to: "prev" | "next") => {
        listRef.current?.scrollToIndex({
          index: visibleIndex + (to === "next" ? 1 : -1),
        });
      },
    }),
    [visibleIndex]
  );
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
      pagingEnabled
      renderItem={renderItem}
      recycleItems
      estimatedItemSize={device.width}
      drawDistance={device.width}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

export default forwardRef<TrackListRef, any>(TrackList);
