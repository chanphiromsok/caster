import { FlashList, FlashListProps } from "@shopify/flash-list";
import { RefObject } from "react";
import { NativeScrollEvent, PointProp } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { isAndroid } from "../../platform/detection";
const FList = Animated.createAnimatedComponent(FlashList);
export type AnimatedFlashListRef<T = any> = RefObject<FlashList<T> | null>;
export type AnimatedFlashListProp<ItemT = any> = Omit<
  FlashListProps<ItemT>,
  | "onMomentumScrollBegin" // Use ScrollContext instead.
  | "onMomentumScrollEnd" // Use ScrollContext instead.
  | "onScroll" // Use ScrollContext instead.
  | "onScrollBeginDrag" // Use ScrollContext instead.
  | "onScrollEndDrag" // Use ScrollContext instead.
  | "refreshControl" // Pass refreshing and/or onRefresh instead.
  | "contentOffset" // Pass headerOffset instead.
  | "progressViewOffset" // Can't be an animated value
> & {
  onScrolledDownChange?: (isScrolledDown: boolean) => void;
  headerOffset?: number;
  refreshing?: boolean;
  onRefresh?: () => void;
  onItemSeen?: (item: ItemT) => void;
  desktopFixedHeight?: number | boolean;
  // Web only prop to contain the scroll to the container rather than the window
  disableFullWindowScroll?: boolean;
  sideBorders?: boolean;
  progressViewOffset?: number;
  /**
   * `react 19` pass ref as props
   */
  ref: AnimatedFlashListRef;
  onScrollWorklet: (e: NativeScrollEvent) => void;
};

const AnimatedFlashList = ({
  onScrolledDownChange,
  refreshing,
  onRefresh,
  onItemSeen,
  headerOffset = 0,
  progressViewOffset,
  automaticallyAdjustsScrollIndicatorInsets = false,
  onScrollWorklet,
  ref,
  ...rest
}: AnimatedFlashListProp) => {
  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: onScrollWorklet,
    },
    []
  );
  let contentOffset: PointProp | undefined;
  if (headerOffset !== null) {
    rest.contentContainerStyle = {
      paddingTop: headerOffset,
    };
    contentOffset = { x: 0, y: headerOffset * -1 };
  }
  

  return (
    <FList
      showsVerticalScrollIndicator={!isAndroid} // overridable
      automaticallyAdjustsScrollIndicatorInsets={
        automaticallyAdjustsScrollIndicatorInsets
      }
      scrollIndicatorInsets={{ top: headerOffset }}
      contentOffset={contentOffset}
      onScroll={scrollHandler}
      contentContainerStyle={rest.contentContainerStyle}
      {...rest}
      ref={ref}
    />
  );
};

export default AnimatedFlashList;
