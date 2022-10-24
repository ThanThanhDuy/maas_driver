import axiosClient from ".";

class TripStatusApi {
  PREFIX = "drivers/booking-detail-driver/trip-status";
  async updateTripStatus(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.put(url, params);
  }
}

const tripStatusApi = new TripStatusApi();
export default tripStatusApi;
