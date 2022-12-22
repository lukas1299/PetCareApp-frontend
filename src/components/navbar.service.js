import axios from "axios";

const API_URL ="http://localhost:8080";

const getUserImage = () => {
    return axios.get(API_URL + "/users/image", {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}, responseType: "blob"});
}

const navbarService = {
    getUserImage
};

export default navbarService;