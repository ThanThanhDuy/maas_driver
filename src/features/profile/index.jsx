import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Avatar, HeaderBack, Title } from "../../components";
import { appTheme, colors } from "../../constants";
import { IMAGES } from "../../assets";
import { styles } from "./style";

const _other = [
  {
    title: "Rating",
    icon: <AntDesign name="star" size={24} color={colors.text} />,
  },
  {
    title: "Update document",
    icon: <Ionicons name="document-text" size={24} color={colors.text} />,
  },
  {
    title: "Terms of cooperation",
    icon: <Ionicons name="ios-person" size={24} color={colors.text} />,
  },
];

export const Profile = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <HeaderBack
            title="Home"
            style={{ color: colors.white }}
            iconColor={colors.white}
            navigation={navigation}
          />
          <View style={styles.wrapperUser}>
            <View style={styles.boxUser}>
              <View>
                <Avatar source={IMAGES.banner} style={styles.avatar} />
              </View>
              <View>
                <Text style={styles.textName}>Than Thanh Duy</Text>
                <Text style={styles.textOther}>+84 376826328</Text>
                <Text style={styles.textOther}>duyttse140971@fpt.edu.vn</Text>
                <Text style={styles.textOther}>49H1 - 123.45</Text>
              </View>
              <View style={{ width: 20, height: 150 }}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Feather
                    name="edit"
                    size={20}
                    color={colors.text}
                    style={{ position: "absolute", top: 25, left: 0 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* driver setting */}
        </SafeAreaView>
        <View style={styles.driverSetting}>
          <TouchableOpacity
            style={styles.wapperDriverSetting}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("DriverSetting")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="briefcase" size={24} color={colors.text} />
              <Text style={styles.textTab}>Driver settings</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Title
          title="Other"
          level="h4"
          style={{ marginTop: 20, marginLeft: 20 }}
        />
        <View style={styles.wapperOther}>
          <View style={styles.boxOther}>
            {_other.map((item, index) => (
              <View key={index}>
                <View
                  style={{
                    borderTopLeftRadius: index === 0 ? 15 : 0,
                    borderTopRightRadius: index === 0 ? 15 : 0,
                    borderBottomLeftRadius:
                      index === _other.length - 1 ? 15 : 0,
                    borderBottomRightRadius:
                      index === _other.length - 1 ? 15 : 0,
                    backgroundColor: "#fff",
                    height: 60,
                    width: appTheme.WIDTH - 40,
                  }}
                >
                  <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {item.icon}
                      <Text style={styles.textItem}>{item.title}</Text>
                    </View>
                    <Entypo name="chevron-right" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                {index !== _other.length - 1 && (
                  <View style={styles.lineBreak} />
                )}
              </View>
            ))}
          </View>
        </View>
        {/* logout */}
        <View style={styles.wrapperLogout}>
          <TouchableOpacity style={styles.boxLogout} activeOpacity={0.7}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="log-out" size={24} color={colors.white} />
              <Text style={styles.textLogout}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
