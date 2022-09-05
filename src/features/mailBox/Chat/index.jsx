import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import React from "react";
import { Avatar } from "../../../components";
import { IMAGES } from "../../../assets";
import { appTheme, colors } from "../../../constants";
import { styles } from "./style";

const _listChat = [
  {
    avatar: IMAGES.banner,
    nameDriver: "Than Thanh Duy",
    lastedText: "jkahsdkfjahsdklfjhalksdjfhalksjdhfakljsdhfalkjsdhf",
    lastedTime: "2022-08-21T17:33:22.791Z",
    isRead: false,
  },
  {
    avatar: IMAGES.banner,
    nameDriver: "Nguyen Van A",
    lastedText: "jkahsdkfjahsdklfjhalksdjfhalksjdhfakljsdhfalkjsdhf",
    lastedTime: "2022-08-20T12:33:22.791Z",
    isRead: true,
  },
];

export const Chat = ({ navigation }) => {
  return (
    <View style={{ marginLeft: 10, marginTop: 30, marginRight: 10 }}>
      <View>
        {/* item */}
        {_listChat.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChatDetail")}
              activeOpacity={0.7}
              style={{
                marginHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 7,
                paddingHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                marginTop: index !== 0 ? 11 : 0,
              }}
            >
              <Avatar
                source={item.avatar}
                style={{ width: 50, height: 50, borderRadius: 100 }}
              />
              <View style={{ width: appTheme.WIDTH - 135 }}>
                <Text style={styles.nameDriver}>{item.nameDriver}</Text>
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
                      width: appTheme.WIDTH - 210,
                      color: colors.text,
                      opacity: 0.5,
                    }}
                  >
                    {item.lastedText}
                  </Text>
                  {moment(item.lastedTime).isSame(new Date(), "day") && (
                    <Text>{moment(item.lastedTime).format("hh:mm A")}</Text>
                  )}
                  {!moment(item.lastedTime).isSame(new Date(), "day") && (
                    <Text>{moment(item.lastedTime).format("DD MMM")}</Text>
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
