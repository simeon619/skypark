import React from "react";
import { TextMediumItalic } from "../../components/StyledText";
import { View } from "../../components/Themed";
import PostIndex from "../../components/post/PostIndex";

const CieGestion = () => {
  console.log("salut1");
  return <View style={{ flex: 1 }}>{/*<PostIndex/>*/}</View>;
};

export default React.memo(CieGestion);
