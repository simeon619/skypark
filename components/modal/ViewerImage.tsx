import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Gallery from "react-native-awesome-gallery";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TextRegular } from "../StyledText";

interface Props {
  images: { uri: string }[];
  initialIndex?: number;
  onClose: () => void;
}

export const ImageViewer = ({ images, initialIndex = 0, onClose }: Props) => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [index, setIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const { bottom } = useSafeAreaInsets();
  let endAncestor;
  let endNode;
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Gallery
        data={images}
        initialIndex={initialIndex}
        keyExtractor={(uri, i) => uri.uri}
        onIndexChange={(index) => setIndex(index)}
        renderItem={({ item, setImageDimensions }) => (
          <Image
            source={item.uri}
            contentFit="contain"
            style={StyleSheet.absoluteFillObject}
            onLoad={({ source: { width, height } }) =>
              setImageDimensions({
                width,
                height,
              })
            }
          />
        )}
        onSwipeToClose={onClose}
        numToRender={1}
        doubleTapInterval={250}
        pinchEnabled={true}
        onTap={() => setInfoVisible((v) => !v)}
      />
      {infoVisible && (
        <Animated.View
          entering={mounted ? FadeInDown.duration(0) : undefined}
          exiting={FadeOutDown.duration(0)}
          style={{
            paddingBottom: bottom + 8,
            position: "absolute",
            bottom: 0,
            zIndex: 10,
            width: "100%",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            paddingHorizontal: 6,
            paddingTop: 6,
          }}
        >
          <TextRegular style={{ color: "#ffe" }}>
            {images[index]?.uri}
          </TextRegular>
        </Animated.View>
      )}
    </View>
  );
};
