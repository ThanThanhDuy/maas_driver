import { StyleSheet } from "react-native";
import { fontSize } from "../../../constants";

export const styles = StyleSheet.create({
  wrappBox: { marginLeft: 30, marginTop: 20, flexDirection: "row" },
  wrappIcon: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    fontFamily: "Roboto_400",
    fontSize: fontSize.medium,
  },
});
