import { View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import { Title } from "../../components";
import { ActionBox } from "./ActionsBox";
import { NoChat } from "./NoChat";
import { Chat } from "./Chat";

export const MailBox = ({ navigation }) => {
  const [_isNoChat, _setIsNoChat] = useState(false);

  return (
    <SafeAreaView>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingLeft: 10,
          paddingVertical: 10,
        }}
      >
        <Title title="MailBox" />
      </View>
      <Title
        title="Quick actions"
        level="h5"
        style={{ marginLeft: 10, marginTop: 10, fontFamily: "Roboto_500" }}
      />
      <ActionBox />
      <Title
        title="Your chats"
        level="h5"
        style={{ marginLeft: 10, marginTop: 20, fontFamily: "Roboto_500" }}
      />
      {_isNoChat ? <NoChat /> : <Chat navigation={navigation} />}
    </SafeAreaView>
  );
};
