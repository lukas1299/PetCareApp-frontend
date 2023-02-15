import axios from "axios";

const API_URL ="http://localhost:8080";

const config = {
    headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}
}

const donateRealization = (id, money) => {
    return axios.post(API_URL + "/collections/" + id +"/donate", {
        money
    }, {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const payRealizationService = {
    donateRealization
};

export default payRealizationService;