import { StyleSheet } from "react-native";
import { appTheme, colors, fontSize } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 200,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  wrapperUser: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    width: appTheme.WIDTH - 40,
    height: 150,
    position: "absolute",
    top: 130,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  boxUser: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  avatar: {
    borderRadius: 15,
    height: 60,
    width: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  textName: {
    fontFamily: "Roboto_500",
    fontSize: fontSize.large,
  },
  textOther: {
    marginTop: 10,
    fontFamily: "Roboto_400",
    fontSize: fontSize.medium,
    color: colors.text,
  },
  driverSetting: {
    width: appTheme.WIDTH,
    marginTop: 230,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
  },
  wapperDriverSetting: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: "#fff",
    height: 60,
    width: appTheme.WIDTH - 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  textTab: {
    fontFamily: "Roboto_500",
    fontSize: fontSize.large,
    marginLeft: 10,
    color: colors.text,
  },
  wapperOther: {
    width: appTheme.WIDTH,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 15,
  },
  boxOther: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  tabItem: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  textItem: {
    fontFamily: "Roboto_500",
    fontSize: fontSize.large,
    marginLeft: 10,
    color: colors.text,
  },
  lineBreak: {
    height: 1,
    backgroundColor: colors.gray,
    borderRadius: 100,
  },
  wrapperLogout: {
    width: appTheme.WIDTH,
    marginTop: 50,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
  },
  boxLogout: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: "#f03e62",
    height: 60,
    width: appTheme.WIDTH - 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  textLogout: {
    fontFamily: "Roboto_500",
    fontSize: fontSize.large,
    marginLeft: 10,
    color: colors.white,
  },
});