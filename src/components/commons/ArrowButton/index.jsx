import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../constants";

const CONFIG_MAP = {
  close: "close",
  back: "arrowleft",
  go: "arrowright",
};
export const ArrowButton = props => {
  const {
    type = "back",
    color = colors.black,
    size = 30,
    onPress = () => {},
    style = null,
  } = props;

  return (
    <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.7}>
      <View>
        <AntDesign name={CONFIG_MAP[type]} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};
