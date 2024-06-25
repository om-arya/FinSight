import axios from "axios";

const API_URL = "http://localhost:5173/";

interface User {
    username: string;
    password: string;
    name: string;
    emailAddress: string;
    assetNames: Array<string>
    assetAmounts: Array<number>
}

async function createUser(user: User) {
    return await axios.post(API_URL, user)
}

async function getUser(username: string) {
    return await axios.get(`${API_URL}/${username}`);
}

export {API_URL, createUser, getUser}