import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, fontSize } from "../../../constants";

export const WrapperContent = ({ label, text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textlabel}>{label}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 15,
    borderRadius: 8,
    padding: 20,
    backgroundColor: "#FBFCFE",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textlabel: {
    color: "#696969",
    fontFamily: "Roboto_500",
    fontSize: fontSize.medium,
  },
  text: {
    color: colors.text,
    fontFamily: "Roboto_500",
    fontSize: fontSize.medium,
  },
});
