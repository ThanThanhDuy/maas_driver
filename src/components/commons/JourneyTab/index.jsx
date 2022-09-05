import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors, fontSize } from "../../../constants";
import moment from "moment";
import numberWithCommas from "../../../utils/numberWithCommas";
import { styles } from "./style";

export const JourneyTab = ({ item }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.container}>
        <Text style={styles.day}>
          {item.day},{" "}
          <Text style={{ color: colors.tabBarInAcitve }}>
            {moment(item.date).format("MMMM DD")}
          </Text>
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </View>
      <Text style={styles.journey}>
        {item.journeyCompleted} journey completed
      </Text>
      <View style={styles.wrappTotal}>
        <Text style={styles.textTotal}>
          {"+"}
          {numberWithCommas(item.total)}{" "}
          <Text style={{ fontSize: fontSize.regular }}>VND</Text>
        </Text>
      </View>
      <View style={{ height: 5, backgroundColor: "#ccc" }}></View>
    </View>
  );
};
