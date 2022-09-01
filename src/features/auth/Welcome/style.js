import { StyleSheet } from "react-native";
import { appTheme } from "../../../constants/index";
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: appTheme.WIDTH,
  },
});
