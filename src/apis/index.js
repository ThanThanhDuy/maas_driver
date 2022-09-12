import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";

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
  error => {
    throw error.response.data;
  }
);
export default axiosClient;
