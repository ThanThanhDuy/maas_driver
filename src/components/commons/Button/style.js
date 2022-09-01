import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../../constants";
function createStyle(
  width,
  height,
  fontSize_p,
  fontFamily_p,
  round,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  sizeIconPay,
  backgroundColor
) {
  const styles = StyleSheet.create({
    containerPrimary: {
      position: "relative",
      backgroundColor: backgroundColor ? backgroundColor : colors.primary,
      width,
      height,
      borderRadius: round,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
    },
    containerSecondary: {
      position: "relative",
      backgroundColor: colors.white,
      width,
      height,
      borderRadius: round,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    containerPayment: {
      backgroundColor: backgroundColor ? backgroundColor : colors.primary,
      width,
      height,
      borderRadius: round,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      paddingHorizontal: 24,
    },
    textSecondary: {
      fontFamily: fontFamily_p,
      fontSize: fontSize_p,
      color: colors.primary,
    },
    textPrimary: {
      fontFamily: fontFamily_p,
      fontSize: fontSize_p,
      color: colors.white,
    },
    iconFront: {
      marginRight: 8,
    },
    iconBehind: {
      position: "absolute",
      right: 11,
      height,
      flexDirection: "row",
      alignItems: "center",
    },
    titlePayment: {
      fontFamily: fontFamily_p,
      fontSize: fontSize_p,
      color: colors.white,
    },
    titlePaymentPrice: {
      fontFamily: fontFamily_p,
      fontSize: fontSize.large,
      color: colors.white,
    },
    iconPayment: {
      flexDirection: "row",
      borderRadius: "100%",
      backgroundColor: colors.white,
      width: sizeIconPay,
      height: sizeIconPay,
      marginLeft: 5,
      justifyContent: "center",
    },
    iconLeft: {
      position: "absolute",
      top: 4,
      left: 6,
    },
    iconRight: {
      position: "absolute",
      top: 4,
      left: 3,
    },
    boxPayment: {
      position: "relative",
      flexDirection: "row",
    },
  });
  return styles;
}
export default createStyle;
