import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatMessageDate } from "../../Utilis/date";
import { horizontalScale, moderateScale } from "../../Utilis/metrics";
import { TextMedium, TextMediumItalic } from "../../components/StyledText";
import { ScrollView, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import useToggleStore from "../../store/preference";
import user from "../../user.json";
const Chat = () => {
  const [conversations, setConversations] = useState<typeof user>([]);
  const colorScheme = useColorScheme();
  const { primaryColour } = useToggleStore((state) => state);
  useEffect(() => {
    setConversations(() => user);
  }, []);

  const WhatIconStatut = ({
    send,
    received,
    seen,
  }: {
    send: number | null;
    received: number | null;
    seen: number | null;
  }) => {
    if (received && seen) {
      return <Ionicons name="checkmark-done-outline" size={18} color="blue" />;
    } else if (received) {
      return <Ionicons name="checkmark-done-outline" size={18} color="grey" />;
    } else if (send) {
      return <Ionicons name="checkmark-outline" size={18} color="grey" />;
    } else
      return <Ionicons name="remove-circle-outline" size={16} color="grey" />;
  };

  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1 }}>
      {conversations.map((conversation, index) => (
        <TouchableOpacity
          onPress={() => {
            router.push("modal/discussion");
          }}
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderBottomColor: Colors[colorScheme ?? "light"].grey,
            borderBottomWidth: 1,
          }}
        >
          <Image
            source={{ uri: conversation.pic_user }}
            style={{
              width: moderateScale(45),
              aspectRatio: 1,
              borderRadius: 25,
            }}
          />

          <View
            style={{
              flex: 1,
              paddingHorizontal: horizontalScale(10),
              alignSelf: "stretch",
              justifyContent: "space-between",
            }}
          >
            <TextMedium style={{ fontSize: moderateScale(16) }}>
              {conversation.name}
            </TextMedium>
            <TextMediumItalic style={{ color: "gray" }} numberOfLines={1}>
              {conversation.last_message.Owner &&
                WhatIconStatut(conversation.last_message.status)}
              {conversation.last_message.text}
            </TextMediumItalic>
          </View>
          <View
            style={{
              alignSelf: "stretch",
              justifyContent: "space-between",
            }}
          >
            <TextMedium
              style={{
                color: "gray",
                alignSelf: "flex-start",
                fontSize: moderateScale(12),
              }}
            >
              {formatMessageDate(conversation.last_message.date)}
            </TextMedium>
            {!conversation.last_message.Owner && (
              <Text
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  backgroundColor: primaryColour,
                  padding: moderateScale(3),
                  borderRadius: 99,
                  fontSize: moderateScale(14),
                }}
              >
                {Math.ceil(Math.random() * 2)}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Chat;
