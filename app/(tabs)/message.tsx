import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextRegular } from "../../components/StyledText";

const message = () => {
  return (
    <SafeAreaView>
      <TextRegular>home</TextRegular>
    </SafeAreaView>
  );
};

export default message;
