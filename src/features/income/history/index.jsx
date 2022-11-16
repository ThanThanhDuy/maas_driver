import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { HeaderBack } from "../../../components";
import { colors } from "../../../constants";
import numberWithCommas from "../../../utils/numberWithCommas";
import { styles } from "./style";
import { useRecoilState } from "recoil";
import { incomeState } from "../../../store";

export const History = ({ navigation }) => {
  const [income] = useRecoilState(incomeState);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBack navigation={navigation} title="History" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {income.SelectedIncome.Incomes.map((item, index) => (
          <View key={index} style={styles.wrapperTrip}>
            <View style={styles.boxTripHeader}>
              <Text style={styles.textBookingId}>{item.TransactionCode}</Text>
              {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              </View> */}
            </View>
            <View style={styles.lineBreak}></View>
            <View style={styles.boxTime}>
              <Text style={styles.time}>{item.Date}</Text>
              <Text style={styles.time}>{item.Time}</Text>
            </View>
            <View style={styles.lineBreak2}></View>
            <View>
              <View style={styles.boxFrom}>
                <FontAwesome5
                  name="dot-circle"
                  size={24}
                  color={colors.organeV2}
                />
                <Text style={styles.textAddress}>{item.StartStation.Name}</Text>
              </View>
              <View style={styles.boxTo}>
                <AntDesign
                  name="caretcircleoup"
                  size={24}
                  color={colors.greenV2}
                />
                <Text style={styles.textAddress}>{item.EndStation.Name}</Text>
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
            <>
              <View style={styles.lineBreak2}></View>
              <View style={styles.boxTotal}>
                <Text style={styles.textTotal}>
                  Total:{" "}
                  <Text style={styles.textMoney}>
                    {numberWithCommas(item.Amount)} VND
                  </Text>
                </Text>
              </View>
            </>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
