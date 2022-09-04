import { StyleSheet, Text } from "react-native";
import React from "react";

export const TabBarLabel = props => {
  const {
    isFocused,
    label,
    colorActiveText,
    colorInActiveText,
    fontFamilyActive,
    fontFamilyInActive,
    fontSize,
  } = props;

  const styles = StyleSheet.create({
    label: {
      color: isFocused ? colorActiveText : colorInActiveText,
      fontSize,
      fontFamily: isFocused ? fontFamilyActive : fontFamilyInActive,
    },
  });

  return <Text style={styles.label}>{label}</Text>;
};
