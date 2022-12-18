import axios from "axios";

const API_URL ="http://localhost:8080";

const login = (login, password) => {
    return axios.post(API_URL + "/authentication", {
        login,
        password
    }).then((response) => {
        return response;
    })
};

const getCurrentUser = () => {
    return localStorage.getItem("userToken");
}

const authService = {
    login,
    getCurrentUser
};

export default authService;