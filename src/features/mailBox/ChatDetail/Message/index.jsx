import { Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { colors } from "../../../../constants";
import { styles } from "./style";

export const Message = ({ _listChat }) => {
  return (
    <>
      {_listChat.map((item, index) => (
        <View key={index}>
          {item.isDriver && (
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginLeft: 70,
                }}
              >
                <View style={styles.boxUser}>
                  <Text style={styles.textUser}>{item.message}</Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text
                  style={{ marginLeft: 10, color: colors.gray, marginTop: 5 }}
                >
                  {moment(item.date).format("DD MMM HH:mm A")}
                </Text>
              </View>
            </View>
          )}
          {/* user */}
          {!item.isDriver && (
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <View style={styles.boxDriver}>
                <Text style={styles.textDriver}>{item.message}</Text>
              </View>
              <Text
                style={{ marginLeft: 10, color: colors.gray, marginTop: 5 }}
              >
                {moment(item.date).format("DD MMM HH:mm A")}
              </Text>
            </View>
          )}
        </View>
      ))}
    </>
  );
};
