import axios from "axios";

const API_URL = "http://localhost:8080";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
};

const getAllNews = () => {
  return axios.get(API_URL + "/news", config).then((response) => {
    return response;
  });
};

const newsService = {
  getAllNews,
};

export default newsService;
