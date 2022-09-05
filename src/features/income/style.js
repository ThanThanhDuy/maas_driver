import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../constants";

function createStyle() {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: colors.white,
      flex: 1,
    },
    lineBreak: {
      height: 0.5,
      backgroundColor: colors.gray,
      borderRadius: 100,
      marginRight: 10,
    },
    textWeek: {
      fontFamily: "Roboto_400",
      fontSize: fontSize.large,
      marginLeft: 20,
    },
    wrappDate: {
      alignItems: "center",
      marginBottom: 15,
    },
    textDate: {
      fontFamily: "Roboto_500",
      fontSize: fontSize.medium,
      color: colors.text,
    },
    wrappComplete: {
      fontFamily: "Roboto_500",
      fontSize: fontSize.h3,
      marginBottom: 10,
      backgroundColor: "#D3D7D9",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
  });
  return styles;
}
export default createStyle;
