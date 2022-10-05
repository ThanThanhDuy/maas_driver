import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./styles";

export const WrapperContent = ({ label, text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textlabel}>{label}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
