import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./style";

export const TabItem = (props) => {
  const {
    label = "",
    iconLeft = null,
    iconRight = null,
    description = "",
    onPress = () => {},
  } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          {iconLeft ? iconLeft : null}
        </View>
        <View style={styles.wrapperText}>
          <Text style={styles.label}>{label}</Text>
          <Text>{description}</Text>
          <View
            style={{
              position: "absolute",
              right: -10,
              top: 10,
            }}
          >
            {iconRight ? (
              iconRight
            ) : (
              <Entypo name="chevron-right" size={24} color="black" />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
