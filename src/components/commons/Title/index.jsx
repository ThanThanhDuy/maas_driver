import React from "react";
import { Text } from "react-native";
import { styles } from "./style";

export const Title = (props) => {
  const { title = "", level = "h1", style = null } = props;
  return (
    <>
      <Text style={[styles.fontBase, styles[level], style]}>{title}</Text>
    </>
  );
};
