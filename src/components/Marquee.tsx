import React, { PropsWithChildren } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";
import Stack from "./views/Stack";

const MeasureElement = ({
  onLayout,
  children,
}: PropsWithChildren<{
  onLayout: (width: number) => void;
}>) => (
  <Animated.ScrollView
    horizontal
    style={marqueeStyles.hidden}
    pointerEvents="box-none"
  >
    <Stack onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
      {children}
    </Stack>
  </Animated.ScrollView>
);

const TranslatedElement = ({
  index,
  children,
  offset,
  childrenWidth,
}: PropsWithChildren<{
  index: number;
  offset: SharedValue<number>;
  childrenWidth: number;
}>) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: (index - 1) * childrenWidth,
      transform: [
        {
          translateX: -offset.value,
        },
      ],
    };
  });
  return (
    <Animated.View style={[marqueeStyles.animatedStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const getIndicesArray = (length: number) => Array.from({ length }, (_, i) => i);

const Cloner = ({ count, renderChild }: any) => (
  <>{getIndicesArray(count).map(renderChild)}</>
);

const ChildrenScroller = ({
  duration,
  childrenWidth,
  parentWidth,
  reverse,
  children,
}: PropsWithChildren<{
  duration: number;
  childrenWidth: number;
  parentWidth: number;
  reverse: boolean;
}>) => {
  const offset = useSharedValue(0);
  const coeff = useSharedValue(reverse ? 1 : -1);

  React.useEffect(() => {
    coeff.value = reverse ? 1 : -1;
  }, [reverse]);

  useFrameCallback((i) => {
    // prettier-ignore
    offset.value += (coeff.value * ((i.timeSincePreviousFrame ?? 1) * childrenWidth)) / duration;
    offset.value = offset.value % childrenWidth;
  }, true);

  const count = Math.round(parentWidth / childrenWidth) + 2;
  const renderChild = (index: number) => (
    <TranslatedElement
      key={`clone-${index}`}
      index={index}
      offset={offset}
      childrenWidth={childrenWidth}
    >
      {children}
    </TranslatedElement>
  );

  return <Cloner count={count} renderChild={renderChild} />;
};

const Marquee = ({
  duration = 4000,
  reverse = false,
  children,
  style,
}: PropsWithChildren<{
  style?: ViewStyle;
  duration?: number;
  reverse: boolean;
}>) => {
  const [parentWidth, setParentWidth] = React.useState(0);
  const [childrenWidth, setChildrenWidth] = React.useState(0);

  return (
    <Animated.View
      style={style}
      onLayout={(ev) => {
        setParentWidth(ev.nativeEvent.layout.width);
      }}
      pointerEvents="box-none"
    >
      <Stack style={marqueeStyles.row} pointerEvents="box-none">
        <MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>
        {childrenWidth > 0 && parentWidth > 0 && (
          <ChildrenScroller
            duration={duration}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            reverse={reverse}
          >
            {children}
          </ChildrenScroller>
        )}
      </Stack>
    </Animated.View>
  );
};

const marqueeStyles = StyleSheet.create({
  hidden: { opacity: 0, zIndex: -1 },
  row: { flexDirection: "row", overflow: "hidden" },
  animatedStyle: {
    position: "absolute",
  },
});

export default Marquee;
