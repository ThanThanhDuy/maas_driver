import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    paddingVertical: 10,
  },
  wrapperText: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    width: appTheme.WIDTH * 0.8,
    paddingVertical: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
  },
});
