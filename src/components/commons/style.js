import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: appTheme.HEIGHT - 138,
  },
  inner: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  boxInput: {
    marginTop: 0,
    borderRadius: 100,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "#fff",
    marginTop: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: appTheme.WIDTH - 62,
  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    fontFamily: "Roboto_400",
    fontSize: fontSize.medium,
    width: appTheme.WIDTH - 62,
  },
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
