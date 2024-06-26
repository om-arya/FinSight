import axios from "axios";

const API_URL = "http://localhost:8080/";

interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string
    emailAddress: string;
    assetNames: Array<string>
    assetAmounts: Array<number>
}

async function createUser(user: User): Promise<void> {
    return await axios.post(API_URL, user)
}

async function getUser(username: string): Promise<void> {
    return await axios.get(`${API_URL}/${username}`);
}

export {API_URL, User, createUser, getUser}