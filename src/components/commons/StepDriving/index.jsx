import { Text, View, TouchableOpacity, Linking } from "react-native";
import React from "react";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { colors } from "../../../constants";
import { styles } from "./style";

export const StepDriving = ({ step, index, maxLength }) => {
  const callNumber = phone => {
    if (phone) {
      let phoneNumber = `tel:${phone}`;
      Linking.openURL(phoneNumber);
    }
  };

  return (
    <View>
      {step?.StationPosition === "start" ? (
        <View style={{ marginBottom: 10 }}>
          <View style={styles.containerAddress}>
            <View style={styles.boxInline}>
              <View style={styles.boxIconFrom}>
                <FontAwesome
                  style={{ marginLeft: 1 }}
                  name="arrow-up"
                  size={10}
                  color="white"
                />
              </View>
              <View>
                <Text style={styles.textTitle}>{step.StationName}</Text>
                <Text style={styles.textAddress}>{step.StationAddress}</Text>
              </View>
            </View>
          </View>
          <View style={styles.boxUser}>
            <View style={styles.boxInline}>
              <Text style={styles.textUser}>{step.UserName}</Text>
            </View>
            <View style={styles.boxInline}>
              <TouchableOpacity
                onPress={() => callNumber(step.PhoneNumber)}
                activeOpacity={0.7}
                style={{ marginRight: 15 }}
              >
                <FontAwesome5
                  name="phone-alt"
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ borderRadius: 100 }}
              >
                <Ionicons
                  name="chatbox-ellipses"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          {index !== maxLength && <View style={styles.lineBreak}></View>}
        </View>
      ) : (
        <View style={{ marginBottom: 10 }}>
          <View style={styles.containerAddress}>
            <View style={styles.boxInline}>
              <View style={styles.boxIconTo}>
                <Entypo
                  style={styles.iconTo}
                  name="dot-single"
                  size={28}
                  color="white"
                />
              </View>
              <View>
                <Text style={styles.textTitle}>{step.StationName}</Text>
                <Text style={styles.textAddress}>{step.StationAddress}</Text>
              </View>
            </View>
          </View>
          <View style={styles.boxUser}>
            <View style={styles.boxInline}>
              <Text style={styles.textUser}>{step.UserName}</Text>
            </View>
          </View>
          {index !== maxLength && <View style={styles.lineBreak}></View>}
        </View>
      )}
    </View>
  );
};
