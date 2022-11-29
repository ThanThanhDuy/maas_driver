import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fontSize } from "../../../constants";
import { styles } from "./style";

const Actions = [
  {
    icon: <Ionicons name="mail" size={32} color="white" />,
    title: "Notifications",
    color: colors.organeV2,
    page: "Notification",
  },
  // {
  //   icon: (
  //     <MaterialCommunityIcons name="comment-question" size={32} color="white" />
  //   ),
  //   title: "Help tickets",
  //   color: colors.greenV2,
  // },
];

export const ActionBox = ({ navigation }) => {
  return (
    <View style={styles.wrappBox}>
      {Actions.map((item, index) => (
        <View
          key={index}
          style={{ alignItems: "center", marginLeft: index !== 0 ? 30 : 0 }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: item.color,
              ...styles.wrappIcon,
            }}
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            {item.icon}
          </TouchableOpacity>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};
