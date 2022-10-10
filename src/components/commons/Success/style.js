import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    width: appTheme.WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto_700",
    fontSize: fontSize.h2,
    color: colors.white,
    marginVertical: 20,
  },
  time: {
    fontFamily: "Roboto_900",
    color: colors.primary,
    fontSize: fontSize.medium,
  },
});
