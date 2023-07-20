import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import React, { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { horizontalScale, moderateScale } from '../../Utilis/metrics';

const FormViewerImage = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const [aspectRatio, setAspectRatio] = useState(0);
  const { height, width } = Dimensions.get('window');
  const handleImageLoad = (event: any) => {
    console.log('🚀 ~ file: FormViewerImage.tsx:17 ~ handleImageLoad ~ event:', event.nativeEvent);
    const { width, height } = event.nativeEvent.source;
    const imageAspectRatio = width / (height || 1);
    setAspectRatio(imageAspectRatio);
  };

  const params = useLocalSearchParams();
  const uri = params.uri as string;
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const state = useSharedValue<number>(State.UNDETERMINED);
  const scale = useSharedValue(1);
  // const ImageAnimated = Animated.createAnimatedComponent(Image);
  const pinchGesture = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: (event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
      state.value = State.ACTIVE;
    },
    onEnd: () => {
      scale.value = withTiming(1);
      state.value = State.END;
    },
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  return (
    <Animated.View style={{ justifyContent: 'center', flex: 1, backgroundColor: '#000e' }}>
      {/* <StatusBar style="light" /> */}
      <TouchableOpacity
        accessibilityLabel="Back"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={{
          top: top + 10,
          position: 'absolute',
          right: horizontalScale(10),
          padding: moderateScale(5),
          backgroundColor: '#0005',
          borderRadius: 50,
          zIndex: 12,
        }}
      >
        <AntDesign name="close" size={20} color="white" />
      </TouchableOpacity>
      <PinchGestureHandler onGestureEvent={pinchGesture}>
        <Animated.View>
          <Animated.Image
            source={{ uri }}
            style={[
              {
                // width: '100%',
                // maxHeight: height,
                aspectRatio: aspectRatio !== null ? aspectRatio : 2 / 3,
              },
              rStyle,
            ]}
            onLoad={handleImageLoad}
            progressiveRenderingEnabled={true}
          />
          <Animated.View style={[focalPointStyle]} />
        </Animated.View>
      </PinchGestureHandler>
    </Animated.View>
  );
};

export default React.memo(FormViewerImage);
