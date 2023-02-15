import axios from "axios";

const API_URL = "http://localhost:8080";

const getUserAnimals = (id) => {
  return axios.get(API_URL + "/animals/" + id + "/user", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
};

const getUserFriends = (id) => {
  return axios.get(API_URL + "/friends/" + id + "/user", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
};

const getUser = () => {
  return axios.get(API_URL + "/users/me/all", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
};

const updateUser = (id, username, email, userImage) => {
  return axios.put(
    API_URL + "/users/" + id + "/update",
    {
      json: '{ "username":"' + username + '", "email":"' + email + '"}',
      file: userImage,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const userProfileService = {
  getUserAnimals,
  getUserFriends,
  getUser,
  updateUser,
};

export default userProfileService;
