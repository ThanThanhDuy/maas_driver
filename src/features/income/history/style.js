import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../../constants";

export const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20, marginHorizontal: 10 },
  wrapperTrip: {
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.gray,
  },
  boxTripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBookingId: { fontFamily: "Roboto_500", fontSize: fontSize.medium },
  completed: {
    fontFamily: "Roboto_400",
    marginRight: 5,
    fontSize: fontSize.regular,
  },
  lineBreak: {
    marginVertical: 5,
    height: 0.5,
    backgroundColor: colors.gray,
    borderRadius: 100,
  },
  boxTime: { flexDirection: "row", justifyContent: "space-between" },
  time: { fontFamily: "Roboto_400", fontSize: fontSize.regular },
  lineBreak2: {
    marginVertical: 10,
    height: 0.5,
    backgroundColor: colors.gray,
    borderRadius: 100,
  },
  boxFrom: { flexDirection: "row", alignItems: "center" },
  textAddress: {
    marginLeft: 10,
    fontFamily: "Roboto_400",
    fontSize: fontSize.medium,
    flexWrap: "wrap",
    flex: 1,
  },
  boxTo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  boxPayment: {
    marginVertical: 10,
    height: 0.5,
    backgroundColor: colors.gray,
    borderRadius: 100,
  },
  textPrice: { fontSize: fontSize.h5, color: colors.text },
  textDiscount: {
    fontSize: fontSize.large,
    color: colors.text,
    marginTop: 5,
  },
  boxTotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTotal: {
    fontSize: fontSize.large,
    color: colors.text,
    marginTop: 5,
    fontFamily: "Roboto_400",
  },
  textMoney: {
    fontSize: fontSize.h4,
    color: colors.text,
    marginTop: 5,
    fontFamily: "Roboto_700",
  },
  textCash: {
    marginLeft: 5,
    fontFamily: "Roboto_500",
    fontSize: fontSize.large,
    color: colors.text,
  },
  textReason: {
    fontFamily: "Roboto_400",
    fontSize: fontSize.medium,
  },
});
