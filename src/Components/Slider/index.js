import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Image, View} from 'react-native';
import {vh, vw} from '../../utils/units';

import Draggable from '../Draggable';
import {PanGestureHandler} from 'react-native-gesture-handler';
import React from 'react';
import styles from './styles';

const Slider = ({items, imageHeight, imageWidth, onDragEnd, boundary}) => {
  const MAX_TRANSLATE = -(imageWidth + vh * 1) * (items?.length - 3.75);
  const translateX = useSharedValue(0);
  const clampedTranslateX = useDerivedValue(() =>
    Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE),
  );

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
  });

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: clampedTranslateX.value,
        },
      ],
    };
  }, [translateX]);

  return (
    <View>
      <View style={[styles.listContainer, {width: items.length * imageWidth}]}>
        {items.map((item, index) => (
          <Draggable
            key={index}
            boxHeight={imageHeight}
            boxWidth={imageWidth}
            boundary={boundary}
            onDragEnd={boxPosition => onDragEnd(item, boxPosition)}
            translateX={clampedTranslateX}>
            <View style={styles.imageContainer}>
              <Image source={{uri: item}} style={styles.imageStyle} />
            </View>
          </Draggable>
        ))}
      </View>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[
            styles.slider,
            {
              width: items.length * imageWidth,
            },
            {...panStyle},
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

export default Slider;
