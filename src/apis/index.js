import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";
import * as RootNavigation from "../navigation/rootNavigation";
import tokenService from "../services/token";
//config
const axiosClient = axios.create({
  baseURL: "https://vigo-application.herokuapp.com/api/v1/",
  headers: {
    "content-type": "application/json",
    "Content-Type": "multipart/form-data",
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  const localAccessToken = await AsyncStorage.getItem("AccessToken");
  if (localAccessToken) {
    const accessToken = JSON.parse(localAccessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async error => {
    const currentScreen =
      RootNavigation.navigationRef.current.getCurrentRoute().name;
    const originalConfig = error.config;
    if (currentScreen !== "Login" && error.response) {
      if (err.response.data.StatusCode === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          console.log("REFRESH TOKEN");
          const localAccessToken = tokenService.getAccessToken();
          const localRefreshToken = tokenService.getRefreshToken();
          if (localAccessToken) {
            const rs = await instance.post("accounts/refresh-token", {
              AccessToken: localAccessToken,
              RefreshToken: localRefreshToken,
            });

            const { token, refreshToken } = rs.Data;
            tokenService.updateToken(token, refreshToken);
            return instance(originalConfig);
          } else {
            RootNavigation.navigationRef.navigate("Login");
          }
        } catch (_error) {
          throw _error;
        }
      }
    } else {
      throw error.response.data;
    }
  }
);
export default axiosClient;
