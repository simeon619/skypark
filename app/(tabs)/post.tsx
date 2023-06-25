import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/Themed";
import Colors from "../../constants/Colors";

const post = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <Text>post</Text>
    </SafeAreaView>
  );
};

export default post;
