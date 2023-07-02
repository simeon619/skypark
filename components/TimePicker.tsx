import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import { moderateScale } from "../Utilis/metrics";
import useToggleStore from "../store/preference";
import { TextMedium } from "./StyledText";

const TimePicker = () => {
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);

  const handleScroll = (
    unit: string,
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const scrolledPercentage = contentOffset.y / layoutMeasurement.height;

    let newValue = Math.round(scrolledPercentage * 10); // Multiplying by 10 for finer granularity

    // Clamp the value between 0 and 10
    newValue = Math.max(0, Math.min(newValue, 10));

    switch (unit) {
      case "minutes":
        setMinutes(newValue);
        break;
      case "hours":
        setHours(newValue);
        break;
      case "days":
        setDays(newValue);
        break;
      default:
        break;
    }
  };
  const { primaryColour } = useToggleStore((state) => state);
  const calculateSelectedValue = (unit: string) => {
    let selectedValue = 0;

    switch (unit) {
      case "minutes":
        selectedValue = Math.round((minutes / 10) * 60);
        break;
      case "hours":
        selectedValue = Math.round((hours / 10) * 24);
        break;
      case "days":
        selectedValue = Math.round((days / 10) * 7);
        break;
      default:
        break;
    }

    return selectedValue;
  };

  return (
    <Pressable>
      <Text>Duree de la question</Text>

      <View style={{ flexDirection: "row" }}>
        <TextMedium
          style={{
            flex: 1,
            textAlign: "left",
            color: primaryColour,
            fontSize: moderateScale(14),
          }}
        >
          1 jour
        </TextMedium>
      </View>
    </Pressable>
  );
};

export default TimePicker;
