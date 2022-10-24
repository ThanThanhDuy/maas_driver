import { Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constants";
import { IMAGES } from "../../../assets";
import { Button } from "../Button";
import { AntDesign } from "@expo/vector-icons";
import { useSetRecoilState } from "recoil";
import { tabSelected } from "../../../store/navigation";
import { styles } from "./style";

export const Success = ({ navigation }) => {
  const [second, setSecond] = useState(5);
  const _setTabSelected = useSetRecoilState(tabSelected);

  useEffect(() => {
    let interval = null;
    if (second > 0) {
      interval = setInterval(() => {
        setSecond(second => second - 1);
      }, 1000);
    } else {
      _setTabSelected("Home");
      navigation.navigate("Auth", {
        screen: "Home",
      });
    }
    return () => {
      clearInterval(interval);
    };
  }, [second]);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.success} />
      <Text style={styles.title}>Journey completed</Text>

      <Button
        width={250}
        title="Back to home"
        backgroundColor={colors.white}
        isPrimary={false}
        iconFront={
          <AntDesign name="arrowleft" size={24} color={colors.primary} />
        }
        onPress={() => {
          _setTabSelected("Home");
          navigation.navigate("Auth", {
            screen: "Home",
          });
        }}
        iconBehind={
          <View>
            <Text style={styles.time}>{second}s</Text>
          </View>
        }
      />
    </View>
  );
};
