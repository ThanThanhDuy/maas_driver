import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../../../constants";

export const styles = StyleSheet.create({
  boxDriver: {
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: "flex-start",
    padding: 10,
    borderColor: colors.gray,
    marginRight: 70,
  },
  textDriver: {
    fontFamily: "Roboto_400",
    fontSize: fontSize.medium,
  },
  wrappUser: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  boxUser: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.primary,
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: "flex-end",
  },
  textUser: {
    fontFamily: "Roboto_400",
    fontSize: fontSize.medium,
    color: colors.white,
  },
});
