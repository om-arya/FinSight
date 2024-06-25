import axios from "axios";

const API_URL = "http://localhost:5173/";

async function createUser(user) { // JSON object
    return await axios.post(API_URL, user)
}

async function getUser(username) {
    return await axios.get(`${API_URL}/${username}`);
}

export {API_URL, createUser, getUser}