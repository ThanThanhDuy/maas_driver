import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  day: {
    fontFamily: "Roboto_400",
    fontSize: fontSize.h3,
    color: colors.text,
  },
  journey: {
    marginHorizontal: 20,
    marginTop: 5,
    fontFamily: "Roboto_400",
    fontSize: fontSize.large,
    color: colors.tabBarInAcitve,
  },
  wrappTotal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
  },
  textTotal: {
    marginTop: 5,
    fontFamily: "Roboto_400",
    fontSize: fontSize.h3,
    color: colors.primary,
    marginBottom: 10,
  },
});
