import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "../../Utilis/metrics";
import useToggleStore from "../../store/preference";
import { TextLight, TextMedium, TextRegular } from "../StyledText";
import { Poppins_400Regular as Regular } from "@expo-google-fonts/poppins";
let EXCEED_LIMIT = 250;
const TextComponent = ({ text }: { text: string |  undefined }) => {
  if(!text) return null
  const [moreText, setMoreText] = useState(false);
  const [textIsExpandable, setTextIsExpandable] = useState(false);
  const { primaryColour } = useToggleStore((state) => state);

  const toggleMoreText = () => {
    setMoreText((prev) => !prev);
  };

  useEffect(() => {
    setTextIsExpandable(text.length > EXCEED_LIMIT);
  }, [text]);
  return (
    <>
      <TextLight
        numberOfLines={
          textIsExpandable ? (moreText ? undefined : 3) : undefined
        }
        style={{
          fontSize: moderateScale(15),
          color: "#000",
          // textAlign: "left",
          // paddingHorizontal: horizontalScale(10),
        }}
      >
        {text}
      </TextLight>
      {textIsExpandable && (
        <TouchableOpacity onPress={toggleMoreText}>
          <TextLight
            style={{ fontSize: moderateScale(15), color: primaryColour }}
          >
            {moreText ? "Voir Moins" : "Voir Plus"}
          </TextLight>
        </TouchableOpacity>
      )}
    </>
  );
};

export default TextComponent;
