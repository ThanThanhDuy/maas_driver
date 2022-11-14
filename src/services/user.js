import AsyncStorage from "@react-native-async-storage/async-storage";
import userApi from "../apis/user";

class UserService {
  async getProfile(FCMToken = null) {
    const params = {
      FCMToken,
    };

    try {
      var response = await userApi.getProfile(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async logout() {
    try {
      var response = await userApi.logout();
    } catch (error) {
      return error;
    }
    return response;
  }

  async removeUser() {
    await AsyncStorage.removeItem("User");
  }
}

const userService = new UserService();
export default userService;
