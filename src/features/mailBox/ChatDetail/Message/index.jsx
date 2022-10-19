import { Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import moment from "moment";
import { colors } from "../../../../constants";
import { styles } from "./style";

export const Message = ({ item, index }) => {
  const [showTime, setShowTime] = useState(false);
  return (
    <>
      <View key={index}>
        {item?.isDriver && (
          <View
            style={{
              marginBottom: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginLeft: 70,
              }}
            >
              <TouchableOpacity
                style={styles.boxUser}
                onPress={() => {
                  setShowTime(!showTime);
                }}
              >
                <Text style={styles.textUser}>{item.message}</Text>
              </TouchableOpacity>
            </View>
            {showTime && (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text
                  style={{ marginLeft: 10, color: colors.gray, marginTop: 5 }}
                >
                  {moment(moment(item.time, "DD-MM-YYYY HH:mm:ss")).format(
                    "DD MMM HH:mm A"
                  )}
                </Text>
              </View>
            )}
          </View>
        )}
        {/* user */}
        {!item?.isDriver && (
          <View
            style={{
              marginBottom: 8,
            }}
          >
            <TouchableOpacity
              style={styles.boxDriver}
              onPress={() => {
                setShowTime(!showTime);
              }}
            >
              <Text style={styles.textDriver}>{item.message}</Text>
            </TouchableOpacity>
            {showTime && (
              <Text
                style={{ marginLeft: 10, color: colors.gray, marginTop: 5 }}
              >
                {moment(moment(item.time, "DD-MM-YYYY HH:mm:ss")).format(
                  "DD MMM HH:mm A"
                )}
              </Text>
            )}
          </View>
        )}
      </View>
    </>
  );
};
