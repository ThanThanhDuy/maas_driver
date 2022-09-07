import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../../constants";
function createStyle(styleBox) {
  const styles = StyleSheet.create({
    container: {
      width: styleBox.marginHorizontal
        ? appTheme.WIDTH - styleBox.marginHorizontal * 2
        : styleBox.width,
      height: 60,
      backgroundColor: "red",
      marginHorizontal: styleBox.marginHorizontal,
      marginTop: styleBox.marginTop,
      borderRadius: styleBox.round,
      backgroundColor: styleBox.backgroundColor,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: styleBox.round,
      elevation: 0,
      padding: 10,
      justifyContent: "space-between",
    },
    markerFrom: {
      flexDirection: "row",
      alignItems: "center",
    },
    markerTo: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconFrom: {
      width: 14,
      height: 14,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 100,
      marginRight: 10,
    },
    iconTo: {
      width: 14,
      height: 14,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.orange,
      borderRadius: 100,
      position: "relative",
      marginRight: 10,
    },
    iconDot: {
      position: "absolute",
      top: -4.7,
      left: -4.7,
    },
    lineBreak: {
      height: 0.5,
      backgroundColor: colors.gray,
      borderRadius: 100,
      marginLeft: 24,
      marginRight: 10,
    },
    text: {
      width: appTheme.WIDTH - 150 - 50,
      fontFamily: "Roboto_500",
      fontSize: fontSize.small,
    },
  });
  return styles;
}
export default createStyle;
