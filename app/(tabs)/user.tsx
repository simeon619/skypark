import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/Themed";

const user = () => {
  return (
    <SafeAreaView>
      <Text>post</Text>
    </SafeAreaView>
  );
};

export default React.memo(user);
