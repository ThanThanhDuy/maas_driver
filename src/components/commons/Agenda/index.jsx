import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import { appTheme, colors } from "../../../constants/index";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { IconFrom } from "../IconFrom";
import { IconTo } from "../IconTo";
import { useSetRecoilState } from "recoil";
import { bookingSelected } from "../../../store";
import { getDate, getHour } from "../../../utils/getDate";
import { getDistanceArray } from "../../../utils/getDistance";
import { styles } from "./style";

export const Agenda = ({ _listSchedule, navigation }) => {
  const _setBookingSelected = useSetRecoilState(bookingSelected);

  const handleSelect = item => {
    _setBookingSelected(item);
    navigation.navigate("BookingReceive");
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
