import React from "react";
import { View, Image } from "react-native";
import { styles } from "./style";

export const Avatar = props => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperImage}>
        <Image resizeMode="cover" style={styles.image} {...props} />
      </View>
    </View>
  );
};
