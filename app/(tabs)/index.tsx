import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../Utilis/data";
import {
  horizontalScale,
  moderateScale,
  shadow,
  verticalScale,
} from "../../Utilis/metrics";
import {
  TextLight,
  TextRegular,
  TextRegularItalic,
  TextThin,
} from "../../components/StyledText";
import { ScrollView, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { MEDIUM_PIC_USER, SMALL_PIC_USER } from "../../constants/Value";
import useToggleStore, { useTypeForm } from "../../store/preference";
import Building from "../pagePost/Building";
import Neighbor from "../pagePost/Neighbor";

type imagePrepareShema =
  | {
      buffer: string;
      fileName: string;
      encoding: "base64";
      type: string;
      size: number;
    }
  | undefined;
const home = () => {
  const { scale, width, fontScale } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const [images, setImages] = useState<string[]>();
  const [prepareImage, setPrepareImage] = useState<imagePrepareShema[]>();
  const route = useRouter();
  const [hegihtImg, setheightImg] = useState(MEDIUM_PIC_USER * 8);
  const isExpanded = useSharedValue(true);

  const viewHeight = useSharedValue(
    isExpanded.value ? hegihtImg : MEDIUM_PIC_USER * 2.8
  );

  const { primaryColour, primaryColourLight } = useToggleStore(
    (state) => state
  );

  const { IconName, switchForm } = useTypeForm((state) => state);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isExpanded.value ? MEDIUM_PIC_USER * 2.8 : hegihtImg),
      justifyContent: isExpanded.value ? "center" : "center",
    };
  }, [viewHeight, isExpanded]);

  const hideForm = useAnimatedStyle(() => {
    return {
      display: isExpanded.value ? "none" : "flex",
      opacity: withTiming(isExpanded.value ? 0 : 1),
    };
  }, [isExpanded]);

  const toggleViewHeight = () => {
    isExpanded.value = !isExpanded.value;
  };

  const viewStyle = useAnimatedStyle(() => {
    return {
      display: isExpanded.value ? "flex" : "none",
    };
  }, [isExpanded]);

  const inputStyle = useAnimatedStyle(() => {
    return {
      display: isExpanded.value ? "none" : "flex",
    };
  }, [isExpanded]);

  const pickGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        base64: true,
        selectionLimit: 4,
        allowsMultipleSelection: true,
      });

      if (result && !result?.canceled && result.assets) {
        setImages((prevImage) => {
          if (prevImage) {
            return [...prevImage, ...result.assets.map((asset) => asset.uri)];
          }
          return result.assets.map((asset) => asset.uri);
        });

        result.assets.forEach((asset) => {
          let base64 = asset.base64;
          let fileName = asset.uri?.split("/").pop();
          let ext = fileName?.split(".").pop();
          let type = asset.type === "image" ? `image/${ext}` : `video/${ext}`;

          if (base64 && fileName) {
            const preparedImage: imagePrepareShema = {
              buffer: base64,
              encoding: "base64",
              fileName,
              size: 1500,
              type,
            };
            setPrepareImage((prevPrepareImage) => {
              if (prevPrepareImage) {
                return [...prevPrepareImage, preparedImage];
              }
              return [preparedImage];
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
      // Gérer les erreurs spécifiques ou afficher un message d'erreur à l'utilisateur
    }
  };

  const TabBarCustomButton = ({}) => (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="md-options" size={24} color="black" />
    </TouchableOpacity>
  );
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
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
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
                  marginTop: verticalScale(5),
                  height: MEDIUM_PIC_USER - 3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <TextThin style={{ marginLeft: horizontalScale(15) }}>
                  What's new, Asemai?
                </TextThin>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[inputStyle, { flex: 1 }]}>
              <TextInput
                // autoFocus={focus}
                multiline={true}
                placeholder="What's new, Asemai?"
                style={{
                  borderColor: "#1113",
                  height: verticalScale(120),
                  fontFamily: "ExtraLight",
                }}
              />
            </Animated.View>
          </View>

          <Animated.View
            style={[
              {
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "space-between",
                // borderTopColor: "#0003",
                // borderTopWidth: 1,
                paddingVertical: moderateScale(10),
                backgroundColor: "#0000",
              },
              hideForm,
            ]}
          >
            <View
              style={{
                borderTopColor: "#0003",
                borderTopWidth: 1,
                borderBottomColor: "#0003",
                borderBottomWidth: 1,
                paddingVertical: verticalScale(10),
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors[colorScheme ?? "light"].lightGrey,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  alignSelf: "flex-start",
                }}
                onPress={() => pickGallery()}
              >
                <TextLight
                  style={{
                    color: primaryColour,
                    marginVertical: verticalScale(5),
                  }}
                >
                  Attach media
                </TextLight>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                {images?.map((url, index) => {
                  return (
                    <View key={index} style={{ width: 50 }}>
                      <Image
                        contentFit="cover"
                        source={url}
                        style={{
                          width: "100%",
                          maxHeight: MEDIUM_PIC_USER,
                          aspectRatio: 2 / 3,
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </View>

            <View
              style={{
                paddingVertical: verticalScale(10),
              }}
            >
              <TouchableOpacity
                style={{
                  borderColor: primaryColourLight,
                  borderWidth: 1,
                  paddingHorizontal: horizontalScale(10),
                  paddingVertical: verticalScale(5),
                  borderRadius: moderateScale(50),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: Colors[colorScheme ?? "light"].lightGrey,
                }}
              >
                <TextLight
                  style={{
                    color: Colors[colorScheme ?? "light"].greyDark,
                    textAlign: "center",
                  }}
                >
                  Categorie
                </TextLight>
                <SimpleLineIcons
                  name="arrow-down"
                  size={16}
                  color={Colors[colorScheme ?? "light"].greyDark}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: primaryColourLight,
                paddingHorizontal: horizontalScale(10),
                paddingVertical: verticalScale(5),
                borderRadius: moderateScale(50),
              }}
            >
              <TextRegular
                style={{
                  color: Colors[colorScheme ?? "light"].overLay,
                  textAlign: "center",
                }}
              >
                Valider
              </TextRegular>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: verticalScale(10) }}
              onPress={() => {
                toggleViewHeight();
              }}
            >
              <TextRegular
                style={{
                  color: primaryColour,
                  paddingVertical: verticalScale(1),
                  textAlign: "center",
                }}
              >
                Annuler
              </TextRegular>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Buildind"
          backBehavior="order"
          screenOptions={{
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "red",
            tabBarGap: 0,
            tabBarStyle: { width: 290, height: 50 },
            animationEnabled: true,
            // tabBarGap: 10,
            tabBarIndicatorStyle: {
              backgroundColor: primaryColour,
              borderRadius: 10,
              height: moderateScale(2),
              width: 290 / 2,
            },
          }}
        >
          <Tab.Screen
            name="Buildind"
            component={Building}
            options={{
              tabBarLabel({ focused, children }) {
                return (
                  <View lightColor="#0400" darkColor="#0000">
                    <TextRegular
                      style={{
                        fontSize: moderateScale(15),
                        opacity: focused ? 1 : 0.8,
                      }}
                    >
                      {children}
                    </TextRegular>
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
                        fontSize: moderateScale(15),
                        textAlign: "left",
                        opacity: focused ? 1 : 0.8,
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
