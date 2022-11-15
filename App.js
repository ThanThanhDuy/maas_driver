import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { RecoilRoot } from "recoil";
import NavigatorRoot from "./src/navigation";
import { LOGO } from "./src/assets";
import { appTheme, colors, fontSize } from "./src/constants";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  notificationListener,
  requestUserPermission,
} from "./src/firebase/notification";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const { isConnected } = useNetInfo();
  const [connected, setConnected] = useState(true);
  useEffect(() => {
    requestUserPermission();
    notificationListener();
    setConnected(isConnected);
  }, [isConnected]);

  let [fontsLoaded] = useFonts({
    Roboto_100: Roboto_100Thin,
    Roboto_300: Roboto_300Light,
    Roboto_400: Roboto_400Regular,
    Roboto_500: Roboto_500Medium,
    Roboto_700: Roboto_700Bold,
    Roboto_900: Roboto_900Black,
  });
  if (!fontsLoaded) {
    return (
      <View style={styles.containerImage}>
        <Image style={styles.image} source={LOGO.logo} />
      </View>
    );
  } else {
    return (
      <RecoilRoot>
        <View style={styles.container}>
          <FlashMessage position="top" />
          <NavigatorRoot />
          {!connected && (
            <View style={styles.boxConnect}>
              <MaterialCommunityIcons
                name="wifi-alert"
                size={44}
                color={colors.organeV2}
              />
              <Text style={styles.textTitle}>Ops! Loss internet.</Text>
              <Text style={styles.textDes}>
                Please check the connection to internet.
              </Text>
            </View>
          )}
          <StatusBar style="auto" />
        </View>
      </RecoilRoot>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  containerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: appTheme.WIDTH,
  },
  boxConnect: {
    position: "absolute",
    width: appTheme.WIDTH,
    height: appTheme.HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  textTitle: {
    fontFamily: "Roboto_400",
    fontSize: fontSize.h4,
    marginTop: 5,
  },
  textDes: {
    fontFamily: "Roboto_400",
    fontSize: fontSize.h5,
    marginTop: 5,
  },
});
