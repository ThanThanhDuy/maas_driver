import {
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
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
  const scrollViewRef = useRef();
  const [_textInput, _setTextInput] = useState("");
  const [_listChat, _setListChat] = useState([]);
  const [_connection, _setConnection] = useState();
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
        time: item.CreateAt,
      });
    }
    _setListChat(listMessage);
  };

  useEffect(() => {
    handleRenderMessage(messageValue);
  }, [messageValue]);

  const sendMessage = async message => {
    let RoomCode = messageValue.Code;
    const res = await messageService.sendMessage(RoomCode, message);
    const response = await messageRoomsService.getAllMessageRooms();
    if (response && response.StatusCode === 200) {
      setMessageValue(response?.Data[indexMessage]);
      _setTextInput("");
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
        title="Than Thanh Duy"
        avatar={IMAGES.banner}
      />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => {
                scrollViewRef.current.scrollToEnd({ animated: true });
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              style={{
                flex: 1,
                marginBottom: 0,
              }}
            >
              <View style={styles.inner}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    justifyContent: "flex-end",
                  }}
                >
                  <Message _listChat={_listChat} />
                </View>
              </View>
            </ScrollView>
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
