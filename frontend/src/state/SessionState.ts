import { User, Holding } from "../api/UserAPI";

const SessionState = () => {

    function setUser(user: User) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    function setHoldings(holdings: Holding[]) {
        sessionStorage.setItem("holdings", JSON.stringify(holdings));
    }

    function getUser() {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) as User : null;
    }

    function getHoldings() {
        const holdings = sessionStorage.getItem("holdings");
        return holdings ? JSON.parse(holdings) as Holding[] : null;
    }

    function clearSessionState() {
        sessionStorage.clear();
    }

    return { setUser, getUser, setHoldings, getHoldings, clearSessionState };
}

export default SessionState;