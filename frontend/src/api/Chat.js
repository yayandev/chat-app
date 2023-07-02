import axios from "axios";
const API_URL = "http://localhost/chat-app/api"
export const createChat = async (id,token,pengirim,chat) => {
    const formData = new FormData();
    formData.append('pengirim', pengirim)
    formData.append('chat', chat)
    const response = await axios.post(`${API_URL}/chat/createChat.php?id=${id}&token=${token}`,formData)

    return response.data;
}