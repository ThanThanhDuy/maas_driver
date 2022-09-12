import messageRoomsApi from "../apis/messageRoom";

class MessageRoomsService {
  async getAllMessageRooms() {
    try {
      var response = await messageRoomsApi.getAllMessageRooms();
    } catch (error) {
      return error;
    }
    return response;
  }
}

const messageRoomsService = new MessageRoomsService();
export default messageRoomsService;
