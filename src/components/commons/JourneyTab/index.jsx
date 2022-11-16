import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { fontSize } from "../../../constants";
import numberWithCommas from "../../../utils/numberWithCommas";
import { styles } from "./style";

export const JourneyTab = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Text style={styles.day}>{item.Date}</Text>
        <AntDesign name="right" size={24} color="black" />
      </View>
      <Text style={styles.journey}>
        {item.Incomes.length} journey completed
      </Text>
      <View style={styles.wrappTotal}>
        <Text style={styles.textTotal}>
          {`+${numberWithCommas(item.TotalIncome)} `}
          <Text style={{ fontSize: fontSize.regular }}>VND</Text>
        </Text>
      </View>
      <View style={{ height: 5, backgroundColor: "#ccc" }}></View>
    </TouchableOpacity>
  );
};
