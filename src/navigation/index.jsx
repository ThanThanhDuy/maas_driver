import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelCome } from "../features";
import { NotAuth } from "./not_auth";
import { Auth } from "./auth";

const Root = createNativeStackNavigator();

function NavigatorRoot() {
  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Auth"
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
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default NavigatorRoot;
