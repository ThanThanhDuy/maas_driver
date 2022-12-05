import AsyncStorage from "@react-native-async-storage/async-storage";
import userApi from "../apis/user";
import { checkToken } from "../firebase/notification";

class UserService {
  async getProfile() {
    const params = {
      FCMToken: await checkToken(),
    };
    // console.log(params);
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

  async getUser() {
    return JSON.parse(await AsyncStorage.getItem("User"));
  }
}

const userService = new UserService();
export default userService;
