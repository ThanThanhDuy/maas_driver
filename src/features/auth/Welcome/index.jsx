import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { LOGO } from "../../../assets";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WelCome = ({ navigation }) => {
  // check account
  useEffect(() => {
    const checkLogin = async () => {
      const accessToken = await AsyncStorage.getItem("AccessToken");
      const isLogined = Boolean(accessToken);
      // if (isLogined) {
      //   setTimeout(() => {
      //     navigation.navigate("Auth");
      //   }, 2000);
      // } else {
      setTimeout(() => {
        navigation.navigate("NotAuth");
      }, 2000);
      // }
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={LOGO.logo} />
    </View>
  );
};
