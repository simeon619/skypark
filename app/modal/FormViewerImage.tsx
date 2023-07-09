import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "../../Utilis/metrics";
import { ImageViewer } from "../../components/modal/ViewerImage";
import { useViewerParamImages } from "../../store/preference";

const FormViewerImage = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const { data } = useViewerParamImages();

  return (
    <View style={{ position: "relative", flex: 1 }}>
      {/* <StatusBar style="light" /> */}
      <TouchableOpacity
        accessibilityLabel="Back"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={{
          top: top + 10,
          position: "absolute",
          left: 5,
          padding: moderateScale(15),
          zIndex: 12,
        }}
      >
        <AntDesign name="close" size={20} color="white" />
      </TouchableOpacity>
      {data.images.length > 0 && (
        <ImageViewer
          images={data.images}
          onClose={() => router.back()}
          initialIndex={data.actualIndex || 0}
        />
      )}
    </View>
  );
};

export default React.memo(FormViewerImage);
