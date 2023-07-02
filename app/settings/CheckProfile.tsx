import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, useColorScheme, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  moderateScale,
  shadow,
  verticalScale,
} from "../../Utilis/metrics";
import {
  TextExtraBold,
  TextExtraLight,
  TextMediumItalic,
} from "../../components/StyledText";
import { ScrollView, View } from "../../components/Themed";
import createButton from "../../components/utilis/createButton";
import Colors from "../../constants/Colors";
import { LARGE_PIC_USER } from "../../constants/Value";

const CheckProfile = () => {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const icon = {
    email: require("../../assets/images/email.png"),
    building: require("../../assets/images/building.svg"),
    location: require("../../assets/images/location.svg"),
    telephone: require("../../assets/images/telepĥone.png"),
  } as const;
  const infoProfile = ({
    service,
    value,
  }: {
    service: keyof typeof icon;
    value: string;
  }) => {
    return (
      <View
        lightColor="#0000"
        darkColor="#0000"
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          alignItems: "center",
          gap: horizontalScale(15),
          marginVertical: verticalScale(15),
        }}
      >
        <Image
          source={icon[service]}
          style={{ width: horizontalScale(25), aspectRatio: 1 }}
        />
        <TextExtraLight
          numberOfLines={1}
          style={{ fontSize: moderateScale(16) }}
        >
          {value}
        </TextExtraLight>
        <Feather name="edit" size={24} color="black" />
      </View>
    );
  };
  const Stiker = ({ key, value }: { key: string; value: string }) => {
    return (
      <View
        lightColor="#0000"
        darkColor="#0000"
        style={{ flex: 1, alignItems: "center" }}
      >
        <View
          lightColor="#EDEDED"
          darkColor="#0000"
          style={{
            position: "absolute",
            bottom: -30,
            borderRadius: 99,
            borderColor: Colors[colorScheme ?? "light"].background,
            borderWidth: 5,
            height: verticalScale(60),
            width: horizontalScale(60),
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(20),
              fontWeight: "900",
              color: "#000",
              textAlign: "center",
            }}
          >
            {value}
          </Text>
        </View>
        <View
          lightColor="#0000"
          darkColor="#0000"
          style={{ bottom: -55, flex: 1 }}
        >
          <TextMediumItalic
            style={{
              fontSize: moderateScale(15),
              color: Colors[colorScheme ?? "light"].secondary,
              textShadowColor: "rgba(0, 0, 0, 0.25)",
              textShadowOffset: { width: 0, height: 6 },
              textShadowRadius: 10,
              // letterSpacing: 2,
            }}
          >
            {key}
          </TextMediumItalic>
        </View>
      </View>
    );
  };

  function next(): void {
    router.push("(tabs)");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#EDEDED" />
      <View
        lightColor="#EDEDED"
        style={{
          width,
          height: height * 0.35,
          borderBottomLeftRadius: moderateScale(40),
          borderBottomRightRadius: moderateScale(40),
          justifyContent: "center",
          alignItems: "center",
          gap: verticalScale(10),
        }}
      >
        <Image
          source={require("../../assets/images/user1.png")}
          style={{ width: LARGE_PIC_USER, aspectRatio: 1 }}
        />
        <TextExtraBold
          style={{
            fontSize: moderateScale(18),
            color: Colors[colorScheme ?? "light"].greyDark,
          }}
        >
          Bienvenue Karine
        </TextExtraBold>
        <TextExtraBold
          style={{
            fontSize: moderateScale(14),
            backgroundColor: Colors[colorScheme ?? "light"].primaryColourLight,
            ...shadow(10),
            color: Colors[colorScheme ?? "light"].primaryColour,
            paddingVertical: verticalScale(2),
            paddingHorizontal: horizontalScale(9),
          }}
        >
          Propriétaire
        </TextExtraBold>
        <View
          lightColor="#0000"
          darkColor="#0000"
          style={{
            position: "absolute",
            zIndex: 80,
            bottom: 0,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {Stiker({ key: "porte", value: "101" })}
          {Stiker({ key: "building", value: "10" })}
          {Stiker({ key: "fenetre", value: "00" })}
        </View>
      </View>
      <ScrollView
        lightColor="#EDEDED"
        darkColor="#EDEDED"
        style={{
          height: height * 0.35,
          zIndex: -1,
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
          marginTop: verticalScale(5),
          paddingTop: verticalScale(70),
          paddingHorizontal: horizontalScale(20),
          columnGap: verticalScale(10),
        }}
      >
        {infoProfile({ service: "email", value: "karina_Sagi@inbox.ru" })}
        {infoProfile({ service: "telephone", value: "+254054458596" })}
        {infoProfile({ service: "location", value: "Rostov" })}
        {infoProfile({ service: "building", value: "25 Skypark" })}
      </ScrollView>
      <View
        lightColor="#0000"
        darkColor="#0000"
        style={{
          position: "absolute",
          bottom: verticalScale(-90),
          justifyContent: "flex-end",
        }}
      >
        {createButton({
          value: "suivant",
          onPress: next,
          style: {
            alignSelf: "flex-end",
            zIndex: 99,
            position: "absolute",
            top: verticalScale(45),
            right: horizontalScale(35),
          },
        })}
        <Image
          source={require("../../assets/images/Vector2.svg")}
          style={{ width: 375, height: 272 }}
          contentFit="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckProfile;
