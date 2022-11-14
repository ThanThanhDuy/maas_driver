import AsyncStorage from "@react-native-async-storage/async-storage";

class TokenService {
  async getAccessToken() {
    return await AsyncStorage.getItem("AccessToken");
  }

  async getRefreshToken() {
    return await AsyncStorage.getItem("RefreshToken");
  }

  async updateToken(accessToken, refreshToken) {
    await AsyncStorage.setItem("AccessToken", JSON.stringify(accessToken));
    await AsyncStorage.setItem("RefreshToken", JSON.stringify(refreshToken));
  }

  async removeToken() {
    await AsyncStorage.removeItem("AccessToken");
    await AsyncStorage.removeItem("RefreshToken");
  }
}

const tokenService = new TokenService();
export default tokenService;
