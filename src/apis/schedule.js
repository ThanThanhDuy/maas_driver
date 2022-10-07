import axiosClient from ".";

class ScheduleApi {
  PREFIX = "drivers/";
  async getScheduleByDate(params) {
    const url = `${this.PREFIX}schedules`;
    return await axiosClient.get(url, { params: params });
  }
}

const scheduleApi = new ScheduleApi();
export default scheduleApi;
