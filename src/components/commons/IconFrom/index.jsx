import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { colors } from "../../../constants";

export const IconFrom = ({ styleBox, styleIcon, sizeIcon }) => {
  return (
    <View style={[styles.container, styleBox]}>
      <FontAwesome
        style={[styles.icon, styleIcon]}
        name="arrow-up"
        size={sizeIcon ? sizeIcon : 10}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: [
    {
      transform: [{ rotate: "-45deg" }],
    },
    {
      width: 14,
      height: 14,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 100,
      marginRight: 5,
    },
  ],
  icon: [
    { marginLeft: 1 },
    {
      transform: [{ rotate: "45deg" }],
    },
  ],
});
