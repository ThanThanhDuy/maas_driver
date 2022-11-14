import axiosClient from ".";

class UserApi {
  PREFIX = "users/";

  async getProfile(params) {
    const url = `${this.PREFIX}profile`;
    return await axiosClient.post(url, params);
  }

  async logout() {
    const url = `${this.PREFIX}logout`;
    return await axiosClient.post(url);
  }
}

const userApi = new UserApi();
export default userApi;
