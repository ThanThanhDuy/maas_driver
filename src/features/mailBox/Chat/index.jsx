import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import React from "react";
import { Avatar } from "../../../components";
import { IMAGES } from "../../../assets";
import { appTheme, colors } from "../../../constants";
import { styles } from "./style";
import { FORMAT } from "../../../constants/format";

export const Chat = ({ _listChat, _handleSelectChatBox }) => {
  const handleSelectMessage = (roomType, roomCode) => {
    _handleSelectChatBox(roomType, roomCode);
  };
  return (
    <View style={{ marginLeft: 10, marginTop: 30, marginRight: 10 }}>
      <View>
        {/* item */}
        {_listChat?.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                handleSelectMessage(item.roomType, item.roomCode);
              }}
              activeOpacity={0.7}
              style={{
                marginHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 7,
                paddingRight: 10,
                flexDirection: "row",
                alignItems: "center",
                marginTop: index !== 0 ? 11 : 0,
              }}
            >
              <Avatar
                source={{ uri: item.avatar }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              />
              <View style={{ width: appTheme.WIDTH - 135 }}>
                <Text style={styles.nameDriver}>{item.nameBooker}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      width: appTheme.WIDTH - 170,
                      color: colors.text,
                      opacity: 0.5,
                    }}
                  >
                    {item.lastedText}
                  </Text>
                  {item.lastedTime !== "" &&
                    moment(moment(item.lastedTime, FORMAT.DATE_TIME)).isSame(
                      new Date(),
                      "day"
                    ) && (
                      <Text>
                        {moment(
                          moment(item.lastedTime, FORMAT.DATE_TIME)
                        ).format("HH:mm")}
                      </Text>
                    )}
                  {item.lastedTime !== "" &&
                    !moment(moment(item.lastedTime, FORMAT.DATE_TIME)).isSame(
                      new Date(),
                      "day"
                    ) && (
                      <Text>
                        {moment(
                          moment(item.lastedTime, FORMAT.DATE_TIME)
                        ).format("DD MMM")}
                      </Text>
                    )}
                </View>
              </View>
            </TouchableOpacity>
            {index !== _listChat.length - 1 && (
              <View style={styles.lineBreak}></View>
            )}
          </View>
        ))}
        {/* end item */}
      </View>
    </View>
  );
};
