import axios from "axios";

const API_URL = "http://localhost:8080";

const getUserFriends = () => {
  return axios
    .get(API_URL + "/friends/me", {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    })
    .then((response) => {
      return response;
    });
};

const getUserInvitations = () => {
  return axios
    .get(API_URL + "/friends/me/invitations", {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    })
    .then((response) => {
      return response;
    });
};

const acceptFriendsInvitation = (userId) => {
  return axios.post(
    API_URL + "/friends/" + userId + "/accept",
    {},
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const rejectFriendsInvitation = (userId) => {
  return axios.post(
    API_URL + "/friends/" + userId + "/reject",
    {},
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const getSocialPost = () => {
  return axios.get(API_URL + "/socialPost/friends/all", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
};

const createSocialPost = (title, content, postImage) => {
  return axios.post(
    API_URL + "/socialPost/add",
    { json: '{ "title":" ", "content":"' + content + '"}', file: postImage },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const socialPostAssessment = (id, type) => {
  return axios.post(
    API_URL + "/socialPost/" + id + "/" + type + "/assess",
    {},
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};
const getSocialPostImage = (id) => {
  return axios.get(API_URL + "/socialPost/" + id + "/image", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    responseType: "blob",
  });
};
const getUpcomingEvents = () => {
  return axios.get(API_URL + "/events/animals/upcoming", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
};

const getSocialPostComments = (id) => {
  return axios.get(API_URL + "/comments/" + id + "/get", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
};
const createSocialPostComment = (id, content) => {
  return axios.post(
    API_URL + "/comments/" + id + "/add",
    { content },
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const removeSocialPostComment = (id) => {
    return axios.delete(API_URL + "/comments/"+ id +"/remove",
    {headers: {Authorization: "Bearer " + localStorage.getItem("userToken")}})
}

const homeService = {
  getUserFriends,
  getUserInvitations,
  acceptFriendsInvitation,
  rejectFriendsInvitation,
  getSocialPost,
  createSocialPost,
  socialPostAssessment,
  getSocialPostImage,
  getUpcomingEvents,
  getSocialPostComments,
  createSocialPostComment,
  removeSocialPostComment
};

export default homeService;
