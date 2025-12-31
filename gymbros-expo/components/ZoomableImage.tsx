import React from 'react';
import { StyleSheet, Dimensions, Image as RNImage } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ZoomableImageProps {
  source: { uri: string };
  width: number;
  height: number;
  children?: React.ReactNode;
}

export default function ZoomableImage({ source, width, height, children }: ZoomableImageProps) {
  // Shared values for gestures
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  // Pinch gesture for zooming
  const pinchGesture = Gesture.Pinch()
    .onStart((e) => {
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    })
    .onUpdate((e) => {
      // Clamp scale between 1x and 4x
      const newScale = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(newScale, 1), 4);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      // If scale is back to 1, reset translation
      if (scale.value <= 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedScale.value = 1;
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      }
    });

  // Double-tap gesture to toggle zoom
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((e) => {
      if (scale.value > 1) {
        // Zoom out
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedScale.value = 1;
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        // Zoom in to 2.5x at tap location
        scale.value = withSpring(2.5);
        savedScale.value = 2.5;
        // Center on tap point
        const centerX = width / 2;
        const centerY = height / 2;
        translateX.value = withSpring((centerX - e.x) * 1.5);
        translateY.value = withSpring((centerY - e.y) * 1.5);
        savedTranslateX.value = (centerX - e.x) * 1.5;
        savedTranslateY.value = (centerY - e.y) * 1.5;
      }
    });

  // Pan gesture for moving the zoomed image
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = savedTranslateX.value + e.translationX;
        translateY.value = savedTranslateY.value + e.translationY;
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    Gesture.Race(doubleTapGesture, panGesture)
  );

  // Animated style for the image
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[{ width, height, overflow: 'hidden' }, animatedStyle]}>
        <Animated.Image
          source={source}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
