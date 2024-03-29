import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 5,
  },
  boxSwipe: {
    position: "absolute",
    bottom: 0,
    width: appTheme.WIDTH,
    paddingBottom: 30,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 10,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 20,
  },
  boxModal: {
    margin: 0,
    position: "absolute",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  boxConfirm: {
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: appTheme.WIDTH - 60,
    marginBottom: 35,
  },
  textConfirm: {
    color: colors.white,
    fontFamily: "Roboto_500",
    fontSize: fontSize.h4,
  },
  buttonClose: {
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 100,
    position: "absolute",
    top: -60,
    left: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 0,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: colors.gray,
  },
});
