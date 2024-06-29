import axios from "axios";

const API_URL = "http://localhost:8080/users";

export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string
    emailAddress: string;
    purchaseNames: string[];
    purchaseAmounts: number[];
    holdingDates: string[];
}

export interface ResponseEntity {
    data: any;
    status: number;
    headers: any;
}

/* CREATE ENDPOINTS */

/**
 * Create a new user to save into the database. If a user with this
 * username or emailAddress already exists, the controller returns a
 * CONFLICT custom operation status (with an OK HTTP status).
 * 
 * @param user object to save as an entity in the database.
 * @returns a ResponseEntity consisting of a custom status to
 *          differentiate username and email address conflicts, along
 *          with an HTTP status.
 */
export async function createUser(user: User): Promise<ResponseEntity> {
    const response = await axios.post<ResponseEntity>(API_URL, user);
    return response;
}

/* READ ENDPOINTS */

/**
 * Get the user from the database with the specified username. If the
 * user does not exist, the controller returns a NOT_FOUND status.
 * 
 * @param username of the user to get from the database.
 * @returns a ResponseEntity consisting of a user object, which is empty
 *          if not found, along with an HTTP status.
 */
export async function getUserByUsername(username: string): Promise<ResponseEntity> {
    const response = await axios.get<ResponseEntity>(API_URL + '/' + username);
    return response;
}

/**
 * Get the user from the database with the specified email address. If
 * the user does not exist, the controller returns a NOT_FOUND status.
 * 
 * @param emailAddress of the user to get from the database.
 * @returns a ResponseEntity consisting of a user object, which is empty
 *          if not found, along with an HTTP status.
 */
export async function getUserByEmailAddress(emailAddress: any): Promise<ResponseEntity> {
    const response = await axios.get<ResponseEntity>(API_URL, emailAddress);
    return response;
}

/* UPDATE ENDPOINTS */

/**
 * Update the firstName of the user who has the specified username. If
 * the user does not exist, the controller returns a NOT_FOUND status.
 * 
 * @param username of the user to update the password of.
 * @param newFirstName to update to.
 * @returns a ResponseEntity consisting of an HTTP status.
 */
export async function setUserFirstName(username: string, newFirstName: string): Promise<ResponseEntity> {
    const response = await axios.patch<ResponseEntity>(API_URL + '/' + username, newFirstName);
    return response;
}

/**
 * Update the lastName of the user who has the specified username. If
 * the user does not exist, the controller returns a NOT_FOUND status.
 * 
 * @param username of the user to update the lastName of.
 * @param newLastName to update to.
 * @returns a ResponseEntity consisting of an HTTP status.
 */
export async function setUserLastName(username: string, newLastName: string): Promise<ResponseEntity> {
    const response = await axios.patch<ResponseEntity>(API_URL + '/' + username, newLastName);
    return response;
}

/**
 * Update the emailAddress of the user who has the specified username. If
 * the user does not exist, the controller returns a NOT_FOUND status.
 * 
 * @param username of the user to update the emailAddress of.
 * @param newEmailAddress to update to.
 * @returns a ResponseEntity consisting of an HTTP status.
 */
export async function setUserEmailAddress(username: string, newEmailAddress: string): Promise<ResponseEntity> {
    const response = await axios.patch<ResponseEntity>(API_URL + '/' + username, newEmailAddress);
    return response;
}

/**
 * Update the password of the user who has the specified username. If
 * the user does not exist, the controller returns a NOT_FOUND status.
 * 
 * @param username of the user to update the password of.
 * @param newPassword to update to.
 * @returns a ResponseEntity consisting of an HTTP status.
 */
export async function setUserPassword(username: string, newPassword: string): Promise<ResponseEntity> {
    const response = await axios.patch<ResponseEntity>(API_URL + '/' + username, newPassword);
    return response;
}

/* DELETE ENDPOINTS */

/**
 * Delete the user with the specified username from the database. If
 * the user does not exist, it is silently ignored.
 * 
 * @param username of the user to delete from the database.
 * @returns a ResponseEntity consisting of an HTTP status.
 */
export async function deleteUser(username: string): Promise<ResponseEntity> {
    const response = await axios.delete<ResponseEntity>(API_URL + '/' + username);
    return response;
}