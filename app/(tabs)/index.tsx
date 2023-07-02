import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image } from "expo-image";
import { useRootNavigationState, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../Utilis/data";
import {
  horizontalScale,
  moderateScale,
  shadow,
  verticalScale,
} from "../../Utilis/metrics";
import { TextRegularItalic, TextThin } from "../../components/StyledText";
import { ScrollView, View } from "../../components/Themed";
import SurveyForm from "../../components/post/SurveyForm";
import DefaultForm from "../../components/post/defaultForm";
import Colors from "../../constants/Colors";
import {
  MEDIUM_PIC_USER,
  SMALL_PIC_USER,
  formTextPlaceholder,
} from "../../constants/Value";
import useToggleStore, { useTypeForm } from "../../store/preference";
import Building from "../pagePost/Building";
import Neighbor from "../pagePost/Neighbor";

const home = () => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const route = useRouter();
  const navigationState = useRootNavigationState();
  useEffect(() => {
    if (navigationState?.key) {
      // route.replace("settings/CheckProfile");
    }
  }, [navigationState?.key]);
  const [hegihtImg, setheightImg] = useState(MEDIUM_PIC_USER * 8);
  const isExpanded = useSharedValue(false);

  const viewHeight = useSharedValue(
    isExpanded.value ? MEDIUM_PIC_USER * 2.8 : hegihtImg
  );

  const { primaryColour, primaryColourLight } = useToggleStore(
    (state) => state
  );

  const { IconName, switchForm } = useTypeForm((state) => state);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      justifyContent: isExpanded.value ? "center" : "center",
    };
  }, [viewHeight, isExpanded]);

  const toggleViewHeight = () => {
    isExpanded.value = !isExpanded.value;
  };

  const viewStyle = useAnimatedStyle(() => {
    return {
      display: isExpanded.value ? "none" : "flex",
      marginVertical: isExpanded.value ? 0 : 20,
    };
  }, [isExpanded]);

  const inputStyle = useAnimatedStyle(() => {
    return {
      display: isExpanded.value ? "flex" : "none",
    };
  }, [isExpanded]);

  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={primaryColour} style={"light"} />
      <View
        style={{
          width,
          backgroundColor: primaryColour,
          // backgroundColor: "blue",
          paddingHorizontal: horizontalScale(10),
          flexDirection: "row",
          alignItems: "center",

          paddingVertical: verticalScale(5),
        }}
      >
        <Image
          source={require("../../assets/icon/menu.png")}
          style={{
            height: moderateScale(28),
            aspectRatio: 1,
            marginTop: 3,
            tintColor: Colors[colorScheme ?? "light"].overLay,
            transform: [{ rotate: "180deg" }],
            // backgroundColor: "red",
          }}
          transition={2000}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            height: moderateScale(28),
            borderBottomWidth: 1,
            gap: horizontalScale(10),
            paddingBottom: verticalScale(5),
            marginHorizontal: horizontalScale(15),
            borderBottomColor: Colors[colorScheme ?? "light"].overLay,
            backgroundColor: primaryColour,
          }}
        >
          <Image
            source={require("../../assets/icon/search.png")}
            style={{
              width: moderateScale(22),
              aspectRatio: 1,
              tintColor: Colors[colorScheme ?? "light"].overLay,
              // backgroundColor: "red",
            }}
            transition={2000}
          />
          <TextThin
            style={{
              color: Colors[colorScheme ?? "light"].overLay,
              fontSize: moderateScale(17),
            }}
          >
            Search
          </TextThin>
        </View>
        <TouchableOpacity
          onPress={() => {
            route.push("./profile");
          }}
        >
          <Image
            style={{
              width: moderateScale(SMALL_PIC_USER),
              aspectRatio: 1,
              borderRadius: SMALL_PIC_USER / 2,
            }}
            source="https://picsum.photos/seed/696/3000/2000"
            contentFit="cover"
            transition={1000}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingBottom: horizontalScale(10),
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      >
        <ScrollView
          // horizontal={true}
          style={{ paddingVertical: verticalScale(15) }}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {icons.map((icon, index) => (
            <TouchableOpacity key={index} onPress={() => switchForm(icon.name)}>
              {
                <Image
                  source={icon.url}
                  style={{
                    width: 27,
                    aspectRatio: 1,
                    tintColor:
                      IconName === icon.name ? primaryColour : "#000000",
                  }}
                  transition={2000}
                />
              }
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Animated.View
          style={[
            {
              // minHeight: verticalScale(116),
              ...shadow(5),
              borderRadius: 25,
              backgroundColor: Colors[colorScheme ?? "light"].background,
              marginHorizontal: horizontalScale(10),
              gap: 5,
              // justifyContent: canComment ? "center" : "space-between",

              paddingHorizontal: horizontalScale(15),
              overflow: "hidden",
            },
            animatedStyle,
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // paddingTop: verticalScale(10),
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "center", // Centrer l'image verticalement
              }}
              onPress={() => {
                route.push("./profile");
              }}
            >
              <Image
                style={{
                  width: moderateScale(MEDIUM_PIC_USER),
                  aspectRatio: 1,
                  marginHorizontal: moderateScale(10),
                  borderRadius: MEDIUM_PIC_USER / 2,
                  borderColor: primaryColourLight,
                  borderWidth: 3,
                }}
                source="https://picsum.photos/seed/696/3000/2000"
                contentFit="cover"
                transition={1000}
              />
            </TouchableOpacity>

            <Animated.View style={[viewStyle, { flex: 1 }]}>
              <TouchableOpacity
                onPress={toggleViewHeight}
                style={{
                  borderColor: "#1113",
                  borderWidth: 1,
                  height: MEDIUM_PIC_USER - 3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <TextThin style={{ marginLeft: horizontalScale(15) }}>
                  {formTextPlaceholder(IconName)}
                </TextThin>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[inputStyle, { flex: 1 }]}>
              <TextInput
                multiline={true}
                placeholder={formTextPlaceholder(IconName)}
                style={{
                  borderColor: "#1113",
                  // height: verticalScale(100),
                  maxHeight: verticalScale(120),
                  fontFamily: "ExtraLight",
                  // borderWidth: 1,
                  paddingVertical: verticalScale(20),
                }}
              />
            </Animated.View>
          </View>
          <DefaultForm cancel={toggleViewHeight} isExpanded={isExpanded} />
          <SurveyForm cancel={toggleViewHeight} isExpanded={isExpanded} />
        </Animated.View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Buildind"
          backBehavior="order"
          initialLayout={{
            width: Dimensions.get("window").width,
          }}
          screenOptions={{
            tabBarGap: horizontalScale(25),
            tabBarScrollEnabled: true,
            tabBarStyle: {
              backgroundColor: "#fff",
            },
            tabBarIndicatorStyle: {
              backgroundColor: primaryColour,
            },
            tabBarItemStyle: {
              width: "auto",
              height: "auto",
              alignItems: "flex-start",
            },
            tabBarLabelStyle: {
              fontSize: 80,
              height: moderateScale(7),
              fontFamily: "Thin",
              // color: "#fff",
              textTransform: "capitalize",
            },
          }}
        >
          <Tab.Screen
            name="Buildind"
            component={Building}
            options={{
              tabBarLabel({ focused, children }) {
                return (
                  <View
                    lightColor="#0000"
                    darkColor="#0000"
                    style={[
                      {
                        // flexDirection: "row",
                        alignSelf: "flex-start",
                        // justifyContent: "flex-start",
                      },
                    ]}
                  >
                    <TextRegularItalic
                      style={{
                        fontSize: moderateScale(16),
                        opacity: focused ? 1 : 0.6,
                      }}
                    >
                      {children}
                    </TextRegularItalic>
                  </View>
                );
              },
            }}
          />

          <Tab.Screen
            name="Voisinage"
            component={Neighbor}
            options={{
              tabBarLabel({ focused, children }) {
                return (
                  <View
                    lightColor="#0000"
                    darkColor="#0000"
                    style={[
                      {
                        // flexDirection: "row",
                        alignSelf: "flex-start",
                        // justifyContent: "flex-start",
                      },
                      // focused && { width: 100 },
                    ]}
                  >
                    <TextRegularItalic
                      style={{
                        fontSize: moderateScale(16),
                        textAlign: "left",
                        opacity: focused ? 1 : 0.6,
                      }}
                    >
                      {children}
                    </TextRegularItalic>
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default home;
