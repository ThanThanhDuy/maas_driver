import messaging from "@react-native-firebase/messaging";
import { showMessage } from "react-native-flash-message";

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
  console.log("get token");
};

export const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  return fcmToken;
};

export const notificationListener = () => {
  console.log("khoaoiw");
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage
        );
      }
    });

  messaging().onMessage(async (remoteMessage) => {
    showMessage({
      message: remoteMessage.notification.title,
      description: remoteMessage.notification.body,
      type: "success",
    });
  });
};
