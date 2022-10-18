import driverApi from "../apis/driver";

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
}

const driverService = new DriverService();
export default driverService;
