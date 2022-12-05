import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";
import * as RootNavigation from "../navigation/rootNavigation";
import tokenService from "../services/token";
import userService from "../services/user";
//config
const axiosClient = axios.create({
  baseURL:
    "http://vigo-api.eba-2vp2ppm2.ap-southeast-1.elasticbeanstalk.com/api/v1/",
  headers: {
    "content-type": "application/json",
    "Content-Type": "multipart/form-data",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const localAccessToken = await AsyncStorage.getItem("AccessToken");
  if (localAccessToken) {
    const accessToken = JSON.parse(localAccessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
    // console.log(`Bearer ${accessToken}`);
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async (error) => {
    if (error.response.data.StatusCode === 401) {
      const currentScreen =
        RootNavigation.navigationRef.current.getCurrentRoute().name;
      const originalConfig = error.config;
      if (currentScreen !== "Login") {
        if (!originalConfig._retry) {
          originalConfig._retry = true;
          try {
            // console.log("REFRESH TOKEN");
            const localAccessToken = await tokenService.getAccessToken();
            const localRefreshToken = await tokenService.getRefreshToken();
            if (localAccessToken) {
              const rs = await axiosClient.post("accounts/refresh-token", {
                AccessToken: localAccessToken,
                RefreshToken: localRefreshToken,
              });
              const { token, refreshToken } = rs.Data;
              tokenService.updateToken(token, refreshToken);
              return axiosClient(originalConfig);
            } else {
              RootNavigation.navigationRef.current.navigate("NotAuth", {
                screen: "Login",
              });
            }
          } catch (_error) {
            if (_error.StatusCode === 400) {
              RootNavigation.navigationRef.current.navigate("NotAuth", {
                screen: "Login",
              });
            }
            throw _error;
          }
        }
      }
    } else if (error.response.data.StatusCode === 403) {
      const currentScreen =
        RootNavigation.navigationRef.current.getCurrentRoute().name;
      if (currentScreen !== "Login") {
        tokenService.removeToken();
        userService.removeUser();
        RootNavigation.navigationRef.current.navigate("NotAuth", {
          screen: "Login",
        });
      } else {
        throw error.response.data;
      }
    } else {
      throw error.response.data;
    }
  }
);
export default axiosClient;
