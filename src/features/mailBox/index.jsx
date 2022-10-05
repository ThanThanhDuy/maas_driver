import { View, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { colors } from "../../constants";
import { Title } from "../../components";
import { ActionBox } from "./ActionsBox";
import { NoChat } from "./NoChat";
import { Chat } from "./Chat";
import messageRoomsService from "../../services/messageRoom";
import { indexMessageState, messageState } from "../../store";
import { allMessageState } from "../../store/messageState";

export const MailBox = ({ navigation }) => {
  const [_isNoChat, _setIsNoChat] = useState(null);
  const [_listChat, _setListChat] = useState([]);
  const [_isLoading, _setIsLoading] = useState(false);
  const [_listChatAll, _setListChatAll] = useState([]);
  const _setMessageState = useSetRecoilState(messageState);
  const _seIndexMessageState = useSetRecoilState(indexMessageState);
  const _indexMessageState = useRecoilValue(indexMessageState);
  const _allMessage = useRecoilValue(allMessageState);

  const handleMessage = async response => {
    if (
      response &&
      response.StatusCode === 200 &&
      response?.Data &&
      response?.Data?.length > 0
    ) {
      _setIsNoChat(false);
      _setMessageState(response.Data[_indexMessageState]);
      let listChatRes = response.Data;
      _setListChatAll(response.Data);
      let listChat = [];
      for (let i = 0; i < listChatRes.length; i++) {
        const userChat = listChatRes[i].Users;
        let avatar;
        let userNameBooker;
        for (const user of userChat) {
          if (user.RoleName === "BOOKER") {
            avatar = user.AvatarUrl;
            userNameBooker = user.Name;
            userCodeBooker = user.Code;
          }
        }
        const messages = listChatRes[i].Messages;
        const roomCode = listChatRes[i].Code;
        // console.log(roomCode);
        listChat.push({
          avatar,
          nameBooker: userNameBooker,
          lastedText:
            messages.length > 0 ? messages[messages.length - 1].Content : "",
          lastedTime:
            messages.length > 0 ? messages[messages.length - 1].CreatedAt : "",
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
    _setIsLoading(true);
    if (_allMessage) {
      handleMessage(_allMessage);
    } else {
      let getMessage = (async function get() {
        const response = await messageRoomsService.getAllMessageRooms();
        handleMessage(response);
      })();
    }
  }, [_allMessage]);

  const _handleSelectChatBox = index => {
    _seIndexMessageState(index);
    _setMessageState(_listChatAll[index]);
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
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};
