import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookingReceive, Profile, WelCome } from "../features";
import { NotAuth } from "./not_auth";
import { Auth } from "./auth";
import { ChatDetail } from "../features/mailBox/ChatDetail";
import { History } from "../features/income/history";

const Root = createNativeStackNavigator();

function NavigatorRoot() {
  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="WelCome"
      >
        <Root.Screen
          name="WelCome"
          component={WelCome}
          options={{ gestureEnabled: false }}
        />
        <Root.Screen
          name="NotAuth"
          component={NotAuth}
          options={{ gestureEnabled: false }}
        />
        <Root.Screen
          name="Auth"
          component={Auth}
          options={{ gestureEnabled: false }}
        ></Root.Screen>
        <Root.Screen name="ChatDetail" component={ChatDetail}></Root.Screen>
        <Root.Screen name="Profile" component={Profile}></Root.Screen>
        <Root.Screen name="History" component={History}></Root.Screen>
        <Root.Screen
          name="BookingReceive"
          component={BookingReceive}
        ></Root.Screen>
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default NavigatorRoot;
