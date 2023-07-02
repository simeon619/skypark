import { Feather, Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../Utilis/metrics";
import { TextBold, TextMedium } from "../../components/StyledText";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import useToggleStore from "../../store/preference";
import Call from "../pageDiscussions/Call";
import Chat from "../pageDiscussions/Chat";
import CieGestion from "../pageDiscussions/CieGestion";

const message = () => {
  const { primaryColour, primaryColourLight } = useToggleStore(
    (state) => state
  );

  const colorScheme = useColorScheme();
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: verticalScale(10),
          paddingHorizontal: horizontalScale(10),
        }}
      >
        <View>
          <TextBold style={{ fontSize: moderateScale(21) }}>
            Discussions
          </TextBold>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: horizontalScale(16),
          }}
        >
          <Feather
            name="search"
            size={24}
            color={Colors[colorScheme ?? "light"].greyDark}
          />
          <Menu style={{ borderRadius: moderateScale(25) }}>
            <MenuTrigger
              children={
                <Ionicons
                  name="reorder-four-outline"
                  size={25}
                  color={Colors[colorScheme ?? "light"].greyDark}
                />
              }
            />
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Delete`)}>
                <TextMedium
                  style={{
                    fontSize: moderateScale(16),
                    paddingLeft: horizontalScale(10),
                  }}
                >
                  settings
                </TextMedium>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Delete`)}>
                <TextMedium
                  style={{
                    fontSize: moderateScale(16),
                    paddingLeft: horizontalScale(10),
                  }}
                >
                  sauvegarde
                </TextMedium>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Delete`)}>
                <TextMedium
                  style={{
                    fontSize: moderateScale(16),
                    paddingLeft: horizontalScale(10),
                  }}
                >
                  Archives
                </TextMedium>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Delete`)}>
                <TextMedium
                  style={{
                    fontSize: moderateScale(16),
                    paddingLeft: horizontalScale(10),
                  }}
                >
                  Delete
                </TextMedium>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Chat"
          backBehavior="order"
          initialLayout={{
            width: Dimensions.get("window").width,
          }}
          screenOptions={{
            // tabBarGap: horizontalScale(25),
            tabBarScrollEnabled: true,
            tabBarStyle: {
              backgroundColor: "#fff",
            },
            tabBarIndicatorStyle: {
              backgroundColor: primaryColour,
            },

            tabBarItemStyle: {
              width: "auto",
              // flex: 1,
              // height: "auto",
              // alignItems: "flex-start",
            },
          }}
        >
          <Tab.Screen
            name="Chat"
            component={Chat}
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
                    <TextMedium
                      style={{
                        fontSize: moderateScale(16),
                        opacity: focused ? 1 : 0.6,
                      }}
                    >
                      {children}
                    </TextMedium>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Compagnie de Gestion"
            component={CieGestion}
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
                    <TextMedium
                      style={{
                        fontSize: moderateScale(16),
                        textAlign: "left",
                        opacity: focused ? 1 : 0.6,
                      }}
                    >
                      {children}
                    </TextMedium>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Appels"
            component={Call}
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
                    <TextMedium
                      style={{
                        fontSize: moderateScale(16),
                        textAlign: "left",
                        opacity: focused ? 1 : 0.6,
                      }}
                    >
                      {children}
                    </TextMedium>
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

export default message;
