import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./style";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";
import { Button, HeaderBack } from "../../components";
import routeService from "../../services/route";

export const DriverSetting = ({ navigation }) => {
  const [_listRouteRoutine, _setListRouteRoutine] = useState();

  useEffect(() => {
    const handleGetRouteRoutine = async () => {
      const response = await routeService.getRouteRoutine();
      if (response.StatusCode === 200) {
        // console.log(response.Data);
        _setListRouteRoutine(response.Data);
      }
    };
    handleGetRouteRoutine();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        style={{ color: colors.text }}
        iconColor={colors.text}
        navigation={navigation}
      />
      <FlatList
        data={_listRouteRoutine}
        renderItem={({ item, index }) => (
          <View style={styles.boxItem}>
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
                <Text numberOfLines={1} style={styles.textAddress}>
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

                <Text style={styles.textAddress} numberOfLines={1}>
                  {item.Stations[item.Stations.length - 1].Name}
                </Text>
              </View>
            </View>
            <View>
              {/* <Text>From: {moment(item.StartAt).format("DD-MM-YYYY")}</Text>
              <Text>From: {moment(item.EndAt).format("DD-MM-YYYY")}</Text>
              <Text>From: {item.StartTime}</Text> */}
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{ backgroundColor: "#fff", marginTop: 20 }}
      />
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
