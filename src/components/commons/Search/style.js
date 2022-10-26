import { StyleSheet } from "react-native";
import { fontSize } from "../../../constants";

function createStyle(width, height, round, borderColor, backgroundColor) {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: round,
      paddingLeft: 15,
      paddingRight: 15,
      width,
      backgroundColor,
    },
    input: {
      flex: 1,
      height,
      fontSize: fontSize.regular,
      fontFamily: "Roboto_500",
    },
    iconFront: {
      marginRight: 15,
    },
    iconBehind: {
      marginLeft: 15,
    },
  });
  return styles;
}
export default createStyle;
