import { Image } from "expo-image";
import React from "react";
import { View, useColorScheme, useWindowDimensions } from "react-native";
import { formatPostDate } from "../../Utilis/date";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../Utilis/metrics";
import Colors from "../../constants/Colors";
import { MEDIUM_PIC_USER } from "../../constants/Value";
import { User } from "../../types/PostType";
import { TextLight, TextMedium, TextRegular } from "../StyledText";
import { TouchableOpacity } from "react-native-gesture-handler";

const PostHeader = ({ date, user }: { date: Date; user: User }) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: verticalScale(10),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          columnGap: horizontalScale(7),
        }}
      >
        <Image
          source={{ uri: user.avatar }}
          style={{
            width: horizontalScale(MEDIUM_PIC_USER),
            aspectRatio: 1,
            borderRadius: 90,
          }}
          transition={100}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              columnGap: horizontalScale(7),
            }}
          >
            <View style={{ flexShrink: 1 }}>
              <TextLight
                numberOfLines={1}
                style={{ fontSize: moderateScale(16) }}
              >
                {user.username}
              </TextLight>
            </View>
            <View style={{ flex: 0, alignSelf: "flex-start" }}>
              <TextLight
                numberOfLines={1}
                style={{
                  color: Colors[colorScheme ?? "light"].greyDark,
                  fontSize: moderateScale(15),
                  paddingTop: horizontalScale(1),
                }}
              >
                Publiez
              </TextLight>
            </View>
          </View>
          <TextRegular
            style={{
              color: Colors[colorScheme ?? "light"].greyDark,
              fontSize: moderateScale(14),
            }}
          >
            {formatPostDate(date)}
          </TextRegular>
        </View>
      </View>
      <TouchableOpacity style={{ marginLeft: horizontalScale(5) }}>
        <Image
          source={require("../../assets/images/telepĥone.png")}
          style={{ width: moderateScale(35), aspectRatio: 1 }}
          transition={100}
        />
      </TouchableOpacity>
    </View>
  );
};
export default PostHeader;
