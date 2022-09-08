import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { HeaderBack } from "../../../components";
import { colors } from "../../../constants";
import numberWithCommas from "../../../utils/numberWithCommas";
import { styles } from "./style";

const _history = [
  {
    bookingId: "ViRide-123456-sfag",
    isCompleted: true,
    date: "2022-09-05T03:53:27.329Z",
    from: "17 Duong D5A, Phuoc Long B",
    to: "Dai Hoc FPT, campus HCM",
    price: 125000,
    discount: 15,
    paymentMethods: "MoMo",
    reason: "",
  },
  {
    bookingId: "ViRide-789123-zxcv",
    isCompleted: false,
    date: "2022-09-05T03:53:27.329Z",
    from: "17 Duong D5A, Phuoc Long B, quan 9 thanh pho ho chi minh",
    to: "Dai Hoc FPT, campus HCM",
    price: 230000,
    discount: 20,
    paymentMethods: "Cash",
    reason: "Customer cancels trip",
  },
  {
    bookingId: "ViRide-123456-sfag",
    isCompleted: true,
    date: "2022-09-05T03:53:27.329Z",
    from: "17 Duong D5A, Phuoc Long B",
    to: "Dai Hoc FPT, campus HCM",
    price: 125000,
    discount: 15,
    paymentMethods: "Cash",
    reason: "",
  },
];

export const History = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBack navigation={navigation} title="History" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {_history.map((item, index) => (
          <View key={index} style={styles.wrapperTrip}>
            <View style={styles.boxTripHeader}>
              <Text style={styles.textBookingId}>{item.bookingId}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.completed}>
                  {item.isCompleted ? "Completed" : "Cancelled"}
                </Text>
                {item.isCompleted ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.primary}
                  />
                ) : (
                  <Ionicons name="close-circle" size={24} color={colors.red} />
                )}
              </View>
            </View>

            <View style={styles.lineBreak}></View>
            <View style={styles.boxTime}>
              <Text style={styles.time}>
                {moment(item.date).format("MMM DD YYYY")}
              </Text>
              <Text style={styles.time}>
                {moment(item.date).format("HH:mm A")}
              </Text>
            </View>
            <View style={styles.lineBreak2}></View>
            <View>
              <View style={styles.boxFrom}>
                <FontAwesome5
                  name="dot-circle"
                  size={24}
                  color={colors.organeV2}
                />
                <Text style={styles.textAddress}>{item.from}</Text>
              </View>
              <View style={styles.boxTo}>
                <AntDesign
                  name="caretcircleoup"
                  size={24}
                  color={colors.greenV2}
                />
                <Text style={styles.textAddress}>{item.to}</Text>
              </View>
            </View>

            {/* payment */}
            {item.isCompleted && (
              <>
                <View style={styles.boxPayment}></View>
                <View>
                  <Text style={styles.textPrice}>
                    Price: {numberWithCommas(item.price)} VND
                  </Text>
                  <Text style={styles.textDiscount}>
                    Discount:{" "}
                    <Text style={{ color: colors.organeV2 }}>
                      {item.discount}%
                    </Text>
                  </Text>
                </View>
              </>
            )}
            {item.isCompleted && (
              <>
                <View style={styles.lineBreak2}></View>
                <View style={styles.boxTotal}>
                  <Text style={styles.textTotal}>
                    Total:{" "}
                    <Text style={styles.textMoney}>
                      {numberWithCommas(
                        item.price - item.price * (item.discount / 100)
                      )}{" "}
                      VND
                    </Text>
                  </Text>
                  <View>
                    {item.paymentMethods === "MoMo" && (
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={{
                          uri: "https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png",
                        }}
                      />
                    )}
                    {item.paymentMethods === "Cash" && (
                      <View style={{ flexDirection: "row" }}>
                        <FontAwesome5
                          name="money-bill-wave-alt"
                          size={20}
                          color={colors.primary}
                        />
                        <Text style={styles.textCash}>Cash</Text>
                      </View>
                    )}
                  </View>
                </View>
              </>
            )}
            {!item.isCompleted && (
              <View>
                <View style={styles.lineBreak2}></View>
                <Text style={styles.textReason}>Reason: {item.reason}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
