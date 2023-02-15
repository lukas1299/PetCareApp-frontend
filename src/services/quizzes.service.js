import axios from "axios";

const API_URL = "http://localhost:8080";

const getQuizzes = async () => {
  const response = await axios.get(API_URL + "/quizzes/get", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
  return response;
};

const getQuestions = async (id) => {
  const response = await axios.get(API_URL + "/questions/" + id + "/get", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
  return response;
};

const finishQuiz = async (id, score) => {
  return axios.post(
    API_URL + "/quizzes/" + id + "/" + score + "/saveResult",
    {},
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const quizzesService = {
  getQuizzes,
  getQuestions,
  finishQuiz
};

export default quizzesService;
