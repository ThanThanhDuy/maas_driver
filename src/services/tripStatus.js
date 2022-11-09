import tripStatusApi from "../apis/tripStatus";

class TripStatusService {
  async updateTripStatus(bookingDetailDriverCode, status) {
    try {
      let params = {
        BookingDetailDriverCode: bookingDetailDriverCode,
        TripStatus: status,
      };
      var response = await tripStatusApi.updateTripStatus(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async startTrip(listBookingDetailDriverCode) {
    try {
      let params = {
        BookingDetailDriverCodes: listBookingDetailDriverCode,
      };
      var response = await tripStatusApi.startTrip(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async cancelTrip(listBookingDetailDriverCode, reason) {
    try {
      let params = {
        BookingDetailDriverCodes: listBookingDetailDriverCode,
        Reason: reason,
      };
      var response = await tripStatusApi.cancelTrip(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const tripStatusService = new TripStatusService();
export default tripStatusService;
