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
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";
import { HeaderBack } from "../../../components";
import { IMAGES } from "../../../assets";
import { colors } from "../../../constants";
import { Message } from "./Message";
import { styles } from "./style";
import messageService from "../../../services/message";
import messageRoomsService from "../../../services/messageRoom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadMessageState } from "../../../store";

export const ChatDetail = ({ navigation, route }) => {
  const [_textInput, _setTextInput] = useState("");
  const [_listChat, _setListChat] = useState([]);
  const [_phone, _setPhone] = useState("");
  const [_avatar, _setAvatar] = useState(null);
  const [_nameBooker, _setNameBooker] = useState(null);
  const loadMessage = useRecoilValue(loadMessageState);

  const handleRenderMessage = async data => {
    let listMessage = [];
    let userCodeDriver;
    const userCurrentLocal = await AsyncStorage.getItem("User");
    const userCurrentObj = JSON.parse(userCurrentLocal);
    for (const item of data.Users) {
      if (item.Code === userCurrentObj.Code) {
        userCodeDriver = item.Code;
      }
    }
    for (const item of data.Messages) {
      listMessage.push({
        userCode: item.UserCode,
        message: item.Content,
        isDriver: item.UserCode === userCodeDriver ? true : false,
        time: item.Time,
      });
    }
    for (const user of data.Users) {
      if (user.Code !== userCurrentObj.Code) {
        _setAvatar(user.AvatarUrl);
        _setNameBooker(user.Name);
        _setPhone(user?.PhoneNumber.replace("+84", "0"));
      }
    }
    _setListChat(listMessage.reverse());
  };

  useEffect(() => {
    const roomCode = route.params.roomCode;
    const roomType = route.params.roomType;
    console.log(roomType, roomCode);
    let getMessage = (async function get() {
      const response = await messageRoomsService.getMessageRooms(
        roomType,
        roomCode
      );
      if (response && response.StatusCode === 200) {
        await handleRenderMessage(response.Data[0]);
      }
    })();
  }, [loadMessage]);

  const sendMessage = async message => {
    const roomCode = route.params.roomCode;
    const roomType = route.params.roomType;
    if (message.trim() !== "") {
      await messageService.sendMessage(roomCode, message.trim());
      _setTextInput("");
      const response = await messageRoomsService.getMessageRooms(
        roomType,
        roomCode
      );
      if (response && response.StatusCode === 200) {
        await handleRenderMessage(response.Data[0]);
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
