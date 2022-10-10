import { StyleSheet } from "react-native";
import { appTheme } from "../../constants";

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
});
