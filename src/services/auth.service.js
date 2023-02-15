import axios from "axios";

const API_URL = "http://localhost:8080";

const login = (login, password) => {
  return axios
    .post(API_URL + "/authentication", {
      login,
      password,
    })
    .then((response) => {
      return response;
    });
};

const register = (username, email, password, userImage) => {
  return axios.post(
    API_URL + "/register",
    {
      json:
        '{ "email":"' +
        email +
        '", "username":"' +
        username +
        '", "password":"' +
        password +
        '", "role":"' +
        "USER" + '"}',
      file: userImage,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }
  );
};

const getCurrentUser = () => {
  return localStorage.getItem("userToken");
};

const authService = {
  login,
  register,
  getCurrentUser,
};

export default authService;
