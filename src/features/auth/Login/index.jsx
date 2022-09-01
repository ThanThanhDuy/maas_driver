import React, { useEffect, useState } from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { IMAGES, LOGO } from "../../../assets";
import { Title, Button } from "../../../components/index";
import { appTheme } from "../../../constants";
import { styles } from "./styles";

GoogleSignin.configure({
  webClientId:
    "1062408749481-jti4dstj3tv2hl8ut2k00tehdlb0eo2e.apps.googleusercontent.com",
});

export const Login = ({ navigation }) => {
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState();

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user = await auth().signInWithCredential(googleCredential);
    setUser(user);
    setAccessToken(idToken);
  }

  return (
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
        />
      </View>
    </SafeAreaView>
  );
};
