import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toggle from "react-native-toggle-element";
import { icons } from "../../Utilis/data";
import {
  horizontalScale,
  moderateScale,
  shadow,
  verticalScale,
} from "../../Utilis/metrics";
import {
  TextMedium,
  TextSemiBold,
  TextThinItalic,
} from "../../components/StyledText";
import { ScrollView, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { LARGE_PIC_USER } from "../../constants/Value";
import useToggleStore, { stateApp } from "../../store/preference";

const Profile = () => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const [toggleValue, setToggleValue] = useState<boolean>(false);

  const iconActivity = [
    { url: require("../../assets/icon/reunion.png"), name: "reunion" },
    { url: require("../../assets/icon/exercer.png"), name: "exercer" },
    { url: require("../../assets/icon/monde.png"), name: "map" },
    { url: require("../../assets/icon/magasin.png"), name: "magasin" },
  ];

  const { primaryColour, primaryColourLight, name, toggleState } =
    useToggleStore((state) => state);

  const U = useToggleStore((state) => state);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <StatusBar backgroundColor={primaryColour} style={"light"} />
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/profileBanner.jpg")}
          style={{
            height: verticalScale(290),
            position: "relative",
            // overflow: "hidden",
          }}
        >
          <View
            style={{
              width: moderateScale(150),
              aspectRatio: 1,
              position: "absolute",
              // transform: [{ rotate: "80deg" }],
              top: -80,
              // left: -50,
              backgroundColor: "#FF6B8633",
              borderRadius: 100,
            }}
          />
          <View
            style={{
              width: moderateScale(150),
              aspectRatio: 1,
              position: "absolute",
              top: -70,
              left: -60,

              backgroundColor: "#B2E7DA33",
              borderRadius: 100,
            }}
          />
          <View
            style={{
              width: horizontalScale(194),
              ...shadow(10),
              position: "absolute",
              height: verticalScale(157),
              bottom: -157 / 3,
              borderRadius: moderateScale(20),
              left: horizontalScale(194) / 2,
              alignItems: "center",
              zIndex: 5,
            }}
          >
            <Image
              style={{
                width: moderateScale(LARGE_PIC_USER),
                aspectRatio: 1,
                borderRadius: LARGE_PIC_USER / 2,
                borderColor: primaryColourLight,
                borderWidth: 4,
                marginTop: LARGE_PIC_USER / 5,
              }}
              source="https://picsum.photos/seed/696/3000/2000"
              contentFit="cover"
              transition={1000}
            />
            <TextSemiBold>Messah</TextSemiBold>
            <TextThinItalic>Entrée 1 - Étage 8</TextThinItalic>
          </View>
          <View
            style={{
              width: horizontalScale(166),
              ...shadow(10),
              position: "absolute",
              height: verticalScale(107),
              bottom: -157 / 2.3,
              borderRadius: moderateScale(20),
              left: horizontalScale(166) / 1.5,
              alignItems: "center",
              zIndex: 1,
            }}
          ></View>
        </ImageBackground>
        <View
          style={{ marginTop: horizontalScale(166 / 2), alignItems: "center" }}
        >
          <Toggle
            value={toggleValue}
            onPress={() => toggleState()}
            leftComponent={<FontAwesome name="home" size={24} />}
            rightComponent={<FontAwesome name="building" size={24} />}
            trackBar={{
              activeBackgroundColor: primaryColour,
              inActiveBackgroundColor:
                stateApp["B"].primaryColour !== primaryColour
                  ? primaryColour
                  : stateApp["B"].primaryColour,
              width: horizontalScale(110),
              height: verticalScale(48),
            }}
            thumbButton={{
              width: 40,
              height: 40,
              radius: 20,
              activeBackgroundColor: "#fff",
              inActiveBackgroundColor: "#fff",
            }}
          />
          <TextMedium>{name}</TextMedium>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: moderateScale(20),
            marginTop: verticalScale(10),
            ...shadow(10),
            paddingVertical: verticalScale(15),
            marginHorizontal: horizontalScale(20),
            borderRadius: 20,
          }}
        >
          {icons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={{ width: width / 6, alignItems: "center" }}
            >
              {
                <Image
                  source={icon.url}
                  style={{ width: horizontalScale(25), aspectRatio: 1 }}
                  transition={2000}
                />
              }
              <TextMedium
                style={{
                  fontSize: moderateScale(12),
                  color: "#aaa",
                  paddingVertical: verticalScale(10),
                }}
              >
                {icon.name}
              </TextMedium>
            </TouchableOpacity>
          ))}
        </View>

        <View
          lightColor="transparent"
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",

            marginTop: verticalScale(10),

            marginVertical: verticalScale(15),

            rowGap: verticalScale(5),
            columnGap: horizontalScale(20),
          }}
        >
          {iconActivity.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                {
                  width: width / 2.3,
                  paddingVertical: verticalScale(10),
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  backgroundColor: "#F6F4F8",
                  ...shadow(5),
                },
                index === 0 && { borderTopLeftRadius: 20 },
                index === 1 && { borderTopRightRadius: 20 },
                index === 2 && { borderBottomLeftRadius: 20 },
                index === 3 && { borderBottomRightRadius: 20 },
              ]}
            >
              <Image
                source={icon.url}
                style={{
                  width: horizontalScale(38),
                  aspectRatio: 1,
                }}
                transition={2000}
              />

              <TextMedium
                style={{
                  fontSize: moderateScale(14),
                  color: "#aaa",
                  textAlign: "left",
                }}
              >
                {icon.name}
              </TextMedium>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
