import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../../constants";

export const styles = StyleSheet.create({
  containerAddress: {
    width: appTheme.WIDTH - 30,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  boxInline: { flexDirection: "row", alignItems: "center" },
  boxIconFrom: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginRight: 10,
  },
  textTitle: {
    fontFamily: "Roboto_500",
    fontSize: fontSize.large,
    color: colors.text,
    marginBottom: 3,
  },
  textAddress: {
    fontFamily: "Roboto_500",
    fontSize: fontSize.small,
    color: "rgba(37, 40, 43,0.8)",
  },
  boxUser: {
    width: appTheme.WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  textUser: {
    fontSize: fontSize.medium,
    fontFamily: "Roboto_500",
    color: colors.text,
    marginLeft: 30,
  },
  lineBreak: { height: 15, backgroundColor: "#ddd" },
  boxIconTo: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
    borderRadius: 100,
    position: "relative",
    marginRight: 10,
  },
  iconTo: { position: "absolute", top: -4, left: -4 },
});
