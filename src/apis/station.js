import axiosClient from ".";

class StationApi {
  PREFIX = "stations/";

  async getAllStation() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }
}

const stationApi = new StationApi();
export default stationApi;
