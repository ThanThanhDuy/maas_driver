import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderBack } from "../../components";
import { appTheme, colors, fontSize } from "../../constants";
import { styles } from "./style";
import { useRecoilValue } from "recoil";
import { routeSelected } from "../../store";
import moment from "moment";
import { getDistance } from "../../utils/getDistance";
import { FORMAT } from "../../constants/format";

export const DetailRoute = ({ navigation, route }) => {
  const [_fromScreen, _setFromScreen] = useState("");
  const routeSelectedState = useRecoilValue(routeSelected);

  useEffect(() => {
    const fromScreen = route.params.fromScreen;
    _setFromScreen(fromScreen);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        style={{ color: colors.text }}
        iconColor={colors.text}
        navigation={navigation}
        title={_fromScreen}
      />

      {/* list station */}
      <FlatList
        ListHeaderComponent={() => (
          <View style={{ width: appTheme.WIDTH - 40 }}>
            {_fromScreen === "Settings" && (
              <>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      width: (appTheme.WIDTH - 40) * 0.3,
                    }}
                  >
                    <Text style={{ marginBottom: 10, color: colors.primary }}>
                      Start from
                    </Text>
                    <Text>
                      {moment(
                        moment(routeSelectedState?.StartAt, "MM/DD/YYYY")
                      ).format(FORMAT.DATE)}
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
                  <View
                    style={{
                      alignItems: "center",
                      width: (appTheme.WIDTH - 40) * 0.4,
                    }}
                  >
                    <Text style={{ marginBottom: 10, color: colors.primary }}>
                      End at
                    </Text>
                    <Text>
                      {moment(
                        moment(routeSelectedState?.EndAt, "MM/DD/YYYY")
                      ).format(FORMAT.DATE)}
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
                  <View
                    style={{
                      alignItems: "center",
                      width: (appTheme.WIDTH - 40) * 0.3,
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={{ marginBottom: 10, color: colors.primary }}>
                      Distance
                    </Text>
                    <Text>{routeSelectedState?.Distance}12</Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    width: appTheme.WIDTH - 40,
                    backgroundColor: "#ccc",
                    marginTop: 10,
                  }}
                ></View>
              </>
            )}
            {/* */}

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {_fromScreen === "Settings" ? (
                <View
                  style={{
                    alignItems: "center",
                    width: (appTheme.WIDTH - 40) * 0.3,
                  }}
                >
                  <Text style={{ marginBottom: 10, color: colors.primary }}>
                    Time Start
                  </Text>
                  <Text>{routeSelectedState?.StartTime}</Text>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    width: (appTheme.WIDTH - 40) * 0.3,
                  }}
                >
                  <Text style={{ marginBottom: 10, color: colors.primary }}>
                    Distance
                  </Text>
                  <Text>{getDistance(routeSelectedState?.Distance)}</Text>
                </View>
              )}
              <View
                style={{
                  height: 40,
                  width: 1,
                  backgroundColor: "#ccc",
                  margin: 0,
                }}
              ></View>
              <View
                style={{
                  alignItems: "center",
                  width: (appTheme.WIDTH - 40) * 0.4,
                }}
              >
                <Text style={{ marginBottom: 10, color: colors.primary }}>
                  {_fromScreen === "Settings"
                    ? "Estimate finish at"
                    : "Estimate finish in"}
                </Text>
                <Text>
                  {_fromScreen === "Settings"
                    ? routeSelectedState?.EndTime
                    : `${Math.floor(routeSelectedState.Duration / 60)} minutes`}
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
              <View
                style={{
                  alignItems: "center",
                  width: (appTheme.WIDTH - 40) * 0.3,
                }}
                activeOpacity={0.7}
              >
                <Text style={{ marginBottom: 10, color: colors.primary }}>
                  Station
                </Text>
                <Text>{routeSelectedState?.Stations.length}</Text>
              </View>
            </View>
          </View>
        )}
        data={routeSelectedState?.Stations}
        style={{ paddingHorizontal: 20 }}
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 10,
              marginBottom: 20,

              borderRadius: 8,
              paddingVertical: 15,
              paddingHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "Roboto_500",
                    fontSize: fontSize.large,
                    color: colors.orange,
                  }}
                >
                  {index + 1}
                </Text>
              </View>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{ fontFamily: "Roboto_400", fontSize: fontSize.large }}
              >
                {item.Name}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_400",
                  fontSize: fontSize.regular,
                  marginTop: 5,
                }}
              >
                {item.Address}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
