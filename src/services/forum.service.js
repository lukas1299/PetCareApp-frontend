import axios from "axios";

const API_URL ="http://localhost:8080";

const config = {
    headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}
}

const getInfoAboutMe = () => {
    return axios.get(API_URL + "/users/me", {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}});
}

const getAllTopics = () => {
    return axios.get(API_URL + "/topics", {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}}).then((response) => {
        
        return response;
    })
};

const getTopicDetails = () => {

    return axios.get(API_URL + "/posts/topic/" + localStorage.getItem("topicId"), {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}});
}

const createTopic = (title, description, topicCategory) => {
    return axios.post(API_URL + "/topics/add", {
        title, 
        description,
        topicCategory
    }, {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}});
};

const createPost = (message) => {
    return axios.post(API_URL + "/posts/add/" + localStorage.getItem("topicId"), {
        message
    }, {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const postEvaluate = (id, type) => {
    return axios.post(API_URL + "/posts/"+ id +"/"+ type +"/assess",{}, {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const postRemove = (id) => {
    return axios.delete(API_URL + "/posts/"+ id +"/remove",
    {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const forumService = {
    getInfoAboutMe,
    getAllTopics,
    getTopicDetails,
    createTopic,
    createPost,
    postEvaluate,
    postRemove
};

export default forumService;