import axiosClient from ".";

class DriverApi {
  PREFIX = "drivers/";
  async login(params) {
    const url = `${this.PREFIX}gmail/login`;
    return await axiosClient.post(url, params);
  }
}

const driverApi = new DriverApi();
export default driverApi;
