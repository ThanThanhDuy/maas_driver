import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../../constants/index";

function createStyle(
  height,
  width,
  borderRadius,
  fontSizeSelect,
  fontSizeLabel,
  colorLabel,
  label,
  IconFront,
  mode
) {
  const styles = StyleSheet.create({
    containerWithShadown: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: IconFront ? 12 : 2,
      // borderRadius,
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      // elevation: 5,
      backgroundColor: "#fff",
      height: label ? height + 8 : height,
      width,
      height,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    inputIOS: {
      fontSize: fontSize[fontSizeSelect],
      paddingVertical: 12,
      paddingHorizontal: IconFront ? 6 : 12,
      marginTop: label ? 14 : 0,
      color: colors.primary,
      paddingRight: 30,
      height,
      width,
      fontFamily: "Roboto_500",
    },
    inputAndroid: {
      fontSize: fontSize[fontSizeSelect],
      paddingHorizontal: IconFront ? 6 : 12,
      paddingVertical: 8,
      marginTop: label ? 14 : 0,
      color: colors.primary,
      paddingRight: 30,
      height,
      width,
      fontFamily: "Roboto_500",
    },
    icon: {
      position: "absolute",
      top: label ? height / 2 - (IconFront ? 4 : 6) : height / 2 - 12,
      left: IconFront ? -65 : -28,
    },
    label: {
      fontSize: fontSize[fontSizeLabel],
      color: colorLabel,
      fontFamily: "Roboto_500",
      position: "absolute",
      left: IconFront ? 6 : 12,
      top: mode === "time" || mode === "date" ? -2 : height / 2 - 10,
    },
    textTime: {
      fontSize: fontSize[fontSizeSelect],
      fontFamily: "Roboto_500",
      paddingHorizontal: IconFront ? 6 : 12,
      marginTop: label ? 14 : 0,
      paddingRight: 40,
      color: colors.text,
    },
    containerSelectTime: {
      position: "relative",
    },
    iconSelectTime: {
      position: "absolute",
      top: label ? height / 2 - (IconFront ? 10 : 8) : height / 2 - 12,
      right: 4,
    },
  });
  return styles;
}
export default createStyle;
