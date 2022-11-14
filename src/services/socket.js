import { HubConnectionBuilder } from "@microsoft/signalr";
import { COMMONS } from "../constants";

export const connectSocketChat = accessToken => {
  newConnection = new HubConnectionBuilder()
    .withUrl(`${COMMONS.PREFIX_SOCKET}${COMMONS.SOCKET_CHAT}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
      accessTokenFactory: () => `${accessToken}`,
    })
    .withAutomaticReconnect()
    .build();
  return newConnection;
};

export const connectSocketLocation = accessToken => {
  newConnectionLocation = new HubConnectionBuilder()
    .withUrl(`${COMMONS.PREFIX_SOCKET}${COMMONS.SOCKET_LOCATION}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
      accessTokenFactory: () => `${accessToken}`,
    })
    .withAutomaticReconnect()
    .build();
  return newConnectionLocation;
};
