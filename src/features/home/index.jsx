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
import { appTheme, colors, COMMONS, fontSize } from "../../constants";
import createStyle from "./style";
import numberWithCommas from "../../utils/numberWithCommas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Subject } from "@microsoft/signalr";
import messageRoomsService from "../../services/messageRoom";
import { ActivityIndicator } from "react-native-paper";

import {
  bookingSelected,
  currentLocation,
  isUserWorking,
  loadMessageState,
  subjectState,
} from "../../store";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";
import StarRating from "react-native-star-rating-widget";
import scheduleService from "../../services/Schedule";
import moment from "moment";
import { FORMAT } from "../../constants/format";
import userService from "../../services/user";
import {
  connectSocketChat,
  connectSocketLocation,
} from "../../services/socket";

export const Home = ({ navigation }) => {
  const styles = createStyle();
  const [_searchText, _setSearchText] = useState("");
  const [region, setRegion] = useState({});
  const [_isWorking, _setIsWorking] = useState(false);
  const [_isLoading, _setIsLoading] = useState(false);
  const _setLoadMessage = useSetRecoilState(loadMessageState);
  const [subject, setSubject] = useRecoilState(subjectState);
  const [_user, _setUser] = useState(undefined);
  const [_nextTrip, _setNextTrip] = useState(undefined);
  const [_loadingTrip, _setLoadingTrip] = useState(false);
  const _setBookingSelected = useSetRecoilState(bookingSelected);
  const _setIsUserWorking = useSetRecoilState(isUserWorking);
  const isUserWorkingState = useRecoilValue(isUserWorking);
  const isFocused = useIsFocused();
  const [location, setLocation] = useRecoilState(currentLocation);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("denied");
        return;
      } else {
        let locationTmp = await Location.getCurrentPositionAsync({});
        let regionTmp = {
          latitudeDelta: 0.01793054891924406,
          longitudeDelta: 0.009999999999990905,
          latitude: locationTmp.coords.latitude,
          longitude: locationTmp.coords.longitude,
        };
        setRegion(regionTmp);
      }
    })();
    _handleConnect();
    handleNextTrip(true);
    _loadProfile();
  }, []);

  const handleNextTrip = async (isLoading) => {
    isLoading && _setLoadingTrip(true);
    const respone = await scheduleService.getScheduleByDate(
      1,
      1,
      moment(new Date()).format(FORMAT.DATE),
      moment(new Date()).format(FORMAT.DATE)
    );
    if (respone?.StatusCode === 200) {
      if (respone?.Data?.Items[0]?.RouteRoutines.length > 0) {
        _setNextTrip(respone.Data.Items[0].RouteRoutines[0]);
      } else {
        _setNextTrip(undefined);
      }
    }
    isLoading && _setLoadingTrip(false);
  };

  useEffect(() => {
    handleNextTrip(false);
    if (isUserWorkingState) {
      _setIsWorking(isUserWorkingState);
    }
    if (location?.latitude) {
      let regionTmp = {
        latitudeDelta: 0.01793054891924406,
        longitudeDelta: 0.009999999999990905,
        latitude: location?.latitude,
        longitude: location?.longitude,
      };
      setRegion(regionTmp);
    }
    _loadProfile();
  }, [isFocused]);

  const _loadProfile = async () => {
    const res = await userService.getProfile();
    console.log(res);
    if (res && res.StatusCode === 200) {
      _setUser(res.Data);
      // console.log(_user)
      await AsyncStorage.setItem("User", JSON.stringify(res?.Data));
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
          newConnectionLocation = connectSocketLocation(accessToken);
          await newConnectionLocation.start();
          try {
            const _subject = new Subject();
            await newConnectionLocation.send("StreamGps", _subject);
            setSubject(_subject);
            (async () => {
              let _location = await Location.getCurrentPositionAsync({});
              const coordinates = {
                Latitude: _location.coords.latitude,
                Longitude: _location.coords.longitude,
              };
              _subject.next(coordinates);
            })();
            myInterval = setInterval(async () => {
              let _location = await Location.getCurrentPositionAsync({});
              const coordinates = {
                Latitude: _location.coords.latitude,
                Longitude: _location.coords.longitude,
              };
              let regionTmp = {
                latitudeDelta: 0.01793054891924406,
                longitudeDelta: 0.009999999999990905,
                latitude: _location.coords.latitude,
                longitude: _location.coords.longitude,
              };
              setLocation(regionTmp);
              setRegion(regionTmp);
              console.log("🚀 ~ Send Location ~ Home");
              _subject.next(coordinates);
            }, COMMONS.TIME_SEND_LOCATION);
            console.log("🚀 ~ Interval ~ Home", myInterval);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("faild access token");
        }
        setTimeout(() => {
          _setIsWorking(!_isWorking);
          _setIsUserWorking(!_isWorking);
          _setIsLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          subject?.complete();
          clearInterval(myInterval);
          _setIsWorking(!_isWorking);
          _setIsUserWorking(!_isWorking);
          _setIsLoading(false);
        }, 1000);
      }
    }
  };

  const _handleConnect = async () => {
    const localAccessToken = await AsyncStorage.getItem("AccessToken");
    if (localAccessToken) {
      const accessToken = JSON.parse(localAccessToken);
      newConnection = connectSocketChat(accessToken);
      await newConnection.start();
      try {
        await newConnection.invoke("Login");

        newConnection.on("Connected", (mess) => {
          console.log("Connected chat: ", mess);
        });

        newConnection.on("Message", async (mess) => {
          console.log("receive mess");
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

  const handleSelect = () => {
    _setBookingSelected({
      ..._nextTrip,
      Date: moment(new Date()).format(FORMAT.DATE),
      Time: _nextTrip?.Schedules[0].Time,
    });
    navigation.navigate("BookingReceive");
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={region?.latitude ? region : null}
        showsUserLocation={true}
      >
        {/* {region?.latitude && <Marker coordinate={region} />} */}
      </MapView>
      <SafeAreaView style={{ flex: _isLoading ? 1 : 0 }}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Profile")}
          >
            <Avatar source={{ uri: _user?.AvatarUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.wrapperContent}>
            <Text style={styles.text}>
              {isUserWorkingState ? "Working" : "Not working"}
            </Text>
            <Octicons
              name="dot-fill"
              size={24}
              color={isUserWorkingState ? colors.primary : colors.red}
            />
          </View>
          <View>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: isUserWorkingState
                    ? colors.primary
                    : colors.white,
                },
                styles.buttonTurn,
              ]}
              activeOpacity={0.7}
              onPress={_handleWorking}
            >
              {_isLoading ? (
                <ActivityIndicator
                  size={34}
                  color={isUserWorkingState ? colors.white : colors.primary}
                />
              ) : (
                <Ionicons
                  name="power"
                  size={32}
                  color={isUserWorkingState ? colors.white : colors.text}
                  style={{ paddingLeft: 2.4 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.wrappJourney}>
        {_loadingTrip ? (
          <View style={styles.boxRating}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : _nextTrip ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleSelect()}>
            <BoxAddress
              styleBox={styles.boxAddress}
              from={_nextTrip?.Steps[0].StationName}
              to={_nextTrip?.Steps[_nextTrip?.Steps.length - 1].StationName}
            />
          </TouchableOpacity>
        ) : (
          <View style={[styles.boxRating, { justifyContent: "space-between" }]}>
            <StarRating
              rating={_user?.Rating}
              onChange={() => {}}
              maxStars={5}
              style={{ marginTop: 2 }}
              starStyle={{ marginRight: -7 }}
            />
          </View>
        )}
        <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
          <Text style={styles.textWallet}>Account ViWallet</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textMoney}>
              {numberWithCommas(
                parseFloat(_user?.Wallet?.Balance ? _user?.Wallet?.Balance : 0)
              )}
            </Text>
            <Text style={styles.vnd}>VND</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
