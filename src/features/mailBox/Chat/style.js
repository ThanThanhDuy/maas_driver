import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../../constants";

export const styles = StyleSheet.create({
  nameDriver: {
    fontSize: fontSize.large,
    fontFamily: "Roboto_500",
    color: colors.text,
  },
  lineBreak: {
    height: 1,
    width: "100%",
    backgroundColor: colors.gray,
    position: "absolute",
    bottom: -10,
    borderRadius: 100,
  },
});
