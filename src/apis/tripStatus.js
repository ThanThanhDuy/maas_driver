import axiosClient from ".";

class TripStatusApi {
  PREFIX = "drivers/booking-detail-driver";

  async updateTripStatus(params) {
    const url = `${this.PREFIX}/trip-status`;
    return await axiosClient.put(url, params);
  }

  async startTrip(params) {
    const url = `${this.PREFIX}s/start`;
    return await axiosClient.put(url, params);
  }

  async cancelTrip(params) {
    const url = `${this.PREFIX}/cancel`;
    return await axiosClient.put(url, params);
  }
}

const tripStatusApi = new TripStatusApi();
export default tripStatusApi;
