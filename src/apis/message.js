import axiosClient from ".";

class MessageApi {
  PREFIX = "messages/";
  async sendMessage(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.post(url, params);
  }
}

const messageApi = new MessageApi();
export default messageApi;
