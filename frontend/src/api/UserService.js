import axios from "axios";

const API_URL = "http://localhost:5173/"

export async function createUser(user) { // JSON object
    return await axios.post(API_URL, user)
}

export async function getUser(username) {
    return await axios.get(`${API_URL}/${username}`);
}