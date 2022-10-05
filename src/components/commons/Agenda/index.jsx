import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import { appTheme, colors, fontSize, week } from "../../../constants/index";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { IconFrom } from "../IconFrom";
import { IconTo } from "../IconTo";
import { useSetRecoilState } from "recoil";
import { bookingSelected } from "../../../store";
import { getDate, getHour } from "../../../utils/getDate";
import { getDistanceArray } from "../../../utils/getDistance";

export const Agenda = ({ _listSchedule, navigation }) => {
  const _setBookingSelected = useSetRecoilState(bookingSelected);

  const handleSelect = item => {
    navigation.navigate("BookingReceive");
    _setBookingSelected(item);
  };
  return (
    <FlatList
      data={_listSchedule}
      renderItem={({ item, index }) => (
        <View style={styles.container}>
          {/* weekdays */}
          <View style={styles.containerWeek}>
            <Text style={styles.textDay}>
              {moment(item.Date, "DD-MM-YYYY").format("DD")}
            </Text>
            <Text style={styles.textWeek}>
              {getDate(item.Date, "DD-MM-YYYY")}
            </Text>
          </View>
          {/* route */}

          <View style={styles.containerRoute}>
            {item.Routes.map((itemR, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleSelect(itemR)}
                key={itemR.RouteCode}
                style={styles.boxRoute}
              >
                <View style={styles.boxRouteWrapper}>
                  <View style={{ alignItems: "center", width: 80 }}>
                    <Text style={styles.textPickUpTime}>Pickup time</Text>
                    <Text style={styles.time}>
                      {getHour(itemR?.Schedules[0].Time, "HH:mm:ss")}
                    </Text>
                    <Text style={styles.textCus}>
                      {itemR?.Schedules.length}
                      {itemR?.Schedules.length > 1 ? " Customers" : " Customer"}
                    </Text>
                  </View>
                  <View style={styles.boxAddress}>
                    <View style={styles.inLine}>
                      <IconFrom />
                      <Text numberOfLines={1}>
                        {itemR?.Schedules[0]?.StartStation?.Name}
                      </Text>
                    </View>
                    <View style={styles.deviderVer}></View>
                    <View style={styles.inLine}>
                      <FontAwesome name="road" size={14} color={colors.gray} />
                      <Text style={{ marginLeft: 5 }}>
                        {getDistanceArray(itemR?.Schedules)}
                      </Text>
                    </View>
                    <View style={styles.deviderVer}></View>
                    <View style={styles.inLine}>
                      <IconTo />
                      <Text numberOfLines={1}>
                        {
                          itemR?.Schedules[itemR?.Schedules.length - 1]
                            ?.EndStationCode?.Name
                        }
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ marginHorizontal: 10 }}
      style={{
        marginTop: 10,
        height: appTheme.HEIGHT - 303,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
  },
  containerWeek: {
    alignItems: "center",
    padding: 15,
    paddingRight: 25,
    paddingTop: 5,
  },
  textDay: { fontFamily: "Roboto_100", fontSize: fontSize.h3 },
  textWeek: {
    fontFamily: "Roboto_100",
    fontSize: fontSize.medium,
  },
  // 50 padding, 26 width text big day, 10 marginright
  containerRoute: { width: appTheme.WIDTH - 50 - 26 - 10 },
  boxRoute: {
    backgroundColor: "#FBFCFE",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  boxRouteWrapper: { flexDirection: "row" },
  textPickUpTime: {
    fontFamily: "Roboto_500",
    color: colors.primary,
    marginBottom: 12,
  },
  time: {
    fontFamily: "Roboto_500",
    fontSize: fontSize.h3,
    color: colors.text,
    marginBottom: 12,
  },
  textCus: {
    fontFamily: "Roboto_400",
    color: colors.text,
  },
  boxAddress: { marginLeft: 10, flex: 1, marginRight: 5 },
  inLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  deviderVer: {
    marginVertical: 3,
    width: 1,
    height: 10,
    backgroundColor: colors.gray,
    marginLeft: 6,
  },
});
