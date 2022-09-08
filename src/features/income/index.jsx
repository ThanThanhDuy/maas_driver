import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import createStyle from "./style";
import { Chart, JourneyTab, Title } from "../../components/index";
import { AntDesign } from "@expo/vector-icons";

const _history = [
  {
    day: "Monday",
    date: "2022-09-05T03:53:27.329Z",
    journeyCompleted: 6,
    total: 705000,
  },
  {
    day: "Tuesday",
    date: "2022-09-06T03:53:27.329Z",
    journeyCompleted: 8,
    total: 154201,
  },
  {
    day: "Wednesday",
    date: "2022-09-07T03:53:27.329Z",
    journeyCompleted: 2,
    total: 374623,
  },
];

export const Income = ({ navigation }) => {
  const styles = createStyle();

  return (
    <SafeAreaView style={styles.container}>
      <Title
        title="Income"
        level="h2"
        style={{ marginHorizontal: 20, marginBottom: 20 }}
      />

      <ScrollView
        style={{ backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.lineBreak}></View>
        <View>
          <View
            style={{
              paddingTop: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.textWeek}>Total in week</Text>
              <View style={{ flexDirection: "row", marginRight: 20 }}>
                <TouchableOpacity activeOpacity={0.7}>
                  <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <AntDesign name="right" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Title
                title="2.550.000"
                level="h2"
                style={{ marginLeft: 20, marginTop: 5 }}
              />
              <Text style={{ fontFamily: "Roboto_500", marginLeft: 5 }}>
                VND
              </Text>
            </View>
            <Chart />

            <View style={styles.wrappDate}>
              <Text style={styles.textDate}>05/09 - 11/09</Text>
            </View>
          </View>
        </View>
        <View style={styles.lineBreak}></View>
        {/* history */}
        <View>
          <Text style={styles.wrappComplete}>54 journey completed</Text>
          {_history.map((item, index) => (
            <JourneyTab item={item} key={index} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
