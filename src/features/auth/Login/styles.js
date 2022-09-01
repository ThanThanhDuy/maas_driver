import { StyleSheet } from "react-native";
import { appTheme, colors } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    width: appTheme.WIDTH,
    height: appTheme.HEIGHT,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  wrapperBanner: {
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: appTheme.HEIGHT * 0.4,
    height: appTheme.HEIGHT * 0.3,
  },
});
