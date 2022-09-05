import React from "react";
import { View } from "react-native";
import { Title } from "../Title";
import { ArrowButton } from "../ArrowButton";
import { styles } from "./style";
import { Avatar } from "../Avatar";

export const HeaderBack = props => {
  const { title = "", navigation, avatar = null } = props;
  return (
    <View style={styles.container}>
      <ArrowButton
        onPress={() => {
          navigation.goBack();
        }}
        size={28}
      />
      {avatar && (
        <Avatar
          source={avatar}
          style={{ width: 35, height: 35, marginLeft: 20 }}
        />
      )}
      <Title
        style={{
          marginLeft: avatar ? 10 : 10,
        }}
        level={avatar ? "h4" : "h3"}
        title={title}
      />
    </View>
  );
};
