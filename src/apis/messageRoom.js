import axiosClient from ".";

class MessageRoomsApi {
  PREFIX = "messagerooms/";
  async getAllMessageRooms() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }
}

const messageRoomsApi = new MessageRoomsApi();
export default messageRoomsApi;
