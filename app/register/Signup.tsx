import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../Utilis/metrics";
import {
  TextBold,
  TextRegular,
  TextSemiBold,
} from "../../components/StyledText";
import { ScrollView, View } from "../../components/Themed";
import createButton from "../../components/utilis/createButton";
import createInput from "../../components/utilis/createInput";

const Signup = () => {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const colorScheme = useColorScheme();
  const router = useRouter();
  const register = () => {
    router.push("settings/CheckProfile");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FCF3F3" }}>
      <ScrollView
        lightColor="#FCF3F3"
        darkColor="#FCF3F3"
        style={{ flex: 1, paddingHorizontal: horizontalScale(20) }}
      >
        <View
          lightColor="#FCF3F3"
          darkColor="#FCF3F3"
          style={{ marginTop: height * 0.15 }}
        >
          <TextSemiBold
            style={{ fontSize: moderateScale(16), letterSpacing: 2 }}
          >
            Bienvenue sur le réseau social
          </TextSemiBold>
          <TextBold style={{ fontSize: moderateScale(16) }}>Skypark</TextBold>
          <TextRegular style={{ fontSize: moderateScale(15) }}>
            Veuillez créer votre compte
          </TextRegular>
          <View
            lightColor="#FCF3F3"
            darkColor="#FCF3F3"
            style={{ marginTop: height * 0.05 }}
          >
            {createInput({
              placeholder: "Entrez votre adresse email",
              setValue: setEmail,
              value: email,
              typeKeyboard: "default",
            })}
            {createInput({
              placeholder: "Entrez votre  Code",
              setValue: setCode,
              value: code,
              typeKeyboard: "default",
            })}

            {createInput({
              placeholder: "Entrez votre mot de passe",
              setValue: setPassword,
              value: password,
              typeKeyboard: "default",
              securePassword: true,
            })}
            {createInput({
              placeholder: "Confirmez votre mot passe",
              setValue: setConfirmedPassword,
              value: confirmedPassword,
              typeKeyboard: "default",
              securePassword: true,
            })}
          </View>
        </View>
      </ScrollView>
      <View
        lightColor="#0000"
        darkColor="#0000"
        style={{ position: "absolute", bottom: verticalScale(-75) }}
      >
        {createButton({
          value: "inscription",
          onPress: register,
          style: {
            alignSelf: "flex-end",
            zIndex: 99,
            position: "absolute",
            top: verticalScale(45),
            right: horizontalScale(35),
          },
        })}
        <Image
          source={require("../../assets/images/Vector.svg")}
          style={{ width: 375, height: 272 }}
          contentFit="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
