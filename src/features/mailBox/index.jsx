import { View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { colors } from "../../constants";
import { Title } from "../../components";
import { ActionBox } from "./ActionsBox";
import { NoChat } from "./NoChat";
import { Chat } from "./Chat";
import messageRoomsService from "../../services/messageRoom";
import { indexMessageState, messageState } from "../../store";

export const MailBox = ({ navigation }) => {
  const [_isNoChat, _setIsNoChat] = useState(true);
  const [_listChat, _setListChat] = useState([]);
  const [_listChatAll, _setListChatAll] = useState([]);
  const [_connection, _setConnection] = useState();
  const _setMessageState = useSetRecoilState(messageState);
  const _seIndexMessageState = useSetRecoilState(indexMessageState);

  const handleMessage = async () => {
    const response = await messageRoomsService.getAllMessageRooms();
    if (response && response.StatusCode === 200) {
      _setIsNoChat(false);
      _setMessageState(response.Data[0]);
      let listChatRes = response.Data;
      _setListChatAll(response.Data);
      // console.log(listChatRes);
      let listChat = [];
      for (let i = 0; i < listChatRes.length; i++) {
        const userChat = listChatRes[i].Users;
        let avatar;
        let userNameBooker;
        // let userCodeBooker;
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
          lastedText: messages[messages.length - 1].Content,
          lastedTime: messages[messages.length - 1].CreatedAt,
          isRead: false,
        });
      }
      _setListChat(listChat);
      // console.log(listChat);
    }
  };

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

        _setConnection(newConnection);
        await newConnection.start();
        try {
          newConnection.on("Connected", mess => {
            console.log("Connected: ", mess);
          });

          newConnection.on("Message", mess => {
            handleMessage();
          });

          await newConnection.invoke("Login");
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("faild access token");
      }
    };
    handle();

    handleMessage();
  }, []);

  const _handleSelectChatBox = index => {
    _seIndexMessageState(index);
    _setMessageState(_listChatAll[index]);
  };

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
      {_isNoChat ? (
        <NoChat />
      ) : (
        <Chat
          navigation={navigation}
          _listChat={_listChat}
          _handleSelectChatBox={_handleSelectChatBox}
        />
      )}
    </SafeAreaView>
  );
};
