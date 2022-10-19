import axiosClient from ".";

class MessageRoomsApi {
  PREFIX = "messagerooms/";
  async getMessageRooms(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url, { params });
  }
}

const messageRoomsApi = new MessageRoomsApi();
export default messageRoomsApi;
