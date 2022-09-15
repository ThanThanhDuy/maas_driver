import {
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { HeaderBack } from "../../../components";
import { IMAGES } from "../../../assets";
import { colors } from "../../../constants";
import { Message } from "./Message";
import { styles } from "./style";
import messageService from "../../../services/message";
import { indexMessageState, messageState } from "../../../store";
import messageRoomsService from "../../../services/messageRoom";

export const ChatDetail = ({ navigation }) => {
  const [_textInput, _setTextInput] = useState("");
  const [_listChat, _setListChat] = useState([]);
  const [_phone, _setPhone] = useState("");
  const [_avatar, _setAvatar] = useState(null);
  const [_nameBooker, _setNameBooker] = useState(null);
  const messageValue = useRecoilValue(messageState);
  const indexMessage = useRecoilValue(indexMessageState);
  const setMessageValue = useSetRecoilState(messageState);

  const handleRenderMessage = messageValue => {
    let listMessage = [];
    let userCodeDriver;
    for (const item of messageValue.Users) {
      if (item.RoleName === "DRIVER") {
        userCodeDriver = item.Code;
      }
    }
    for (const item of messageValue.Messages) {
      listMessage.push({
        userCode: item.UserCode,
        message: item.Content,
        isDriver: item.UserCode === userCodeDriver ? true : false,
        time: item.CreatedAt,
      });
    }
    _setListChat(listMessage.reverse());
  };

  useEffect(() => {
    handleRenderMessage(messageValue);
    for (const user of messageValue.Users) {
      if (user.RoleName === "BOOKER") {
        _setAvatar(user.AvatarUrl);
        _setNameBooker(user.Name);
        _setPhone(user?.PhoneNumber.replace("+84", "0"));
      }
    }
  }, [messageValue]);

  const sendMessage = async message => {
    if (message.trim() !== "") {
      let RoomCode = messageValue.Code;
      const res = await messageService.sendMessage(RoomCode, message.trim());
      _setTextInput("");
      const response = await messageRoomsService.getAllMessageRooms();
      if (response && response.StatusCode === 200) {
        setMessageValue(response?.Data[indexMessage]);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <HeaderBack
        navigation={navigation}
        title={_nameBooker}
        avatar={{ uri: _avatar }}
        phone={_phone}
      />
      <View
        style={{
          height: 0.5,
          backgroundColor: colors.gray,
          borderRadius: 100,
          marginTop: 10,
        }}
      ></View>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <FlatList
              data={_listChat}
              renderItem={({ item, index }) => (
                <Message item={item} index={index} />
              )}
              keyExtractor={(item, index) => index}
              inverted={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ marginHorizontal: 5 }}
            />
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  console.log(_textInput);
                  _setTextInput("");
                }}
                value={_textInput}
                onChange={event => _setTextInput(event.nativeEvent.text)}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ marginLeft: 10 }}
                onPress={() => {
                  Keyboard.dismiss();
                  sendMessage(_textInput);
                }}
              >
                <Ionicons name="ios-send" size={28} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
