import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../../constants";

export const IconTo = ({ styleBox, styleIcon, sizeIcon }) => {
  return (
    <View style={[styles.container, styleBox]}>
      <Entypo
        style={[styles.icon, styleIcon]}
        name="dot-single"
        size={sizeIcon ? sizeIcon : 14}
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
      backgroundColor: colors.orange,
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
