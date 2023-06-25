import { Entypo } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { BottomFabBar } from "sim-bottom-tab";
import { shadow, verticalScale } from "../../Utilis/metrics";
import useToggleStore from "../../store/preference";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { primaryColour, primaryColourLight } = useToggleStore(
    (state) => state
  );
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // headerTransparent: true,
        tabBarStyle: { ...shadow(90), height: verticalScale(60) },
        tabBarActiveBackgroundColor: primaryColourLight,
      }}
      tabBar={(props) => (
        <BottomFabBar
          mode={"default"}
          // insets={EdgeInsets.bottom}
          focusedButtonStyle={{ ...shadow(90) }}
          bottomBarContainerStyle={[
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            },
          ]}
          {...props}
        />
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <Entypo name="home" size={20} />,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <Entypo name="message" size={20} />,
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          headerShown: false,
          headerTransparent: true,
          tabBarVisibilityAnimationConfig: {
            hide: { animation: "spring" },
            show: { animation: "spring" },
          },
          tabBarIcon: ({ color }) => <Entypo name="plus" size={20} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={20} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <FontAwesome name="bell" size={20} />,
        }}
      />
    </Tabs>
  );
}
