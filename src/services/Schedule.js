import scheduleApi from "../apis/schedule";

class ScheduleService {
  async getScheduleByDate(page, pageSize, fromDate, toDate) {
    const params = {
      Page: page,
      PageSize: pageSize,
      FromDate: fromDate,
      ToDate: toDate,
    };
    try {
      var response = await scheduleApi.getScheduleByDate(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const scheduleService = new ScheduleService();
export default scheduleService;
