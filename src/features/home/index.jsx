import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { Octicons, Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { Avatar, BoxAddress } from "../../components";
import { IMAGES } from "../../assets/index";
import { appTheme, colors, fontSize } from "../../constants";
import createStyle from "./style";
import numberWithCommas from "../../utils/numberWithCommas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import { HubConnectionBuilder } from "@microsoft/signalr";
import messageRoomsService from "../../services/messageRoom";
import { allMessageState } from "../../store/messageState";
import { ActivityIndicator } from "react-native-paper";

export const Home = ({ navigation }) => {
  const styles = createStyle();
  const [_searchText, _setSearchText] = useState("");
  const [region, setRegion] = useState({
    latitude: 10.841626311529279,
    latitudeDelta: 0.01793054891924406,
    longitude: 106.81133564102572,
    longitudeDelta: 0.009999999999990905,
  });
  const [_isWorking, _setIsWorking] = useState(false);
  const [_isLoading, _setIsLoading] = useState(false);
  const _setAllMessage = useSetRecoilState(allMessageState);

  const onRegionChange = region => {
    console.log(region);
    setRegion({ region });
  };

  const _handleWorking = () => {
    _setIsLoading(true);
    setTimeout(() => {
      _setIsWorking(!_isWorking);
      _setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handle = async () => {
      const localAccessToken = await AsyncStorage.getItem("AccessToken");
      if (localAccessToken) {
        const accessToken = JSON.parse(localAccessToken);
        const newConnection = new HubConnectionBuilder()
          .withUrl("https://vigo-application.herokuapp.com/hubs", {
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
            const response = await messageRoomsService.getAllMessageRooms();
            _setAllMessage(response);
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("faild access token");
      }
    };
    handle();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={region.latitude ? region : null}
        onRegionChange={onRegionChange}
      />
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
