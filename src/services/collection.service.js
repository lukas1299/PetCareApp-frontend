import axios from "axios";

const API_URL = "http://localhost:8080";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
};

const getMyCollections = () => {
  return axios.get(API_URL + "/collections/me", config);
};

const getFriendsCollections = () => {
  return axios.get(API_URL + "/collections/friends", config);
};

const getNonFriendsCollections = () => {
  return axios.get(API_URL + "/collections/other", config);
};

const createCollection = (title, target, description) => {
  return axios.post(
    API_URL + "/collections/add",
    {
      title,
      target,
      description,
    },
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const findCollectionsByTitle = (title) => {
  return axios.get(API_URL + "/collections/" + title + "/find", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
};

const shareCollection = (content, image) => {
  return axios.post(
    API_URL + "/socialPost/add",
    { json: '{ "title":" ", "content":"' + content + '"}', file: image },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const collectionService = {
  getMyCollections,
  getFriendsCollections,
  getNonFriendsCollections,
  createCollection,
  findCollectionsByTitle,
  shareCollection,
};

export default collectionService;
