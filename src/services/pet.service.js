import axios from "axios";

const API_URL = "http://localhost:8080";

const getAnimal = (id) => {
  return axios
    .get(API_URL + "/animals/" + id, {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    })
    .then((response) => {
      return response;
    });
}

const getUserAnimals = () => {
  return axios
    .get(API_URL + "/animals/me", {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    })
    .then((response) => {
      return response;
    });
};

const createAnimal = (name, breed, age, weight, gender, animalImage) => {
  return axios.post(
    API_URL + "/animals/add",
    {
      json:
        '{ "name":"' +
        name +
        '", "breed":"' +
        breed +
        '", "age":"' +
        age +
        '", "weight":"' +
        weight +
        '", "gender":"' +
        gender +
        '"}',
      file: animalImage,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const updateAnimal = (id, name, animalType, age, weight, gender, animalImage) => {
  return axios.put(
    API_URL + "/animals/"+ id +"/update",
    {
      json:
        '{ "name":"' +
        name +
        '", "breed":"' +
        animalType +
        '", "age":"' +
        age +
        '", "weight":"' +
        weight +
        '", "gender":"' +
        gender +
        '"}',
      file: animalImage,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

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

const deleteAnimal = (animalId) => {
  return axios.delete(API_URL + "/animals/" + animalId + "/delete", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
};

const getImage = (id) => {
  return axios.get(API_URL + "/animals/" + id + "/image", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    responseType: "blob",
  });
};


const findAnimalsByName = (name) => {
  return axios.post(
    API_URL + "/animals/" + name + "/find",
    {},
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    }
  );
};

const shareEvent = (content, image) => {
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

const getAnimalEvents = (id) => {
  return axios.get(API_URL + "/events/animals/" + id + "/all", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
}

const getAnimalDeprecatedEvents = (id) => {
  return axios.get(API_URL + "/events/" + id + "/animals/deprecated", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
}

const setAnimalUpcomingEvents = (id) => {
  return axios.get(API_URL + "/events/" + id + "/animals/upcoming", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
}

const checkVaccination = (id) => {
  return axios.get(API_URL + "/animals/" + id + "/events/check", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
}

const getAllVacciantion = () => {
  return axios.get(API_URL + "/vaccinations", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
}

const getBreeds = () => {
  return axios.get(API_URL + "/breeds", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
}

const getAnimalBreed = (id) => {
  return axios.get(API_URL + "/breeds/animal/" + id + "/get", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
}

const getFactByBreed = (name) => {
  return axios.get(API_URL + "/facts/" + name + "/getByBreed", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
}

const getFacts = () => {
  return axios.get(API_URL + "/facts", {
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
}

const petService = {
  getAnimal,
  getUserAnimals,
  createAnimal,
  updateAnimal,
  getEvents,
  getEventsForDay,
  createEvent,
  deleteEvent,
  getImage,
  deleteAnimal,
  findAnimalsByName,
  shareEvent,
  getAnimalEvents,
  getAnimalDeprecatedEvents,
  setAnimalUpcomingEvents,
  checkVaccination,
  getAllVacciantion,
  getBreeds,
  getAnimalBreed,
  getFactByBreed,
  getFacts
};

export default petService;
