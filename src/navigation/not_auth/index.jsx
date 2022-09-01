import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, SignUp, LoginDetail, OTP } from "../../features";

const Stack = createNativeStackNavigator();

export const NotAuth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
