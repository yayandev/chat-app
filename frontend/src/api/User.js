import axios from "axios";

const API_URL = "http://localhost/chat-app/api"
export const userVerify = async (id,token) => {
    const formData = new FormData()
    formData.append('id',id)
    formData.append('token',token)
    const response = await axios.post(`${API_URL}/user/verify.php`,formData)

    return response.data;
}

export const userLogin = async (username,password) => {
    const formData = new FormData()
    formData.append('username',username)
    formData.append('password',password)
    const response = await axios.post(`${API_URL}/user/login.php`,formData)

    return response.data
}

export const userLogout = async (id,token) => {
    const formData = new FormData()
    formData.append('id',id)
    formData.append('token',token)
    const response = await axios.post(`${API_URL}/user/logout.php`,formData)

    return response.data
}


export const userRegis = async (username,password,confirmPassword) => {
    const formData = new FormData()
    formData.append('username',username)
    formData.append('password',password)
    formData.append('confirmPassword',confirmPassword)
    const response = await axios.post(`${API_URL}/user/regis.php`,formData)

    return response.data
}