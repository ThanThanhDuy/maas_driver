import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Avatar, HeaderBack, Title } from "../../components";
import { appTheme, colors } from "../../constants";
import { IMAGES } from "../../assets";
import { styles } from "./style";
import { useIsFocused } from "@react-navigation/native";
import userService from "../../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { isUserWorking, subjectState } from "../../store";
import tokenService from "../../services/token";
import { ActivityIndicator } from "react-native-paper";

const _other = [
  {
    title: "Rating",
    icon: <AntDesign name="star" size={24} color={colors.text} />,
  },
  {
    title: "Update document",
    icon: <Ionicons name="document-text" size={24} color={colors.text} />,
  },
  {
    title: "Terms of cooperation",
    icon: <Ionicons name="ios-person" size={24} color={colors.text} />,
  },
];

export const Profile = ({ navigation }) => {
  const [_user, _setUser] = useState(null);
  const [_loading, _setLoading] = useState(false);
  const isFocused = useIsFocused();
  const isUserWorkingState = useRecoilValue(isUserWorking);
  const setIsUserWorking = useResetRecoilState(isUserWorking);
  const subject = useRecoilValue(subjectState);

  const _loadProfile = async () => {
    const res = await userService.getProfile();
    if (res && res.StatusCode === 200) {
      _setUser(res.Data);
      await AsyncStorage.setItem("User", JSON.stringify(res?.Data));
    }
  };

  useEffect(() => {
    _loadProfile(true);
  }, []);

  useEffect(() => {
    _loadProfile(false);
  }, [isFocused]);

  const _handleLogout = async () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          _setLoading(true);
          const res = await userService.logout();
          if (res && res.StatusCode === 200) {
            if (isUserWorkingState) {
              setIsUserWorking(false);
              subject?.complete();
              clearInterval(myInterval); // myInterval from home screen when working (send location)
              console.log("🚀 ~ Interval ~ Loug out", myInterval);
            }
            await newConnection.invoke("Logout"); // newConnection from home screen (chat)
            tokenService.removeToken();
            userService.removeUser();
            setTimeout(() => {
              navigation.navigate("WelCome");
              _setLoading(false);
              console.log("🚀 ~ LOG OUT");
            }, 1000);
          } else {
            _setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, position: "relative" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <HeaderBack
            title="Home"
            style={{ color: colors.white }}
            iconColor={colors.white}
            navigation={navigation}
          />
          <View style={styles.wrapperUser}>
            <View style={styles.boxUser}>
              <View>
                <Avatar
                  source={{ uri: _user?.AvatarUrl }}
                  style={styles.avatar}
                />
              </View>
              <View>
                <Text style={styles.textName}>{_user?.Name}</Text>
                <Text style={styles.textOther}>{_user?.PhoneNumber}</Text>
                <Text style={styles.textOther}>{_user?.Gmail}</Text>
                <Text style={styles.textOther}>
                  {_user?.Vehicle?.LicensePlate}
                </Text>
                <Text style={styles.textOther}>{_user?.Vehicle?.Name}</Text>
                <Text style={styles.textOther}>{_user?.Vehicle?.Type}</Text>
              </View>
              <View style={{ width: 20, height: 150 }}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Feather
                    name="edit"
                    size={20}
                    color={colors.text}
                    style={{ position: "absolute", top: 0, left: 0 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* driver setting */}

          <View style={styles.driverSetting}>
            <TouchableOpacity
              style={styles.wapperDriverSetting}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("DriverSetting")}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="briefcase" size={24} color={colors.text} />
                <Text style={styles.textTab}>Manage your route</Text>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Title
            title="Other"
            level="h4"
            style={{ marginTop: 20, marginLeft: 20 }}
          />
          <View style={styles.wapperOther}>
            <View style={styles.boxOther}>
              {_other.map((item, index) => (
                <View key={index}>
                  <View
                    style={{
                      borderTopLeftRadius: index === 0 ? 15 : 0,
                      borderTopRightRadius: index === 0 ? 15 : 0,
                      borderBottomLeftRadius:
                        index === _other.length - 1 ? 15 : 0,
                      borderBottomRightRadius:
                        index === _other.length - 1 ? 15 : 0,
                      backgroundColor: "#fff",
                      height: 60,
                      width: appTheme.WIDTH - 40,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.tabItem}
                      activeOpacity={0.7}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {item.icon}
                        <Text style={styles.textItem}>{item.title}</Text>
                      </View>
                      <Entypo name="chevron-right" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  {index !== _other.length - 1 && (
                    <View style={styles.lineBreak} />
                  )}
                </View>
              ))}
            </View>
          </View>
          {/* logout */}
          <View style={styles.wrapperLogout}>
            <TouchableOpacity
              style={styles.boxLogout}
              activeOpacity={0.7}
              onPress={_handleLogout}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="log-out" size={24} color={colors.white} />
                <Text style={styles.textLogout}>Log Out</Text>
              </View>
              {_loading && (
                <ActivityIndicator
                  style={{ position: "absolute", right: 20 }}
                  size={24}
                  color={colors.white}
                />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.bg}></View>
      </SafeAreaView>
    </>
  );
};
