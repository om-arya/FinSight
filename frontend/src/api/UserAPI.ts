import axios from "axios";

export const API_URL = "http://localhost:8080/";

export interface ResponseEntity {
    data: any;
    status: number;
    headers: any;
}

export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string
    emailAddress: string;
    assetNames: Array<string>
    assetAmounts: Array<number>
}

export async function createUser(user: User): Promise<ResponseEntity> {
    const response = await axios.post(API_URL + "users", user);
    return response as ResponseEntity;
}

export async function getUser(username: string): Promise<void> {
    return await axios.get(API_URL + "users");
}