import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 15,
    borderRadius: 8,
    padding: 20,
    backgroundColor: "#FBFCFE",
  },
  boxLine: { flexDirection: "row", alignItems: "center" },
  textTitle: {
    marginLeft: 10,
    fontSize: fontSize.large,
    fontFamily: "Roboto_500",
    color: colors.text,
  },
  boxAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  wrapperAddress: {
    width: 8.3,
    flexDirection: "row",
    justifyContent: "center",
  },
  deviderVer: {
    width: 1,
    backgroundColor: colors.gray,
    height: 50,
  },
  textAddress: { marginLeft: 10, color: "#3E3D3D" },
  deviderTrans: {
    width: 1,
    backgroundColor: colors.transparent,
    height: 50,
  },
  wrapperButAddress: {
    marginLeft: 19.3,
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: "#FC8338",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  textInBox: {
    color: colors.white,
    fontFamily: "Roboto_500",
    fontSize: fontSize.medium,
  },
  wrapperButTime: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: "#31B057",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  deviderHor: {
    marginLeft: 19.3,
    marginTop: 15,
    width: appTheme.WIDTH - 35 * 2 - 9 - 10,
    backgroundColor: colors.gray,
    height: 1,
  },
  boxUser: {
    marginLeft: 19.3,
    paddingTop: 6,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  boxPhone: {
    marginRight: 20,
    borderRadius: 100,
  },
  boxPayment: {
    marginLeft: 19.3,
    paddingVertical: 6,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
});