import moment from "moment";
import driverApi from "../apis/driver";
import { FORMAT } from "../constants/format";

class DriverService {
  async login(idToken) {
    const params = {
      IdToken: idToken,
    };

    try {
      var response = await driverApi.login(params);
    } catch (error) {
      return error;
    }
    return response;
  }
  async getNotifications(page) {
    const params = {
      Page: page,
      PageSize: 10,
    };

    try {
      var response = await driverApi.getNotifications(params);
    } catch (error) {
      return error;
    }
    return response;
  }
  async getIncomes(startAt, endAt) {
    const params = {
      FromDate: moment(startAt).format(FORMAT.DATE),
      ToDate: moment(endAt).format(FORMAT.DATE),
    };
    console.log(params);
    try {
      var response = await driverApi.getIncomes(params);
    } catch (error) {
      console.log(response);
      return error;
    }
    return response;
  }
}

const driverService = new DriverService();
export default driverService;
