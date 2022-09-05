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
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { HeaderBack } from "../../../components";
import { IMAGES } from "../../../assets";
import { colors } from "../../../constants";
import { Message } from "./Message";
import { styles } from "./style";

const _listChat = [
  {
    userId: 1234,
    message: "Hello",
    isDriver: true,
    time: "2022-08-20T12:33:22.791Z",
  },
  {
    userId: 1234,
    message: "Please waiting few minute",
    isDriver: true,
    time: "2022-08-20T12:34:22.791Z",
  },
  {
    userId: 457,
    message: "OK",
    isDriver: false,
    time: "2022-08-20T12:35:22.791Z",
  },
  {
    userId: 1234,
    message: "Hurry up!",
    isDriver: false,
    time: "2022-08-20T12:35:22.791Z",
  },
];

export const ChatDetail = ({ navigation }) => {
  const scrollViewRef = useRef();
  const [_textInput, _setTextInput] = useState("");

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
                  console.log(_textInput);
                  _setTextInput("");
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
