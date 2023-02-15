import axios from "axios";

const API_URL = "http://localhost:8080";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
};

const getCompetitions = () => {
  return axios.get(API_URL + "/competitions", config);
};

const getCompetitionDetails = (id) => {
  return axios.get(API_URL + "/competitions/" + id + "/details", config);
};

const rateRealization = (id) => {
  return axios.post(
    API_URL + "/competitions/details/" + id + "/rate",
    {},
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const getFinishedCompetitionsResult = () => {
  return axios.get(API_URL + "/competitions/finished", config);
};

const competitionService = {
  getCompetitions,
  getCompetitionDetails,
  rateRealization,
  getFinishedCompetitionsResult,
};

export default competitionService;
