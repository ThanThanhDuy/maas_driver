import tripStatusApi from "../apis/tripStatus";

class TripStatusService {
  async updateTripStatus(bookingDetailDriverCode, status) {
    try {
      let params = {
        BookingDetailDriverCode: bookingDetailDriverCode,
        TripStatus: status,
      };
      var response = await tripStatusApi.updateTripStatus(params);
      console.log(response);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const tripStatusService = new TripStatusService();
export default tripStatusService;
