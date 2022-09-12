import messageApi from "../apis/message";

class MessageService {
  async sendMessage(roomCode, content) {
    try {
      let params = {
        RoomCode: roomCode,
        Content: content,
      };
      var response = await messageApi.sendMessage(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const messageService = new MessageService();
export default messageService;
