import axios from "axios";

const API_URL ="http://localhost:8080";

const config = {
    headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}
}

const getUserAllFriends = () => {
    return axios.get(API_URL + "/friends/me", {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}});
}

const getNonFriendUsers = () => {
    return axios.get(API_URL + "/users/non-friends", {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}});
}

const sendInvitations = (name) => {
    return axios.post(API_URL + "/profiles/user/friends/add",{name}, {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const removeFriend = (id) => {
    return axios.delete(API_URL + "/posts/"+ id +"/remove",
    {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const getUserImage = (id) => {
    return axios.get(API_URL + "/users/"+ id +"/image", {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}, responseType: "blob"});
}

const friendService = {
    getUserAllFriends,
    getNonFriendUsers,
    sendInvitations,
    removeFriend,
    getUserImage
};

export default friendService;