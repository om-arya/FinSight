import axios, { HttpStatusCode } from "axios";

const API_URL = "http://localhost:8080/users";

export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string
    emailAddress: string;
    holdings: Holding[];
}

export interface Holding {
    ticker: string;
    amount: number;
    profit: number;
    username: string;
}

interface ResponseEntity {
    data: any;
    status: HttpStatusCode;
}

const UserAPI = () => {

    /* CREATE ENDPOINTS */

    /**
     * Create a new user to save into the database. If a user with this
     * username or emailAddress already exists, the controller returns a
     * CONFLICT custom operation status (with an OK HTTP status).
     * 
     * @param username of the new user.
     * @param password of the new user.
     * @param firstName of the new user.
     * @param lastName of the new user.
     * @param emailAddress of the new user.
     * @returns the custom operation status returned by the request.
     */
    async function createUser(username: string, password: string, firstName: string, lastName: string, emailAddress: string): Promise<string> {
        const newUser: User = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            holdings: []
        }

        const response = await axios.post(API_URL, newUser) as ResponseEntity;
        return response.data as string;
    }

    /* READ ENDPOINTS */

    /**
     * Get the user from the database with the specified username. If the
     * user does not exist, the controller returns an empty body.
     * 
     * @param username of the user to get from the database.
     * @returns the user returned by the request, which is empty if it does
     *          not exist.
     */
    async function getUserByUsername(username: string): Promise<User> {
        const response = await axios.get(API_URL + '/' + username) as ResponseEntity;
        return response.data as User;
    }

    /**
     * Get the user from the database with the specified email address. If
     * the user does not exist, the controller returns an empty body.
     * 
     * @param emailAddress of the user to get from the database.
     * @returns the user returned by the request, which is empty if it does
     *          not exist.
     */
    async function getUserByEmailAddress(emailAddress: any): Promise<User> {
        const response = await axios.get(API_URL + "/emailaddress?emailAddress=" + emailAddress) as ResponseEntity;
        return response.data as User;
    }

    /* UPDATE ENDPOINTS */

    /**
     * Update the firstName of the user who has the specified username. If
     * the user does not exist, the controller returns a NOT_FOUND status.
     * 
     * @param username of the user to update the password of.
     * @param newFirstName to update to.
     * @returns the HTTP status returned by the request.
     */
    async function setUserFirstName(username: string, newFirstName: string): Promise<HttpStatusCode> {
        const response = await axios.patch(API_URL + '/' + username + "?newFirstName=" + newFirstName) as ResponseEntity;
        return response.status as HttpStatusCode;
    }

    /**
     * Update the lastName of the user who has the specified username. If
     * the user does not exist, the controller returns a NOT_FOUND status.
     * 
     * @param username of the user to update the lastName of.
     * @param newLastName to update to.
     * @returns the HTTP status returned by the request.
     */
    async function setUserLastName(username: string, newLastName: string): Promise<HttpStatusCode> {
        const response = await axios.patch(API_URL + '/' + username + "?newLastName=" + newLastName) as ResponseEntity;
        return response.status as HttpStatusCode;
    }

    /**
     * Update the emailAddress of the user who has the specified username. If
     * the user does not exist, the controller returns a NOT_FOUND status.
     * 
     * @param username of the user to update the emailAddress of.
     * @param newEmailAddress to update to.
     * @returns the HTTP status returned by the request.
     */
    async function setUserEmailAddress(username: string, newEmailAddress: string): Promise<HttpStatusCode> {
        const response = await axios.patch(API_URL + '/' + username + "?newEmailAddress=" + newEmailAddress) as ResponseEntity;
        return response.status as HttpStatusCode;
    }

    /**
     * Update the password of the user who has the specified username. If
     * the user does not exist, the controller returns a NOT_FOUND status.
     * 
     * @param username of the user to update the password of.
     * @param newPassword to update to.
     * @returns the HTTP status returned by the request.
     */
    async function setUserPassword(username: string, newPassword: string): Promise<HttpStatusCode> {
        const response = await axios.patch(API_URL + '/' + username + "?newPassword=" + newPassword) as ResponseEntity;
        return response.status as HttpStatusCode;
    }

    /**
     * Update the holdings of the user who has the specified username. If
     * the user does not exist, the controller returns a NOT_FOUND status.
     * 
     * @param username of the user to update the holdings of.
     * @param newHoldings to update to.
     * @return a ResponseEntity consisting of an HTTP status.
     */
    async function setUserHoldings(username: string, newHoldings: Holding[]) {
        const response = await axios.patch(API_URL + '/' + username, newHoldings) as ResponseEntity;
        return response.status as HttpStatusCode;
    }

    /* DELETE ENDPOINTS */

    /**
     * Delete the user with the specified username from the database. If
     * the user does not exist, it is silently ignored.
     * 
     * @param username of the user to delete from the database.
     * @returns the HTTP status returned by the request.
     */
    async function deleteUser(username: string): Promise<HttpStatusCode> {
        const response = await axios.delete(API_URL + '/' + username) as ResponseEntity;
        return response.data as HttpStatusCode;
    }

    return { createUser, getUserByUsername, getUserByEmailAddress, setUserFirstName, setUserLastName, setUserEmailAddress,
             setUserPassword, setUserHoldings, deleteUser };
}

export default UserAPI;