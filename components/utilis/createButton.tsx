import React from "react";
import { TouchableOpacity, ViewStyle, useColorScheme } from "react-native";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../Utilis/metrics";
import Colors from "../../constants/Colors";
import { TextRegular } from "../StyledText";

const createButton = ({
  value,
  onPress,
  style,
}: {
  value: string;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: "center",
        backgroundColor: Colors[colorScheme ?? "light"].primaryColourLight,
        paddingVertical: verticalScale(5),
        paddingHorizontal: horizontalScale(30),
        borderRadius: 20,
        marginTop: verticalScale(25),
        ...style,
      }}
    >
      <TextRegular
        style={{
          fontSize: moderateScale(18),
          color: Colors[colorScheme ?? "light"].overLay,
        }}
      >
        {value}
      </TextRegular>
    </TouchableOpacity>
  );
};

export default createButton;
