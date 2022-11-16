import axiosClient from ".";

class DriverApi {
  PREFIX = "drivers/";

  async login(params) {
    const url = `${this.PREFIX}gmail/login`;
    return await axiosClient.post(url, params);
  }

  async getNotifications(params) {
    const url = `${this.PREFIX}notifications`;
    return await axiosClient.get(url, params);
  }
  async getIncomes(params) {
    const url = `${this.PREFIX}incomes`;
    return await axiosClient.get(url, { params });
  }
}

const driverApi = new DriverApi();
export default driverApi;
