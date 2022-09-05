import { StyleSheet } from "react-native";
import { appTheme, colors } from "../../../constants";

export const styles = StyleSheet.create({
  wrappContent: {
    marginLeft: 10,
    marginTop: 30,
    flexDirection: "row",
    marginRight: 10,
  },
  wrappIcon: {
    backgroundColor: colors.blueBackground,
    width: 80,
    height: 80,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  wrappText: {
    width: appTheme.WIDTH - 120,
    flexGrow: 1,
    flex: 1,
    marginTop: 5,
  },
});
