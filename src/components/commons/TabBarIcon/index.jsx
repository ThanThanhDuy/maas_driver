import React from "react";
import { Ionicons } from "@expo/vector-icons";

export const TabBarIcon = props => {
  const { isFocused, name, colorActive, colorInActive, size } = props;

  return isFocused ? (
    <Ionicons name={`ios-${name}`} size={size} color={colorActive} />
  ) : (
    <Ionicons name={`ios-${name}-outline`} size={size} color={colorInActive} />
  );
};
