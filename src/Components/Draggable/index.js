import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Image, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';

import {PanGestureHandler} from 'react-native-gesture-handler';
import styles from './styles';

const resizerImageSource = require('./resize.png');
const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

const Draggable = ({
  children,
  translateX,
  boxHeight,
  boxWidth,
  onDragEnd,
  boundary,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const height = useSharedValue(boxHeight);
  const width = useSharedValue(boxWidth);
  const limitationHeight = boundary?.height;
  const limitationWidth = boundary?.width;
  const minHeight = boxHeight / 2,
    minWidth = boxWidth / 2;

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      runOnJS(setDragActive)(true);
      context.x = x.value;
      context.y = y.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.x;
      y.value = event.translationY + context.y;
    },
    onEnd: event => {
      x.value = withTiming(0, {}, () => {
        runOnJS(setDragActive)(false);
      });
      runOnJS(onDragEnd)({
        x: event?.absoluteX,
        y: event?.absoluteY,
        height: height.value,
        width: width.value,
      });
      y.value = withTiming(0);
      height.value = withTiming(boxHeight);
      width.value = withTiming(boxWidth);
    },
  });

  const resizeHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.boxWidth = width.value;
      context.boxHeight = height.value;
      context.offsetX = x.value;
      context.offsetY = y.value;
    },
    onActive: (event, context) => {
      width.value = clamp(
        context.boxWidth + event.translationX,
        minWidth,
        limitationWidth - x.value,
      );
      height.value = clamp(
        context.boxHeight + event.translationY,
        minHeight,
        limitationHeight - y.value,
      );
    },
    onFinish: () => {
      'worklet';
      // runOnJS(onResizeEnd)({
      //   x: boxX.value,
      //   y: boxY.value,
      //   height: boxHeight.value,
      //   width: boxWidth.value,
      // });
    },
  });

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: dragActive
            ? translateX.value + x.value
            : translateX.value - x.value,
        },
        {
          translateY: y.value,
        },
      ],
      height: height.value,
      width: width.value,
    };
  }, [x, y, height, width, translateX, dragActive]);

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          styles.containerStyle,
          panStyle,
          {
            zIndex: dragActive ? 1 : 0,
          },
        ]}>
        <PanGestureHandler onGestureEvent={resizeHandler}>
          <Animated.View style={styles.resizeBoxStyle}>
            <Image
              source={resizerImageSource}
              style={styles.imageStyle}
              resizeMode={'contain'}
            />
          </Animated.View>
        </PanGestureHandler>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Draggable;
