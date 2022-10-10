import { Animated, Dimensions, View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon, TabBarLabel } from "../../components";
import { NAVIGATION_BOTTOM } from "../../constants/navigation";
import { colors } from "../../constants";
import createStyle from "./style";
import { useRecoilState } from "recoil";
import { tabSelected } from "../../store/navigation";

const Tab = createBottomTabNavigator();

export const Auth = () => {
  const [_tabSelected, _setTabSelected] = useRecoilState(tabSelected);

  const getWidth = () => {
    let width = Dimensions.get("window").width;
    return width / NAVIGATION_BOTTOM.length;
  };

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = NAVIGATION_BOTTOM.findIndex(
      item => item.nameNavigation === _tabSelected
    );
    Animated.spring(tabOffsetValue, {
      toValue: getWidth() * index,
      useNativeDriver: true,
    }).start();
  }, [_tabSelected]);

  const styles = createStyle();

  return (
    <>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        })}
      >
        {NAVIGATION_BOTTOM.map((nav, index) => (
          <Tab.Screen
            key={index}
            name={nav.nameNavigation}
            component={nav.component}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <TabBarIcon
                    isFocused={
                      nav.nameNavigation === _tabSelected ? true : false
                    }
                    name={nav.options.icon.name}
                    colorActive={nav.options.icon.colorActiveIcon}
                    colorInActive={nav.options.icon.colorInActiveIcon}
                    size={nav.options.icon.size}
                  />
                );
              },
              tabBarLabel: ({ focused }) => (
                <TabBarLabel
                  isFocused={nav.nameNavigation === _tabSelected ? true : false}
                  label={nav.options.label.name}
                  colorActiveText={nav.options.label.colorActiveText}
                  colorInActiveText={nav.options.label.colorInActiveText}
                  fontFamilyActive={nav.options.label.fontFamilyActive}
                  fontFamilyInActive={nav.options.label.fontFamilyInActive}
                  fontSize={nav.options.label.fontSize}
                />
              ),
            }}
            listeners={{
              tabPress: e => {
                _setTabSelected(e.target.split("-")[0]);
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * index,
                  useNativeDriver: true,
                }).start();
              },
            }}
          />
        ))}
      </Tab.Navigator>
      <Animated.View
        style={{
          height: 3,
          marginHorizontal: 10,
          position: "absolute",
          bottom: 82,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          width: getWidth() - 20,
          backgroundColor: colors.primary,
          transform: [
            {
              translateX: tabOffsetValue,
            },
          ],
        }}
      />
    </>
  );
};
