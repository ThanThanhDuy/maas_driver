import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import createStyle from "./style";

export const BoxAddress = props => {
  const boxAddressMotion = useRef(new Animated.Value(0)).current;

  const { styleBox = {}, from, to, time = 500 } = props;

  const styleBoxDefault = {
    marginHorizontal: 20,
    marginTop: 15,
    round: 15,
    backgroundColor: "#fff",
  };

  useEffect(() => {
    Animated.timing(boxAddressMotion, {
      toValue: { ...styleBoxDefault, ...styleBox }.marginTop,
      duration: time,
      useNativeDriver: false,
    }).start();
  }, []);

  const styles = createStyle({ ...styleBoxDefault, ...styleBox });

  return (
    <Animated.View style={{ ...styles.container }}>
      <View style={styles.markerFrom}>
        <View style={styles.iconFrom}>
          <FontAwesome
            style={{ marginLeft: 1 }}
            name="arrow-up"
            size={10}
            color="white"
          />
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {from}
        </Text>
      </View>
      <View style={styles.lineBreak}></View>
      <View style={styles.markerTo}>
        <View style={styles.iconTo}>
          <Entypo
            style={styles.iconDot}
            name="dot-single"
            size={24}
            color="white"
          />
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {to}
        </Text>
      </View>
    </Animated.View>
  );
};
