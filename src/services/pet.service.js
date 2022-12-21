import axios from "axios";

const API_URL = "http://localhost:8080";

const getUserAnimals = () => {
  return axios
    .get(API_URL + "/animals/me", {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    })
    .then((response) => {
      return response;
    });
};

const createAnimal = (name, animalType, age, weight, gender) => {
  return axios.post(
    API_URL + "/animals/add",
    {
      name,
      animalType,
      age,
      weight,
      gender,
    },
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const getEvents = (id) => {
  return axios.get(API_URL + "/events/" + id + "/all", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
};

const getEventsForDay = (id, date) => {
  return axios.post(
    API_URL + "/events/day/" + id + "/all",
    { date },
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const createEvent = (id, name, eventType, frequency, date) => {
  return axios.post(
    API_URL + "/animals/" + id + "/events/add",
    { name, eventType, frequency, date },
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const deleteEvent = (name, animalId) => {
  return axios.delete(API_URL + "/animals/events/delete", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    data: { name, animalId },
  });
};

const getImage = (id) => {
  return axios.get(API_URL + "/animals/" + id + "/image", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    responseType: "blob"
  });
};

const petService = {
  getUserAnimals,
  createAnimal,
  getEvents,
  getEventsForDay,
  createEvent,
  deleteEvent,
  getImage,
};

export default petService;
