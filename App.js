import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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

export default function App() {
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
      <View style={styles.container}>
        <Text>Somthing Wrong</Text>
      </View>
    );
  } else {
    return (
      <RecoilRoot>
        <View style={styles.container}>
          <NavigatorRoot />
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
});
