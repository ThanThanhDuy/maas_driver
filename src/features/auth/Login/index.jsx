import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMAGES, LOGO } from "../../../assets";
import { Title, Button } from "../../../components/index";
import { appTheme, colors } from "../../../constants";
import { styles } from "./styles";
import driverService from "../../../services/driver";
import { ActivityIndicator } from "react-native-paper";

GoogleSignin.configure({
  webClientId:
    "1062408749481-jti4dstj3tv2hl8ut2k00tehdlb0eo2e.apps.googleusercontent.com",
});

export const Login = ({ navigation }) => {
  const [_user, _setUser] = useState();
  const [_loading, _setLoading] = useState(false);
  const [_accessToken, _setAccessToken] = useState();

  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    _setLoading(true);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userGoogle = await auth().signInWithCredential(googleCredential);

    const accessTokenFirebase = await userGoogle.user.getIdToken();
    const res = await driverService.login(accessTokenFirebase);

    if (res && res?.StatusCode === 200) {
      await AsyncStorage.setItem(
        "AccessToken",
        JSON.stringify(res?.Data.AccessToken)
      );
      console.log(res?.Data);
      await AsyncStorage.setItem("User", JSON.stringify(res?.Data.User));
      navigation.navigate("Auth");
    } else {
      Alert.alert("Error", res?.Message);
    }
    _setLoading(false);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={LOGO.miniLogo}
          />
        </View>
        <View style={styles.wrapperBanner}>
          <Image style={styles.banner} source={IMAGES.banner} />
        </View>
        <View
          style={{
            paddingLeft: 10,
          }}
        >
          <View
            style={{
              marginTop: 50,
              marginBottom: 30,
            }}
          >
            <Title
              level={"h2"}
              title="Welcome to ViGo Driver!"
              style={{ marginLeft: 10 }}
            />
            <Text style={{ marginLeft: 10 }}>
              Log in to your account and start receiving rides
            </Text>
          </View>
          <Button
            iconFront={<AntDesign name="google" size={24} color="white" />}
            title="Login with Google"
            width={appTheme.WIDTH * 0.9}
            onPress={onGoogleButtonPress}
            marginBottom={60}
            iconBehind={
              _loading && <ActivityIndicator size={24} color={colors.white} />
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};
