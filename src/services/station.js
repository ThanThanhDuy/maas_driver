import stationApi from "../apis/station";

class StationService {
  async getAllStation() {
    try {
      var response = await stationApi.getAllStation();
    } catch (error) {
      return error;
    }
    return response;
  }
}

const stationService = new StationService();
export default stationService;
