import messageRoomsApi from "../apis/messageRoom";

class MessageRoomsService {
  async getMessageRooms(roomType, roomCode) {
    const params = {
      RoomType: roomType,
      Code: roomCode,
    };
    try {
      var response = await messageRoomsApi.getMessageRooms(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const messageRoomsService = new MessageRoomsService();
export default messageRoomsService;
