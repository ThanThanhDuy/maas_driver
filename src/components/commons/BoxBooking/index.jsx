import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { colors, fontSize } from "../../../constants";
import { Octicons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { getDistance } from "../../../utils/getDistance";
import { getHour } from "../../../utils/getDate";
import { styles } from "./style";

export const BoxBooking = ({ item, index }) => {
  const callNumber = phone => {
    if (phone) {
      let phoneNumber = `tel:${phone}`;
      Linking.openURL(phoneNumber);
    }
  };
  return (
    <View key={index} style={styles.container}>
      <View style={styles.boxLine}>
        <Octicons name="dot-fill" size={16} color={colors.primary} />
        <Text style={styles.textTitle}>{item.StartStation.Name}</Text>
      </View>
      <View style={styles.boxAddress}>
        <View style={styles.wrapperAddress}>
          <View style={styles.deviderVer}></View>
        </View>
        <Text style={styles.textAddress}>{item.StartStation.Address}</Text>
      </View>
      {/* to */}
      <View style={styles.boxLine}>
        <Octicons name="dot-fill" size={16} color={colors.orange} />
        <Text style={styles.textTitle}>{item.EndStation.Name}</Text>
      </View>
      <View style={styles.boxAddress}>
        <View style={styles.wrapperAddress}>
          <View style={styles.deviderTrans}></View>
        </View>
        <Text style={styles.textAddress}>{item.EndStation.Address}</Text>
      </View>
      {/* distance */}
      <View style={styles.boxLine}>
        <View style={styles.wrapperButAddress}>
          <Text style={styles.textInBox}>Distance</Text>
          <Octicons
            name="dot-fill"
            size={12}
            color={colors.white}
            style={{ marginHorizontal: 8 }}
          />
          <Text style={styles.textInBox}>{getDistance(item.Distance)}</Text>
        </View>
        {/* time */}
        <View style={styles.wrapperButTime}>
          <Text style={styles.textInBox}>Time</Text>
          <Octicons
            name="dot-fill"
            size={12}
            color={colors.white}
            style={{ marginHorizontal: 8 }}
          />
          <Text style={styles.textInBox}>
            {getHour(item?.Time, "HH:mm:ss")}
          </Text>
        </View>
      </View>
      {/* line */}
      <View style={styles.deviderHor}></View>
      {/* user */}
      <View style={styles.boxUser}>
        <View>
          <Text style={[styles.textTitle, { marginLeft: 0 }]}>
            {item.Users[0].Name}
          </Text>
        </View>
        <View style={styles.boxLine}>
          <TouchableOpacity
            onPress={() => callNumber(item.Users[0].PhoneNumber)}
            activeOpacity={0.7}
            style={styles.boxPhone}
          >
            <FontAwesome5 name="phone-alt" size={18} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={{ borderRadius: 100 }}>
            <Ionicons
              name="chatbox-ellipses"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* payment */}
      <View style={styles.boxPayment}>
        {/* <View>
        <Text
          style={{
            color: colors.text,
            fontFamily: "Roboto_500",
            fontSize: fontSize.medium,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontFamily: "Roboto_500",
              fontSize: fontSize.medium,
              textDecorationLine: "none",
            }}
          >
            Price:
          </Text>{" "}
          <Text>{numberWithCommas(item.Price)} VND</Text>
        </Text>
      </View> */}
        {/* <View>
          {item.PaymentStatus === 1 ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 20, height: 20, marginLeft: 5 }}
                source={{
                  uri: "https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png",
                }}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: "Roboto_400",
                  fontSize: fontSize.medium,
                  color: colors.text,
                }}
              >
                MoMo
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}> */}
        {/* <FontAwesome5
              name="money-bill-wave-alt"
              size={16}
              color={colors.primary}
            />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: "Roboto_400",
                fontSize: fontSize.medium,
                color: colors.text,
              }}
            >
              Cash
            </Text> */}
        {/* </View>
          )}
        </View> */}
      </View>
    </View>
  );
};
