import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
// import MapboxGL, { Camera, MapView } from "@rnmapbox/maps";
import { Octicons, Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { Avatar, BoxAddress } from "../../components";
import { IMAGES } from "../../assets/index";
import { appTheme, colors, fontSize } from "../../constants";
import createStyle from "./style";
import numberWithCommas from "../../utils/numberWithCommas";
// import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import { HubConnectionBuilder } from "@microsoft/signalr";
import messageRoomsService from "../../services/messageRoom";
import { allMessageState } from "../../store/messageState";

// MapboxGL.setAccessToken(
//   "sk.eyJ1IjoidGhhbnRoYW5oZHV5MDExMSIsImEiOiJjbDhpcndid2swdTRsM3BtcmxhY2FtZTB6In0.8GbSlN9T__VxWcNgxNjxzQ"
// );

export const Home = ({ navigation }) => {
  // const camera = useRef(null);

  const styles = createStyle();
  // long, lat
  // const [coordinatesFrom] = useState([106.8099978721756, 10.84057839865839]);
  // const [coordinatesTo] = useState([106.81035219090674, 10.838027429470513]);
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

  // const handleText = async text => {
  //   _setSearchText(text);
  //   const res = await axios.get(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  //       text
  //     )}.json`,
  //     {
  //       params: {
  //         access_token:
  //           "pk.eyJ1IjoidGhhbnRoYW5oZHV5MDExMSIsImEiOiJjbDhpajA0ODIwaWMzM3FuMDF4YXlqOThpIn0.165QMT1c71E_tPbxkBcNzg",
  //         type: "VN",
  //       },
  //     }
  //   );
  //   if (res !== null) {
  //     console.log(res);
  //   }
  // };

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
    <View style={{ flex: 1, opacity: _isLoading ? 0.5 : 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={region.latitude ? region : null}
        onRegionChange={onRegionChange}
      />
      {/* <MapboxGL.MapView
        style={[StyleSheet.absoluteFill, { flex: 1 }]}
        onRegionDidChange={values => {
          console.log(values);
        }}
      >
        <MapboxGL.Camera
          bounds={{
            ne: coordinatesFrom,
            sw: coordinatesTo,
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 200,
            paddingBottom: 200,
          }}
          animationDuration={false}
          zoomLevel={13}
          // centerCoordinate={coordinatesFrom}
          ref={camera}
        />
        <MapboxGL.MarkerView coordinate={coordinatesFrom}>
          <View
            style={[
              {
                transform: [{ rotate: "-45deg" }],
              },
              {
                width: 24,
                height: 24,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.primary,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomEndRadius: 100,
                marginRight: 10,
              },
            ]}
          >
            <FontAwesome
              style={[
                { marginLeft: 1 },
                {
                  transform: [{ rotate: "45deg" }],
                },
              ]}
              name="arrow-up"
              size={16}
              color="white"
            />
          </View>
        </MapboxGL.MarkerView>
        <MapboxGL.MarkerView coordinate={coordinatesTo}>
          <View
            style={[
              {
                transform: [{ rotate: "-45deg" }],
              },
              {
                width: 24,
                height: 24,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.orange,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomEndRadius: 100,
                marginRight: 10,
              },
            ]}
          >
            <Entypo
              style={[
                { marginLeft: 1 },
                {
                  transform: [{ rotate: "45deg" }],
                },
              ]}
              name="dot-single"
              size={24}
              color="white"
            />
          </View>
        </MapboxGL.MarkerView> */}
      {/* <MapboxGL.ShapeSource id="line1" shape={route}>
          <MapboxGL.LineLayer
            id="routeFill"
            style={{
              lineColor: "#ff8109",
              lineWidth: 3.2,
              // lineCap: MapboxGL.LineJoin.Round,
              lineOpacity: 1.84,
            }}
          />
        </MapboxGL.ShapeSource> */}
      {/* </MapboxGL.MapView> */}
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
              <Ionicons
                name="power"
                size={32}
                color={_isWorking ? colors.white : colors.text}
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {_isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
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
