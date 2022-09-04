import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../constants";

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
  });
  return styles;
}
export default createStyle;
