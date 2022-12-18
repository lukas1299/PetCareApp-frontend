import axios from "axios";

const API_URL ="http://localhost:8080";

const getUserFriends = () => {
    return axios.get(API_URL + "/friends/me", {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}}).then((response) => {
        return response;
    })
};

const getUserInvitations = () => {
    return axios.get(API_URL + "/friends/me/invitations", {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}}).then((response) => {
        return response;
    })
}

const acceptFriendsInvitation = (userId) => {
    return axios.post(API_URL + "/friends/" + userId + "/accept", {}, {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const rejectFriendsInvitation = (userId) => {
    return axios.post(API_URL + "/friends/" + userId + "/reject", {}, {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const getSocialPost = () => {
    return axios.get(API_URL + "/socialPost/friends/all", {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}});
}

const createSocialPost = (title, content) => {
    return axios.post(API_URL + "/socialPost/add", {title, content}, {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const socialPostAssessment = (id, type) => {
    return axios.post(API_URL + "/socialPost/"+ id +"/"+ type +"/assess", {}, {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const homeService = {
    getUserFriends,
    getUserInvitations,
    acceptFriendsInvitation,
    rejectFriendsInvitation,
    getSocialPost,
    createSocialPost,
    socialPostAssessment
};

export default homeService;