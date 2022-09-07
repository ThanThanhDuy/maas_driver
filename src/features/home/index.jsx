import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Avatar, BoxAddress } from "../../components";
import { IMAGES } from "../../assets/index";
import { appTheme, colors, fontSize } from "../../constants";
import createStyle from "./style";
import numberWithCommas from "../../utils/numberWithCommas";

export const Home = () => {
  const styles = createStyle();

  const [region, setRegion] = useState({
    latitude: 10.841626311529279,
    latitudeDelta: 0.01793054891924406,
    longitude: 106.81133564102572,
    longitudeDelta: 0.009999999999990905,
  });
  const [_isWorking, _setIsWorking] = useState(false);
  const [_isLoading, _setIsLoading] = useState(false);

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

  return (
    <View style={{ flex: 1, opacity: _isLoading ? 0.5 : 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={region.latitude ? region : null}
        onRegionChange={onRegionChange}
      />
      <SafeAreaView style={{ flex: _isLoading ? 1 : 0 }}>
        <View style={styles.container}>
          <Avatar source={IMAGES.banner} style={styles.avatar} />
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
        <View>
          <BoxAddress
            styleBox={styles.boxAddress}
            from="17 Duong D5A, Phuoc Long B5A, Phuoc Long B"
            to="Dai hoc FPT Ho Chi Minh Campus quan 9 thanh pho ho chi minh"
          />
        </View>
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
