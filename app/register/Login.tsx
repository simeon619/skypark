import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, useColorScheme, useWindowDimensions } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackgroundProps,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  moderateScale,
  shadow,
  verticalScale,
} from "../../Utilis/metrics";
import {
  TextExtraLightItalic,
  TextRegular,
  TextSemiBold,
} from "../../components/StyledText";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";

const Login = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
    style,
    animatedIndex,
  }) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        animatedIndex.value,
        [0, 1],
        ["#fff", "#FCF3F3"],
      ),
    }));
    const containerStyle = useMemo(
      () => [style, containerAnimatedStyle],
      [style, containerAnimatedStyle],
    );

    return <Animated.View pointerEvents="none" style={containerStyle} />;
  };

  const slide = {
    0: {
      transform: [{ translateY: 0 }],
    },
    0.5: {
      transform: [{ translateY: 10 }],
    },
    1: {
      transform: [{ translateY: 15 }],
    },
  };
  const snapPoints = useMemo(() => ["6%", "50%"], []);
  const BtranslateY = useSharedValue(0);
  const Bopacity = useSharedValue(1);
  const TtranslateY = useSharedValue(0);
  const Topacity = useSharedValue(0);
  const flex = useSharedValue(0);
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === 0) {
        if (BtranslateY.value !== 0) {
          BtranslateY.value = withSpring(0);
          flex.value = withSpring(0);
          Bopacity.value = withSpring(1);
        }
      } else if (index === 1) {
        if (BtranslateY.value !== -height * 0.4) {
          BtranslateY.value = withSpring(-height * 0.4);
          flex.value = withSpring(1);
          Bopacity.value = withSpring(0);
        }
      }

      if (index === 1) {
        if (TtranslateY.value !== height * 0.5) {
          TtranslateY.value = withSpring(height * 0.5);
          Topacity.value = withSpring(1);
        }
      } else {
        if (TtranslateY.value !== 0) {
          TtranslateY.value = withSpring(0);
          Topacity.value = withSpring(0);
        }
      }
    },
    [BtranslateY, Bopacity, TtranslateY, Topacity, flex, height],
  );

  const animatedInfoB = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: BtranslateY.value }],
      opacity: Bopacity.value,
    };
  });

  const hideHalf = useAnimatedStyle(() => {
    return {
      flex: flex.value,
      backgroundColor: "#C5A8E6",
    };
  });

  const animatedInfoT = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: TtranslateY.value }],
      opacity: Topacity.value,
    };
  });

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const createInputEmail = () => {
    const [email, setEmail] = useState<string>();
    return (
      <BottomSheetTextInput
        placeholder="Entrez votre adresse email"
        onChangeText={setEmail}
        value={email}
        style={{
          marginVertical: verticalScale(20),
          fontFamily: "Thin",

          borderRadius: moderateScale(25),
          fontSize: moderateScale(16),
          lineHeight: 20,
          paddingHorizontal: horizontalScale(30),
          paddingVertical: verticalScale(10),
          backgroundColor: Colors[colorScheme ?? "light"].background,
          ...shadow(1),
        }}
      />
    );
  };

  const createInputPassword = () => {
    const [password, setPassword] = useState<string>();
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          ...shadow(1),
          paddingHorizontal: horizontalScale(30),
          borderRadius: moderateScale(25),
        }}
      >
        <BottomSheetTextInput
          placeholder="Mot de passe"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          style={{
            marginVertical: horizontalScale(5),
            fontFamily: "Thin",

            fontSize: moderateScale(16),
            // lineHeight: 20,
            flex: 1,
            paddingVertical: verticalScale(5),
            backgroundColor: Colors[colorScheme ?? "light"].background,
          }}
        />
        <FontAwesome
          name="eye-slash"
          size={moderateScale(23)}
          color={Colors[colorScheme ?? "light"].greyDark}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FFA7A9", "#fff", "#C5A8E6"]}
        locations={[0, 0.5, 0.7]}
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Animated.View
          style={{
            alignItems: "center",
            width,
            ...animatedInfoT,
          }}
        >
          <Image
            source={require("../../assets/images/register.png")}
            style={{
              width,
              height: verticalScale(height * 0.4),
              aspectRatio: 1,
              alignSelf: "center",
            }}
          />

          <TextSemiBold
            style={[
              {
                fontSize: moderateScale(23),
                color: Colors[colorScheme ?? "light"].overLay,
                position: "absolute",
                bottom: verticalScale(-height * 0.05),
                alignSelf: "center",
                textAlign: "left",
              },
            ]}
          >
            <TextSemiBold>Bonjour! </TextSemiBold>
            Inscrivez-vous ou connectez-vous à votre compte
          </TextSemiBold>
        </Animated.View>
        <Animated.View
          style={{
            alignItems: "center",
            // flex: 1,
            ...animatedInfoB,
          }}
        >
          <Image
            source={require("../../assets/images/register.png")}
            style={{
              width,
              height: verticalScale(height * 0.4),
              aspectRatio: 1,
              alignSelf: "center",
            }}
          />

          <TextSemiBold
            style={[
              {
                fontSize: moderateScale(23),
                color: Colors[colorScheme ?? "light"].overLay,
                marginBottom: verticalScale(40),
                alignSelf: "center",
                textAlign: "left",
                // fontFamily: "semiBold",
              },
            ]}
          >
            <TextSemiBold>Glissez vers le haut,</TextSemiBold> pour faire
            connaissance avec vos voisins !
          </TextSemiBold>
        </Animated.View>
        <Animated.View style={{ flex: 1, ...animatedInfoB }}>
          <Animatable.Image
            animation={slide}
            iterationCount={"infinite"}
            style={{ bottom: height * 0.09, alignSelf: "center" }}
            direction="alternate"
            source={require("../../assets/images/Arrowup.png")}
          />
        </Animated.View>

        {/* </View> */}
      </LinearGradient>
      <Animated.View style={{ ...hideHalf }} />
      <BottomSheet
        // snapPoints={snapPoints}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        animationConfigs={animationConfigs}
        backgroundComponent={CustomBackground}
        // containerStyle={{ borderRadius: moderateScale(25), overflow: "hidden" }}
        style={{ borderRadius: moderateScale(25), overflow: "hidden" }}
        handleIndicatorStyle={{
          width: width * 0.3,
          marginTop: height * 0.02,
        }}
      >
        <View
          lightColor="#FCF3F3"
          darkColor="#FCF3F3"
          onLayout={handleContentLayout}
          style={{
            paddingTop: height * 0.01,
            paddingHorizontal: width * 0.05,
            borderRadius: moderateScale(25),
            flex: 1,
            // backgroundColor: "#FCF3F3",
          }}
        >
          {createInputEmail()}
          {createInputPassword()}

          <View style={{ backgroundColor: "#0000" }}>
            <TextExtraLightItalic
              style={{
                textAlign: "right",
                paddingVertical: verticalScale(10),
                color: Colors[colorScheme ?? "light"].secondaryColour,
              }}
            >
              Mot de passe Oublie ?
            </TextExtraLightItalic>
          </View>

          <TouchableOpacity
            style={{
              alignSelf: "center",
              backgroundColor: Colors[colorScheme ?? "light"].primaryColour,
              paddingVertical: verticalScale(5),
              paddingHorizontal: horizontalScale(30),
              borderRadius: 20,
              marginTop: verticalScale(25),
            }}
          >
            <TextRegular
              style={{
                fontSize: moderateScale(16),
                color: Colors[colorScheme ?? "light"].overLay,
              }}
            >
              Connexion
            </TextRegular>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("register/Signup");
            }}
            style={{ marginTop: verticalScale(35) }}
          >
            <TextRegular
              style={{
                fontSize: moderateScale(14),
                color: Colors[colorScheme ?? "light"].secondaryColour,
                textAlign: "center",
              }}
            >
              <TextRegular>Pas de compte ? </TextRegular>
              Creez en un
            </TextRegular>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Login;
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {},

  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});
