import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./style";
import { FontAwesome, Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { appTheme, colors, fontSize } from "../../constants";
import { Button, HeaderBack } from "../../components";
import routeService from "../../services/route";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import { IMAGES } from "../../assets";
import { useSetRecoilState } from "recoil";
import { routeSelected } from "../../store";
import { FORMAT } from "../../constants/format";
import { useIsFocused } from "@react-navigation/native";

export const DriverSetting = ({ navigation }) => {
  const [_listRouteRoutine, _setListRouteRoutine] = useState(null);
  const [_isLoading, _setIsLoading] = useState(false);
  const [_refreshing, _setRefresing] = useState(false);
  const _setRouteSelected = useSetRecoilState(routeSelected);
  const isFocused = useIsFocused();

  useEffect(() => {
    const handleGetRouteRoutine = async () => {
      _setIsLoading(true);
      const response = await routeService.getRouteRoutine();
      if (response.StatusCode === 200 && response.Data.length > 0) {
        _setListRouteRoutine(response.Data);
      }
      _setIsLoading(false);
    };
    handleGetRouteRoutine();
  }, [isFocused]);

  const onRefresh = async () => {
    _setRefresing(true);
    const response = await routeService.getRouteRoutine();
    if (response.StatusCode === 200 && response.Data.length > 0) {
      _setListRouteRoutine(response.Data);
    }
    _setRefresing(false);
  };

  const handleSelect = (item) => {
    _setRouteSelected(item);
    navigation.navigate("DetailRoute", {
      fromScreen: "Settings",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        style={{ color: colors.text }}
        iconColor={colors.text}
        navigation={navigation}
        title="Profile"
      />

      {_isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : _listRouteRoutine ? (
        <>
          <Text
            style={{
              marginTop: 5,
              fontFamily: "Roboto_500",
              fontSize: fontSize.large,
              marginLeft: 15,
              marginBottom: 10,
            }}
          >
            Your registered routes
          </Text>

          <FlatList
            data={_listRouteRoutine}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.boxItem}
                activeOpacity={0.6}
                onPress={() => handleSelect(item)}
              >
                <View>
                  <View style={styles.lineAddress}>
                    <View
                      style={{
                        width: 20,
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome
                        name="circle-o"
                        size={16}
                        color={colors.primary}
                      />
                    </View>
                    <Text numberOfLines={2} style={styles.textAddress}>
                      {item.Stations[0].Name}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 15,
                      borderLeftWidth: 1,
                      marginLeft: 8,
                      borderColor: colors.gray,
                      marginVertical: 3,
                    }}
                  ></View>
                  <View style={styles.lineAddress}>
                    <View
                      style={{
                        width: 20,
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome
                        name="map-marker"
                        size={20}
                        color={colors.orange}
                      />
                    </View>

                    <Text style={styles.textAddress} numberOfLines={2}>
                      {item.Stations[item.Stations.length - 1].Name}
                    </Text>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: appTheme.WIDTH - 30 - 30 - 20,
                      marginHorizontal: 10,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ marginBottom: 10, color: colors.primary }}>
                        Start from
                      </Text>
                      <Text>
                        {moment(moment(item?.StartAt, "MM/DD/YYYY")).format(
                          FORMAT.DATE
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 40,
                        width: 1,
                        backgroundColor: "#ccc",
                        margin: 0,
                      }}
                    ></View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ marginBottom: 10, color: colors.primary }}>
                        End at
                      </Text>
                      <Text>
                        {moment(moment(item?.EndAt, "MM/DD/YYYY")).format(
                          FORMAT.DATE
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 40,
                        width: 1,
                        backgroundColor: "#ccc",
                        margin: 0,
                      }}
                    ></View>
                    <View style={{ alignItems: "center" }} activeOpacity={0.7}>
                      <Text style={{ marginBottom: 10, color: colors.primary }}>
                        Time
                      </Text>
                      <Text>{item.StartTime}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{
              backgroundColor: "#fff",
              paddingTop: 15,
            }}
            style={{ marginBottom: 60 }}
            refreshControl={
              <RefreshControl refreshing={_refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Image style={{ width: 150, height: 150 }} source={IMAGES.earning} />
          <Text
            style={{
              fontFamily: "Roboto_400",
              marginTop: 20,
              fontSize: fontSize.h5,
              marginHorizontal: 25,
              textAlign: "center",
            }}
          >
            Looks like you haven't registered any route yet. Register a route to
            join ViGo
          </Text>
        </View>
      )}
      <View style={styles.boxButton}>
        <Button
          title="Add route"
          width={160}
          iconFront={<Ionicons name="add" size={24} color={colors.white} />}
          onPress={() => navigation.navigate("CreateRouteRoutine")}
        />
      </View>
    </SafeAreaView>
  );
};
