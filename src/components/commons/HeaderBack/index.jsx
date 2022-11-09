import React from "react";
import { View, Linking, TouchableOpacity, Text } from "react-native";
import { Title } from "../Title";
import { ArrowButton } from "../ArrowButton";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { Avatar } from "../Avatar";
import { colors } from "../../../constants";

export const HeaderBack = props => {
  const {
    title = "",
    navigation,
    avatar = null,
    style = {},
    iconColor = colors.text,
    phone = "",
    isRefresh = false,
    isWarning = false,
    onRefresh = () => {},
  } = props;

  const callNumber = () => {
    if (phone) {
      let phoneNumber = `tel:${phone}`;
      Linking.openURL(phoneNumber);
    }
  };

  const handleRefresh = () => {
    onRefresh();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <ArrowButton
          onPress={() => {
            navigation.goBack();
          }}
          size={28}
          color={iconColor}
        />
        {avatar && (
          <Avatar
            source={avatar}
            style={{
              width: 35,
              height: 35,
              marginLeft: 20,
              borderRadius: 17,
            }}
          />
        )}
        <Title
          style={[
            {
              marginLeft: avatar ? 10 : 10,
            },
            style,
          ]}
          level={avatar ? "h4" : "h3"}
          title={title}
        />
      </View>
      {phone.length > 0 && (
        <TouchableOpacity
          onPress={callNumber}
          activeOpacity={0.7}
          style={{
            marginRight: 10,
            backgroundColor: colors.primary,
            borderRadius: 100,
            padding: 8,
          }}
        >
          <FontAwesome5 name="phone-alt" size={18} color="white" />
        </TouchableOpacity>
      )}
      {isWarning && (
        <TouchableOpacity
          onPress={handleRefresh}
          activeOpacity={0.7}
          style={{
            marginRight: 10,
            borderRadius: 100,
            padding: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="warning" size={28} color={colors.organeV2} />
          <Text style={{ marginLeft: 5, fontFamily: "Roboto_500" }}>Help</Text>
        </TouchableOpacity>
      )}
      {isRefresh && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            marginRight: 10,
            borderRadius: 100,
            padding: 8,
            alignItems: "center",
          }}
        >
          <Ionicons name="reload-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};
