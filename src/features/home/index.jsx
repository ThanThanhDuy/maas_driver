import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Avatar, BoxAddress } from "../../components";
import { IMAGES } from "../../assets/index";
import { colors, COMMONS } from "../../constants";
import createStyle from "./style";
import numberWithCommas from "../../utils/numberWithCommas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { HubConnectionBuilder, Subject } from "@microsoft/signalr";
import messageRoomsService from "../../services/messageRoom";
import { ActivityIndicator } from "react-native-paper";
import { loadMessageState, userState } from "../../store";
import * as Location from "expo-location";

export const Home = ({ navigation }) => {
  const styles = createStyle();
  const [_searchText, _setSearchText] = useState("");
  const [region, setRegion] = useState({});
  const [_isWorking, _setIsWorking] = useState(false);
  const [_isLoading, _setIsLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const _setLoadMessage = useSetRecoilState(loadMessageState);
  const [subject, setSubject] = useState(undefined);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("denied");
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({});
        let regionTmp = {
          latitudeDelta: 0.01793054891924406,
          longitudeDelta: 0.009999999999990905,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setRegion(regionTmp);
      }
    })();
    _handleConnect();
    _loadProfile();
  }, []);

  const _loadProfile = async () => {
    const userStorage = await AsyncStorage.getItem("User");
    if (!user) {
      setUser(userStorage);
    }
  };
  const _handleWorking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Notification", "ViGo needs access to location");
      return;
    } else {
      _setIsLoading(true);
      if (!_isWorking) {
        const localAccessToken = await AsyncStorage.getItem("AccessToken");
        if (localAccessToken) {
          const accessToken = JSON.parse(localAccessToken);
          newConnectionLocation = new HubConnectionBuilder()
            .withUrl(`${COMMONS.PREFIX_SOCKET}${COMMONS.SOCKET_LOCATION}`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
              withCredentials: false,
              accessTokenFactory: () => `${accessToken}`,
            })
            .withAutomaticReconnect()
            .build();
          await newConnectionLocation.start();
          try {
            const _subject = new Subject();
            await newConnectionLocation.send("StreamGps", _subject);
            setSubject(_subject);
            (async () => {
              let location = await Location.getCurrentPositionAsync({});
              const coordinates = {
                Latitude: location.coords.latitude,
                Longitude: location.coords.longitude,
              };
              _subject.next(coordinates);
            })();
            myInterval = setInterval(async () => {
              let location = await Location.getCurrentPositionAsync({});
              const coordinates = {
                Latitude: location.coords.latitude,
                Longitude: location.coords.longitude,
              };
              let regionTmp = {
                latitudeDelta: 0.01793054891924406,
                longitudeDelta: 0.009999999999990905,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              };
              setRegion(regionTmp);
              console.log("send");
              _subject.next(coordinates);
            }, COMMONS.TIME_SEND_LOCATION);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("faild access token");
        }
        setTimeout(() => {
          _setIsWorking(!_isWorking);
          _setIsLoading(false);
        }, 0);
      } else {
        setTimeout(() => {
          subject?.complete();
          clearInterval(myInterval);
          _setIsWorking(!_isWorking);
          _setIsLoading(false);
        }, 1000);
      }
    }
  };

  const _handleConnect = async () => {
    const localAccessToken = await AsyncStorage.getItem("AccessToken");
    if (localAccessToken) {
      const accessToken = JSON.parse(localAccessToken);
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${COMMONS.PREFIX_SOCKET}${COMMONS.SOCKET_CHAT}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
          accessTokenFactory: () => `${accessToken}`,
        })
        .withAutomaticReconnect()
        .build();

      await newConnection.start();
      try {
        await newConnection.invoke("Login");

        newConnection.on("Connected", mess => {
          console.log("Connected: ", mess);
        });

        newConnection.on("Message", async mess => {
          const response = await messageRoomsService.getMessageRooms();
          _setLoadMessage(response?.Data);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("faild access token");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={region?.latitude ? region : null}
      >
        {region?.latitude && <Marker coordinate={region} />}
      </MapView>
      <SafeAreaView style={{ flex: _isLoading ? 1 : 0 }}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Profile")}
          >
            <Avatar source={IMAGES.banner} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.wrapperContent}>
            <Text style={styles.text}>
              {_isWorking ? "Working" : "Not working"}
            </Text>
            <Octicons
              name="dot-fill"
              size={24}
              color={_isWorking ? colors.primary : colors.red}
            />
          </View>
          <View>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: _isWorking ? colors.primary : colors.white,
                },
                styles.buttonTurn,
              ]}
              activeOpacity={0.7}
              onPress={_handleWorking}
            >
              {_isLoading ? (
                <ActivityIndicator
                  size={34}
                  color={_isWorking ? colors.white : colors.primary}
                />
              ) : (
                <Ionicons
                  name="power"
                  size={32}
                  color={_isWorking ? colors.white : colors.text}
                  style={{ paddingLeft: 2.4 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.wrappJourney}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("BookingReceive")}
        >
          <BoxAddress
            styleBox={styles.boxAddress}
            from="Trường đại học FPT"
            to="Trường đại học Nguyễn Tất Thành"
          />
        </TouchableOpacity>
        <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
          <Text style={styles.textWallet}>Account wallet</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textMoney}>{numberWithCommas(247183)}</Text>
            <Text style={styles.vnd}>VND</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
