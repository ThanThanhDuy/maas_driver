import { StyleSheet } from "react-native";
import { appTheme, fontSize } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  boxButton: {
    position: "absolute",
    bottom: 30,
    left: 0,
    width: appTheme.WIDTH,
    flexDirection: "row",
    justifyContent: "center",
  },
  boxItem: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    height: 140,
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 8,
    padding: 15,
  },
  lineAddress: {
    flexDirection: "row",
    alignItems: "center",
  },
  textAddress: {
    marginLeft: 10,
    fontFamily: "Roboto_400",
    fontSize: fontSize.large,
  },
});
