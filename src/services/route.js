import routeApi from "../apis/route";

class RouteService {
  async getRouteRoutine() {
    try {
      var response = await routeApi.getRouteRoutine();
    } catch (error) {
      return error;
    }
    return response;
  }

  async getRouteByCodeStation(startStationCode) {
    try {
      let params = {
        StartStationCode: startStationCode,
      };
      var response = await routeApi.getRouteByCodeStation(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async createRouteRoutine(routeCode, from, to, time) {
    try {
      let params = {
        RouteCode: routeCode,
        StartAt: from,
        EndAt: to,
        StartTime: time,
      };
      var response = await routeApi.createRouteRoutine(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const routeService = new RouteService();
export default routeService;
