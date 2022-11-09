import { View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { colors } from "../../constants";
import { Title } from "../../components";
import { ActionBox } from "./ActionsBox";
import { NoChat } from "./NoChat";
import { Chat } from "./Chat";
import messageRoomsService from "../../services/messageRoom";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadMessageState } from "../../store";
import { useIsFocused } from "@react-navigation/native";

export const MailBox = ({ navigation }) => {
  const [_isNoChat, _setIsNoChat] = useState(null);
  const [_listChat, _setListChat] = useState([]);
  const [_isLoading, _setIsLoading] = useState(false);
  const [_listChatAll, _setListChatAll] = useState([]);

  const loadMessage = useRecoilValue(loadMessageState);

  const isFocused = useIsFocused();

  const handleMessage = async response => {
    if (response && response.StatusCode === 200 && response?.Data) {
      _setIsNoChat(false);
      let listChatRes = response.Data;
      let listChat = [];
      for (let i = 0; i < listChatRes.length; i++) {
        const userChat = listChatRes[i].Users;
        let avatar;
        let userNameBooker;
        const userCurrentLocal = await AsyncStorage.getItem("User");
        const userCurrentObj = JSON.parse(userCurrentLocal);
        for (const user of userChat) {
          if (user.Code !== userCurrentObj.Code) {
            avatar = user.AvatarUrl;
            userNameBooker = user.Name;
            userCodeBooker = user.Code;
            userRoleName = "Booker";
          }
        }
        const messages = listChatRes[i].Messages;
        const roomCode = listChatRes[i].Code;
        listChat.push({
          avatar,
          roomCode,
          roomType: listChatRes[i].Type,
          nameBooker: userNameBooker,
          lastedText:
            messages.length > 0 ? messages[messages.length - 1].Content : "",
          lastedTime:
            messages.length > 0 ? messages[messages.length - 1].Time : "",
          isRead: false,
        });
      }
      _setListChat(listChat);
      _setIsLoading(false);
    } else {
      _setIsNoChat(true);
      _setIsLoading(false);
    }
  };

  useEffect(() => {
    let getMessage = (async function get() {
      const response = await messageRoomsService.getMessageRooms();
      handleMessage(response);
    })();
  }, [loadMessage]);

  useEffect(() => {
    _setIsLoading(true);
    let getMessage = (async function get() {
      const response = await messageRoomsService.getMessageRooms();
      handleMessage(response);
    })();
  }, [isFocused]);

  const _handleSelectChatBox = (roomType, roomCode) => {
    navigation.navigate("ChatDetail", {
      roomCode,
      roomType,
    });
  };

  return (
    <SafeAreaView style={{ opacity: _isLoading ? 0.5 : 1 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingLeft: 10,
          paddingVertical: 10,
        }}
      >
        <Title level="h2" title="MailBox" />
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
      {_isNoChat ? (
        <NoChat />
      ) : (
        <Chat
          navigation={navigation}
          _listChat={_listChat}
          _handleSelectChatBox={_handleSelectChatBox}
        />
      )}
      {_isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};
