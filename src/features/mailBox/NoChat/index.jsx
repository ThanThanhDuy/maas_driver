import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Title } from "../../../components";
import { fontSize } from "../../../constants";
import { styles } from "./style";

export const NoChat = () => {
  return (
    <View style={styles.wrappContent}>
      <View>
        <View style={styles.wrappIcon}>
          <Ionicons name="chatbubble-ellipses" size={44} color="white" />
        </View>
      </View>
      <View style={{ marginLeft: 20 }}>
        <Title title="No chats yet" level="h4" />
        <View style={styles.wrappText}>
          <Text
            style={{
              fontFamily: "Roboto_300",
              fontSize: fontSize.regular,
            }}
          >
            Order-related messages and other chats appear here.
          </Text>
        </View>
      </View>
    </View>
  );
};
