import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../../constants";

export const styles = StyleSheet.create({
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
