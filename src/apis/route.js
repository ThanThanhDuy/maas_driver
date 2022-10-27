import axiosClient from ".";

class RouteApi {
  PREFIX = "routeroutines/";
  async getRouteRoutine() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }

  async getRouteByCodeStation(params) {
    const url = `routes/`;
    return await axiosClient.get(url, { params });
  }

  async createRouteRoutine(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.post(url, params);
  }
}

const routeApi = new RouteApi();
export default routeApi;
