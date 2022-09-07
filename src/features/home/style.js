import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../constants";

function createStyle() {
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    avatar: {
      width: 50,
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 100,
    },
    wrapperContent: {
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      borderRadius: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 100,
      elevation: 0,
    },
    text: {
      fontFamily: "Roboto_700",
      fontSize: fontSize.large,
      color: colors.text,
      marginRight: 5,
    },
    buttonTurn: {
      padding: 10,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    loading: { flex: 1, justifyContent: "center", alignItems: "center" },
    wrappJourney: {
      position: "absolute",
      bottom: 0,
      left: 0,
      backgroundColor: colors.white,
      height: 110,
      width: appTheme.WIDTH,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 100,
      },
      shadowOpacity: 0.5,
      shadowRadius: 100,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    boxAddress: {
      marginHorizontal: 0,
      width: appTheme.WIDTH - 150,
      marginTop: 10,
    },
    textWallet: {
      fontFamily: "Roboto_400",
      fontSize: fontSize.regular,
      marginBottom: 10,
      color: colors.text,
    },
    textMoney: {
      fontFamily: "Roboto_500",
      fontSize: fontSize.h3,
      color: colors.greenV2,
    },
    vnd: {
      fontFamily: "Roboto_500",
      marginLeft: 3,
      color: colors.text,
    },
  });
  return styles;
}
export default createStyle;
