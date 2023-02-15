import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
  BiCheckCircle,
  BiCalendar,
  BiTrash,
  BiShare,
  BiEditAlt,
  BiBookmarkPlus,
  BiLinkAlt,
  BiQuestionMark,
} from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import "./PetDetailsStyle.css";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import petService from "../services/pet.service";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import navbarService from "./navbar.service";
import Alert from "react-bootstrap/Alert";
import Calendar from "react-calendar";

import p1 from "./photos/1.jpg";
import p2 from "./photos/2.jpg";
import p3 from "./photos/3.jpg";
import p4 from "./photos/4.jpg";
import p5 from "./photos/5.jpg";
import p6 from "./photos/6.jpg";
import p7 from "./photos/7.jpg";
import p8 from "./photos/8.jpg";
import p9 from "./photos/9.jpg";
import p10 from "./photos/10.jpg";
import p11 from "./photos/11.jpg";
import p12 from "./photos/12.jpg";
import p13 from "./photos/13.jpg";
import p14 from "./photos/14.jpg";
import p15 from "./photos/15.jpg";
import p16 from "./photos/16.jpg";
import p17 from "./photos/17.jpg";
import p18 from "./photos/18.jpg";
import p19 from "./photos/19.jpg";
import p20 from "./photos/20.jpg";
import p21 from "./photos/21.jpg";
import p22 from "./photos/22.jpg";
import p23 from "./photos/23.jpg";
import p24 from "./photos/24.jpg";
import p25 from "./photos/25.jpg";
import p26 from "./photos/26.jpg";
import p27 from "./photos/27.jpg";
import p28 from "./photos/28.jpg";
import p29 from "./photos/29.jpg";
import p30 from "./photos/30.jpg";
import p31 from "./photos/31.jpg";

const PetDetails = () => {
  const { state } = useLocation();
  const { petId } = state;
  const { petImage } = state;
  const { animalBreed } = state;

  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [checkShow, setCheckShow] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventsInDay, setEventsInDay] = useState([]);
  const [image, setImage] = useState([]);
  const [nameError, setNameError] = useState("");
  const [animal, setAnimal] = useState([]);
  const [animalUpcomingEvents, setAnimalUpcomingEvents] = useState([]);
  const [deprecatedEvents, setDeprecatedEvents] = useState([]);
  const [facts, setFacts] = useState([]);

  const [name, setName] = useState("");
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [newPetImage, setNewPetImage] = useState([]);

  const [petNameError, setPetNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [fileError, setFileError] = useState("");
  const [checkModalValue, setCheckModalValue] = useState("");
  const [checkModalMinDate, setCheckModalMinDate] = useState("");
  const [checkModalMaxDate, setCheckModalMaxDate] = useState("");
  const [selectedCheckDay, setSelectedCheckDay] = useState("");
  const [isVaccination, setIsVaccination] = useState(false);
  const [vaccinations, setVaccinations] = useState([]);

  var animalType = "no breed";
  var gender = "MALE";
  var animalImage;

  var binaryData = [];

  const [eventFormName, setEventFormName] = useState([]);
  var selectedType = "WALKING";
  var selectedVaccination = "";
  var eventName;
  var frequency = "once";
  var tempModalDate;

  const getAnimalUpcomingEvents = () => {
    petService.setAnimalUpcomingEvents(petId).then(
      (response) => {
        console.log(response.data);
        setAnimalUpcomingEvents(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAnimalDeprecatedEvents = () => {
    petService.getAnimalDeprecatedEvents(petId).then(
      (response) => {
        console.log(response.data);
        setDeprecatedEvents(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // Toasts messages
  const eventSharedSuccessfullyNotify = () =>
    toast.success("Post shared successfully");
  const eventNameCannotBeEmptyNotify = () =>
    toast.error("Event name cannot be empty!");
  const eventCreatedSuccessfullyNotify = () =>
    toast.success("Event created successfully!");
  const eventRemovedSuccessfullyNotify = () =>
    toast.success("Event removed successfully!");
  const eventAlreadyExistsNotify = () => toast.error("Event already exists!");
  const eventCannotBeCreatedNotify = () => toast.error("Invalid date!");
  const eventCannotBeDeletedNotify = () =>
    toast.error(
      "Vaccinations that have already taken place cannot be removed!"
    );
  const vaccinationEventCannotBeDeletedNotify = () =>
    toast.error("Vaccination cannot take place during this time!");

  const handleAnimalType = (selectedAnimalType) => {
    animalType = selectedAnimalType;
    document.getElementById("animalTypeToggle").textContent =
      selectedAnimalType.toLowerCase().charAt(0).toUpperCase() +
      selectedAnimalType.toLowerCase().slice(1);
  };

  const handleVaccination = (selectedVaccinationName) => {
    selectedVaccination = selectedVaccinationName;
    document.getElementById("vaccinationToggle").textContent =
      selectedVaccinationName.toLowerCase().charAt(0).toUpperCase() +
      selectedVaccinationName.toLowerCase().slice(1);
  };

  const handleAnimalGender = (selectedAnimalGender) => {
    gender = selectedAnimalGender;
    document.getElementById("genderToggle").textContent =
      selectedAnimalGender.toLowerCase().charAt(0).toUpperCase() +
      selectedAnimalGender.toLowerCase().slice(1);
  };

  const fileHandler = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      var file = e.target.files[0];
      animalImage = file;
      document.getElementById("clip").style.color = "#e62e3a";
    };

    input.click();
  };

  function validateAnimalName(name) {
    if (name.length === 0) {
      setNameError("The name cannot be empty.");
      return false;
    } else if (name.length < 1 || name.length > 15) {
      setNameError("Inappropriate length.");
      return false;
    } else if (name.match(/[^a-zA-Z]/)) {
      setNameError("The name can only contain letter.");
      return false;
    }
    setNameError(null);
    return true;
  }

  function validateWeight(weight) {
    if (weight === undefined) {
      setWeightError("The weight cannot be empty.");
      return false;
    } else if (weight < 0) {
      setWeightError("The weight cannot be less than 0.");
      return false;
    }
    setWeightError(null);
    return true;
  }

  function validateAge(age) {
    if (age === undefined) {
      setAgeError("The age cannot be empty.");
      return false;
    } else if (age < 0) {
      setAgeError("The age cannot be less than 0.");
      return false;
    }
    setAgeError(null);
    return true;
  }

  function validateFile(file) {
    if (file === undefined) {
      setFileError("The file cannot be empty.");
      return false;
    }
    setFileError(null);
    return true;
  }

  const getAnimal = async () => {
    await petService.getAnimal(petId).then(
      (response) => {
        console.log(response.data);
        setAnimal(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getFactByBreed = async () => {
    await petService.getFactByBreed(animalBreed.name).then(
      (response) => {
        console.log(response.data);
        setFacts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleAnimalUpdate = async (e) => {
    if (
      validateAnimalName(name) &&
      validateWeight(weight) &&
      validateAge(age) &&
      validateFile(animalImage)
    ) {
      try {
        await petService
          .updateAnimal(
            petId,
            name,
            animalType,
            age,
            weight,
            gender,
            animalImage
          )
          .then(
            () => {
              handleClose();
              window.location.reload(true);
            },
            (error) => {
              console.log(error);
            }
          );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFormType = (selectedEventType) => {
    selectedType = selectedEventType;

    if (selectedType === "VACCINATION") {
      setIsVaccination(true);
    } else {
      setIsVaccination(false);
    }

    document.getElementById("typeToggle").textContent =
      selectedType.toLowerCase().charAt(0).toUpperCase() +
      selectedType.toLowerCase().slice(1);
  };

  const handleFormName = (selectedEventName) => {
    eventName = selectedEventName;
  };

  const handleFormFrequency = (selectedEventFrequency) => {
    frequency = selectedEventFrequency;
    document.getElementById("frequencyToggle").textContent =
      frequency.toLowerCase().charAt(0).toUpperCase() +
      frequency.toLowerCase().slice(1);
  };

  const loadAvatar = () => {
    navbarService.getUserImage().then(
      (response) => {
        console.log(response.data);
        setImage(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const [eventDate, setEventDate] = useState([]);

  const handleShow = (date) => {
    setEventDate(date);
    getEventForDay(date);
    setShow(true);
  };
  const handleUpdateShow = () => {
    setUpdateShow(true);
  };

  const handleCheckShow = () => {
    setCheckShow(true);
  };
  const handleClose = () => setShow(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleCheckClose = () => setCheckShow(false);

  const getEventsCalendar = () => {
    petService.getEvents(petId).then(
      (response) => {
        setEvents(response.data);
        document.getElementById("scrolleDiv").scrollTop = 3800;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getEventForDay = (date) => {
    petService.getEventsForDay(petId, date).then(
      (response) => {
        console.log(response.data);
        setEventsInDay(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAllVacciantion = () => {
    petService.getAllVacciantion().then(
      (response) => {
        console.log(response.data);
        setVaccinations(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSaveVaccination = async () => {
    var vaccinationEventDate =
      selectedCheckDay.toString().slice(0, 10) +
      " 00:00:00 CET " +
      selectedCheckDay.toString().slice(11, 15);

    if (validateDate(selectedCheckDay)) {
      try {
        await petService
          .createEvent(
            petId,
            checkModalValue,
            "VACCINATION",
            "once",
            vaccinationEventDate
          )
          .then(
            () => {
              getAnimalUpcomingEvents();
              getEventsCalendar();
              eventCreatedSuccessfullyNotify();
              handleCheckClose();
            },
            (error) => {
              console.log(error);
              if (
                error.response.data ===
                "The event cannot be created because the date is invalid"
              ) {
                eventCannotBeCreatedNotify();
              } else if (error.response.data === "Event already exists") {
                eventAlreadyExistsNotify();
              }
            }
          );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const eventCreation = async (e) => {
    if (selectedVaccination !== "") {
      try {
        await petService
          .createEvent(
            petId,
            selectedVaccination,
            "VACCINATION",
            "once",
            eventDate
          )
          .then(
            () => {
              getAnimalUpcomingEvents();
              getEventsCalendar();
              getEventForDay(eventDate);
              eventCreatedSuccessfullyNotify();
            },
            (error) => {
              console.log(error);
              if (
                error.response.data ===
                "The event cannot be created because the date is invalid"
              ) {
                eventCannotBeCreatedNotify();
              } else if (error.response.data === "Event already exists") {
                eventAlreadyExistsNotify();
              } else if (
                error.response.data ===
                "Vaccination cannot take place during this time"
              ) {
                vaccinationEventCannotBeDeletedNotify();
              }
            }
          );
      } catch (err) {
        console.log(err);
      }
    }
    if (validateName(eventName)) {
      try {
        await petService
          .createEvent(petId, eventName, selectedType, frequency, eventDate)
          .then(
            () => {
              getAnimalUpcomingEvents();
              getEventsCalendar();
              getEventForDay(eventDate);
              eventCreatedSuccessfullyNotify();

              document.getElementById("nameInput").value = "";
            },
            (error) => {
              console.log(error);
              if (
                error.response.data ===
                "The event cannot be created because the date is invalid"
              ) {
                eventCannotBeCreatedNotify();
              } else if (error.response.data === "Event already exists") {
                eventAlreadyExistsNotify();
              }
            }
          );
      } catch (err) {
        console.log(err);
      }
    }
  };

  function validateDate(date) {
    if (date === "") {
      setDateError("The name cannot be empty.");
      return false;
    }
    return true;
  }

  function validateName(name) {
    if (name === undefined) {
      setNameError("The name cannot be empty.");
      return false;
    }
    if (name.length < 1 || name.length > 60) {
      setNameError("Inappropriate length.");
      return false;
    }
    setNameError(null);
    return true;
  }

  const deleteEvent = async (name) => {
    console.log(name);
    try {
      await petService.deleteEvent(name, petId).then(
        () => {
          getAnimalUpcomingEvents();
          getEventsCalendar();
          getEventForDay(eventDate);
          eventRemovedSuccessfullyNotify();
        },
        (error) => {
          if (error.response.status === 400) {
            eventCannotBeDeletedNotify();
          }
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const shareEvent = async (text) => {
    const byteCharacters = atob(petImage);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const data = new Blob([byteArray], { type: "text/plain" });
    try {
      await petService.shareEvent(text, data).then(
        () => {
          eventSharedSuccessfullyNotify();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [value, onChange] = useState(new Date());
  const minDate = new Date(
    checkModalMinDate
  );

  const maxDate = new Date(
    checkModalMaxDate
  )

  const handleDayClick = (day) => {
    setDateError(null);
    setSelectedCheckDay(day);
  };

  const checkVaccination = async () => {
    try {
      await petService.checkVaccination(petId).then(
        (result) => {
          if (result.data.name !== "") {
            setCheckModalValue(result.data.name);
            
            setCheckModalMinDate(result.data.minDate);
            setCheckModalMaxDate(result.data.maxDate);
            console.log(minDate);
            console.log(maxDate);
            handleCheckShow();
          }
          console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAvatar();
    getAnimal();
    getFactByBreed();
    getAnimalUpcomingEvents();
    getEventsCalendar();
    getAnimalDeprecatedEvents();
    checkVaccination();
    getAllVacciantion();
  }, []);

  binaryData.push(image);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        minHeight: "950px",
        overflow: "hidden",
      }}
      className="Auth-form-container"
    >
      <NavbarComponent image={binaryData} />

      <div
        style={{
          width: "100%",
          height: "3000px",
          overflow: "auto",
          marginTop: "70px",
        }}
      >
        <div
          style={{
            height: "12%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#8adbd3",
            margin: "4%",
            display: "flex",
          }}
        >
          <img
            src={"data:image/png;base64," + animal.photo}
            style={{
              height: "95%",
              marginLeft: "1%",
              marginTop: "7px",
              float: "left",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "95%",
              marginLeft: "1%",
              marginTop: "7px",
              marginRight: "1%",
              backgroundColor: "white",
              float: "left",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)",
            }}
          >
            <h6
              style={{
                fontFamily: " Arial, Helvetica, sans-serif",
                margin: "1%",
              }}
            >
              About{" "}
              <BiEditAlt
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => handleUpdateShow()}
              />
            </h6>

            <div
              style={{
                display: "block",
                borderBottom: "0.5px solid #9E9E9E",
                marginBottom: "5px",
                marginTop: "10px",
                width: "95%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></div>

            <div style={{ marginLeft: "17%" }}>
              <div
                style={{
                  marginTop: "40px",
                  textAlign: "center",
                  marginLeft: "10%",
                  float: "left",
                  textAlign: "center",
                }}
              >
                <h5>Name:</h5>
                <p>{animal.name}</p>
                <h5>Gender:</h5>
                <p>{animal.animalGender}</p>
              </div>
              <div
                style={{
                  marginTop: "40px",
                  textAlign: "center",
                  marginLeft: "15%",
                  float: "left",
                }}
              >
                <h5>Type:</h5>
                <p>{animalBreed.name}</p>
                <h5>Age:</h5>
                <p>{animal.age}</p>
              </div>
              <div
                style={{
                  marginTop: "40px",
                  textAlign: "center",
                  marginLeft: "15%",
                  float: "left",
                }}
              >
                <h5>Weight:</h5>
                <p>{animal.weight}</p>
              </div>
            </div>
          </div>
        </div>
        <br></br>

        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <a
            style={{
              fontWeight: "bold",
              fontSize: "70px",
            }}
          >
            Did you know that?
          </a>
        </div>
        <br />

        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          {facts.slice(0, 2).map((fact, index) => {
            return (
              <Card key={index} style={{ width: "48%", margin: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#8adbd3",
                    color: "white",
                    margin: "2px",
                    borderRadius: "10px",
                  }}
                >
                  <BiQuestionMark style={{ fontSize: "30px" }} />
                </div>
                <Card.Body>
                  <Card.Title>Dog facts</Card.Title>
                  <Card.Text>{fact.name}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>

        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <a
            style={{
              fontWeight: "bold",
              fontSize: "70px",
            }}
          >
            Upcoming events
          </a>
        </div>

        <div
          style={{
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "40px",
          }}
        >
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Event type</th>
                <th>Name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {animalUpcomingEvents.slice(0, 5).map((event, index) => {
                if (event.event.eventType === "VACCINATION") {
                  return (
                    <tr key={index}>
                      <td>
                        <div
                          style={{
                            backgroundColor: "#DC3545",
                            width: "50%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: "15px",
                          }}
                        >
                          {event.event.eventType}
                        </div>
                      </td>
                      <td>{event.event.name}</td>
                      <td>{event.date.slice(0, 10)}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteEvent(event.event.name)}
                        >
                          <BiTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                } else if (event.event.eventType === "COMBING") {
                  return (
                    <tr>
                      <td>
                        <div
                          style={{
                            backgroundColor: "brown",
                            width: "50%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: "15px",
                          }}
                        >
                          {event.event.eventType}
                        </div>
                      </td>
                      <td>{event.event.name}</td>
                      <td>{event.date.slice(0, 10)}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteEvent(event.event.name)}
                        >
                          <BiTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                } else if (event.event.eventType === "FEEDING") {
                  return (
                    <tr>
                      <td>
                        <div
                          style={{
                            backgroundColor: "orange",
                            width: "50%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: "15px",
                          }}
                        >
                          {event.event.eventType}
                        </div>
                      </td>
                      <td>{event.event.name}</td>
                      <td>{event.date.slice(0, 10)}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteEvent(event.event.name)}
                        >
                          <BiTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                } else if (event.event.eventType === "WALKING") {
                  return (
                    <tr>
                      <td>
                        <div
                          style={{
                            backgroundColor: "#5e9144",
                            width: "50%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: "15px",
                          }}
                        >
                          {event.event.eventType}
                        </div>
                      </td>
                      <td>{event.event.name}</td>
                      <td>{event.date.slice(0, 10)}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteEvent(event.event.name)}
                        >
                          <BiTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </div>
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <a
            style={{
              fontWeight: "bold",
              fontSize: "70px",
            }}
          >
            Pet planner
          </a>
        </div>
        <br />
        <br />
        <br />
        <div
          id="scrolleDiv"
          style={{
            overflow: "scroll",
            gridRow: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            width: "80%",
            height: "1000px",
            backgroundColor: "#8adbd3",
            marginTop: "1px",
          }}
        >
          {events.map((event, index) => {
            if (event.eventList.length === 0) {
              return (
                <Card
                  onClick={() => handleShow(event.date)}
                  style={{
                    width: "14%",
                    float: "left",
                    position: "revert",
                    cursor: "pointer",
                    margin: "0.14%",
                    height: "310px",
                  }}
                  key={index}
                >
                  {event.date.slice(8, 10) === "01" && (
                    <Card.Img
                      variant="top"
                      src={p1}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "02" && (
                    <Card.Img
                      variant="top"
                      src={p2}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "03" && (
                    <Card.Img
                      variant="top"
                      src={p3}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "04" && (
                    <Card.Img
                      variant="top"
                      src={p4}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "05" && (
                    <Card.Img
                      variant="top"
                      src={p5}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "06" && (
                    <Card.Img
                      variant="top"
                      src={p6}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "07" && (
                    <Card.Img
                      variant="top"
                      src={p7}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "08" && (
                    <Card.Img
                      variant="top"
                      src={p8}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "09" && (
                    <Card.Img
                      variant="top"
                      src={p9}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "10" && (
                    <Card.Img
                      variant="top"
                      src={p10}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "11" && (
                    <Card.Img
                      variant="top"
                      src={p11}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "12" && (
                    <Card.Img
                      variant="top"
                      src={p12}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "13" && (
                    <Card.Img
                      variant="top"
                      src={p13}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "14" && (
                    <Card.Img
                      variant="top"
                      src={p14}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "15" && (
                    <Card.Img
                      variant="top"
                      src={p15}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "16" && (
                    <Card.Img
                      variant="top"
                      src={p16}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "17" && (
                    <Card.Img
                      variant="top"
                      src={p17}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "18" && (
                    <Card.Img
                      variant="top"
                      src={p18}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "19" && (
                    <Card.Img
                      variant="top"
                      src={p19}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "20" && (
                    <Card.Img
                      variant="top"
                      src={p20}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "21" && (
                    <Card.Img
                      variant="top"
                      src={p21}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "22" && (
                    <Card.Img
                      variant="top"
                      src={p22}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "23" && (
                    <Card.Img
                      variant="top"
                      src={p23}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "24" && (
                    <Card.Img
                      variant="top"
                      src={p24}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "25" && (
                    <Card.Img
                      variant="top"
                      src={p25}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "26" && (
                    <Card.Img
                      variant="top"
                      src={p26}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "27" && (
                    <Card.Img
                      variant="top"
                      src={p27}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "28" && (
                    <Card.Img
                      variant="top"
                      src={p28}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "29" && (
                    <Card.Img
                      variant="top"
                      src={p29}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "30" && (
                    <Card.Img
                      variant="top"
                      src={p30}
                      style={{ height: "50%" }}
                    />
                  )}
                  {event.date.slice(8, 10) === "31" && (
                    <Card.Img
                      variant="top"
                      src={p31}
                      style={{ height: "50%" }}
                    />
                  )}

                  <h6 style={{ textAlign: "center" }}>
                    {event.date.slice(0, 10)}
                  </h6>

                  <Card.Body>
                    <Card.Text style={{ color: "red", fontSize: "15px" }}>
                      -
                    </Card.Text>
                    <Card.Text style={{ color: "green", fontSize: "15px" }}>
                      -
                    </Card.Text>
                    <Card.Text style={{ color: "green", fontSize: "15px" }}>
                      -
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            } else {
              return (
                <div>
                  <Card
                    onClick={() => handleShow(event.date)}
                    style={{
                      width: "14%",
                      float: "left",
                      position: "revert",
                      cursor: "pointer",
                      margin: "0.14%",
                      height: "310px",
                    }}
                  >
                    {event.date.slice(8, 10) === "01" && (
                      <Card.Img
                        variant="top"
                        src={p1}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "02" && (
                      <Card.Img
                        variant="top"
                        src={p2}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "03" && (
                      <Card.Img
                        variant="top"
                        src={p3}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "04" && (
                      <Card.Img
                        variant="top"
                        src={p4}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "05" && (
                      <Card.Img
                        variant="top"
                        src={p5}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "06" && (
                      <Card.Img
                        variant="top"
                        src={p6}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "07" && (
                      <Card.Img
                        variant="top"
                        src={p7}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "08" && (
                      <Card.Img
                        variant="top"
                        src={p8}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "09" && (
                      <Card.Img
                        variant="top"
                        src={p9}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "10" && (
                      <Card.Img
                        variant="top"
                        src={p10}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "11" && (
                      <Card.Img
                        variant="top"
                        src={p11}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "12" && (
                      <Card.Img
                        variant="top"
                        src={p12}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "13" && (
                      <Card.Img
                        variant="top"
                        src={p13}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "14" && (
                      <Card.Img
                        variant="top"
                        src={p14}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "15" && (
                      <Card.Img
                        variant="top"
                        src={p15}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "16" && (
                      <Card.Img
                        variant="top"
                        src={p16}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "17" && (
                      <Card.Img
                        variant="top"
                        src={p17}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "18" && (
                      <Card.Img
                        variant="top"
                        src={p18}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "19" && (
                      <Card.Img
                        variant="top"
                        src={p19}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "20" && (
                      <Card.Img
                        variant="top"
                        src={p20}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "21" && (
                      <Card.Img
                        variant="top"
                        src={p21}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "22" && (
                      <Card.Img
                        variant="top"
                        src={p22}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "23" && (
                      <Card.Img
                        variant="top"
                        src={p23}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "24" && (
                      <Card.Img
                        variant="top"
                        src={p24}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "25" && (
                      <Card.Img
                        variant="top"
                        src={p25}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "26" && (
                      <Card.Img
                        variant="top"
                        src={p26}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "27" && (
                      <Card.Img
                        variant="top"
                        src={p27}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "28" && (
                      <Card.Img
                        variant="top"
                        src={p28}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "29" && (
                      <Card.Img
                        variant="top"
                        src={p29}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "30" && (
                      <Card.Img
                        variant="top"
                        src={p30}
                        style={{ height: "50%" }}
                      />
                    )}
                    {event.date.slice(8, 10) === "31" && (
                      <Card.Img
                        variant="top"
                        src={p31}
                        style={{ height: "50%" }}
                      />
                    )}
                    <h6 style={{ textAlign: "center" }}>
                      {event.date.slice(0, 10)}
                    </h6>
                    <Card.Body>
                      {event.eventList.slice(0, 3).map((eve) => {
                        if (eve.eventType === "FEEDING") {
                          return (
                            <Card.Text
                              style={{ color: "orange", fontSize: "15px" }}
                            >
                              <BiCheckCircle /> {eve.name.slice(0, 15)}
                            </Card.Text>
                          );
                        } else if (eve.eventType === "COMBING") {
                          return (
                            <Card.Text
                              style={{ color: "brown", fontSize: "15px" }}
                            >
                              <BiCheckCircle /> {eve.name.slice(0, 15)}
                            </Card.Text>
                          );
                        } else if (eve.eventType === "VACCINATION") {
                          return (
                            <Card.Text
                              style={{ color: "red", fontSize: "15px" }}
                            >
                              <BiCheckCircle /> {eve.name.slice(0, 15)}
                            </Card.Text>
                          );
                        } else if (eve.eventType === "WALKING") {
                          return (
                            <Card.Text
                              style={{ color: "green", fontSize: "15px" }}
                            >
                              <BiCheckCircle /> {eve.name.slice(0, 15)}
                            </Card.Text>
                          );
                        }
                      })}
                    </Card.Body>
                  </Card>
                </div>
              );
            }
          })}
        </div>
        <br></br>
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <a
            style={{
              fontWeight: "bold",
              fontSize: "70px",
            }}
          >
            Events history
          </a>
        </div>
        <br />
        <br />

        <div
          style={{
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "40px",
          }}
        >
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Event type</th>
                <th>Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {deprecatedEvents.slice(0, 5).map((event, index) => {
                if (event.eventType === "VACCINATION") {
                  return (
                    <tr key={index}>
                      <td>
                        <div
                          style={{
                            backgroundColor: "#DC3545",
                            width: "50%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: "15px",
                          }}
                        >
                          {event.eventType}
                        </div>
                      </td>
                      <td>{event.name}</td>
                      <td>{event.date.slice(0, 10)}</td>
                    </tr>
                  );
                } else if (event.eventType === "COMBING") {
                  return (
                    <tr>
                      <td>
                        <div
                          style={{
                            backgroundColor: "brown",
                            width: "50%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: "15px",
                          }}
                        >
                          {event.eventType}
                        </div>
                      </td>
                      <td>{event.name}</td>
                      <td>{event.date.slice(0, 10)}</td>
                    </tr>
                  );
                } else if (event.eventType === "FEEDING") {
                  return (
                    <tr>
                      <td>
                        <div
                          style={{
                            backgroundColor: "orange",
                            width: "50%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: "15px",
                          }}
                        >
                          {event.eventType}
                        </div>
                      </td>
                      <td>{event.name}</td>
                      <td>{event.date.slice(0, 10)}</td>
                    </tr>
                  );
                } else if (event.eventType === "WALKING") {
                  return (
                    <tr>
                      <td>
                        <div
                          style={{
                            backgroundColor: "#5e9144",
                            width: "50%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: "15px",
                          }}
                        >
                          {event.eventType}
                        </div>
                      </td>
                      <td>{event.name}</td>
                      <td>{event.date.slice(0, 10)}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <BiCalendar />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "center" }}>
              <h4>{new String(eventDate).slice(0, 10)}</h4>
            </div>
            <div
              className="scrollable-div"
              style={{ height: "200px", width: "98%", marginLeft: "-1%" }}
            >
              <Table>
                <tbody>
                  {eventsInDay.map((dayEvent, index) => {
                    if (dayEvent.eventType === "FEEDING") {
                      return (
                        <tr style={{ borderColor: "transparent" }} key={index}>
                          <td>
                            <BiCheckCircle style={{ color: "orange" }} />{" "}
                            {dayEvent.name}
                          </td>
                          <td style={{ float: "right" }}>
                            <BiShare
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => shareEvent(dayEvent.name)}
                            />
                            <BiTrash
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteEvent(dayEvent.name)}
                            />
                          </td>
                        </tr>
                      );
                    } else if (dayEvent.eventType === "COMBING") {
                      return (
                        <tr style={{ borderColor: "transparent" }}>
                          <td>
                            <BiCheckCircle style={{ color: "brown" }} />{" "}
                            {dayEvent.name}
                          </td>
                          <td style={{ float: "right" }}>
                            <BiShare
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => shareEvent(dayEvent.name)}
                            />
                            <BiTrash
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteEvent(dayEvent.name)}
                            />
                          </td>
                        </tr>
                      );
                    } else if (dayEvent.eventType === "VACCINATION") {
                      return (
                        <tr style={{ borderColor: "transparent" }}>
                          <td>
                            <BiCheckCircle style={{ color: "red" }} />{" "}
                            {dayEvent.name}
                          </td>
                          <td style={{ float: "right" }}>
                            <BiShare
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => shareEvent(dayEvent.name)}
                            />
                            <BiTrash
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteEvent(dayEvent.name)}
                            />
                          </td>
                        </tr>
                      );
                    } else if (dayEvent.eventType === "WALKING") {
                      return (
                        <tr style={{ borderColor: "transparent" }}>
                          <td>
                            <BiCheckCircle style={{ color: "green" }} />{" "}
                            {dayEvent.name}
                          </td>
                          <td style={{ float: "right" }}>
                            <BiShare
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => shareEvent(dayEvent.name)}
                            />
                            <BiTrash
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteEvent(dayEvent.name)}
                            />
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </Table>
            </div>
            <div>
              <Form>
                <Form.Group className="mb-3">
                  <Dropdown onSelect={handleFormType}>
                    <Dropdown.Toggle
                      id="typeToggle"
                      variant="light"
                      style={{ width: "100%" }}
                    >
                      {selectedType.toLowerCase().charAt(0).toUpperCase() +
                        selectedType.toLowerCase().slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: "100%" }}>
                      <Dropdown.Item eventKey="VACCINATION">
                        Vaccination
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="FEEDING">Feeding</Dropdown.Item>
                      <Dropdown.Item eventKey="COMBING">Combing</Dropdown.Item>
                      <Dropdown.Item eventKey="WALKING">Walking</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Form.Text
                    className="text-muted"
                    onChange={() => setEventFormName()}
                  >
                    Select an event type.
                  </Form.Text>
                </Form.Group>

                {isVaccination ? (
                  <div>
                    <Form.Group className="mb-3">
                      <Dropdown onSelect={handleVaccination}>
                        <Dropdown.Toggle
                          id="vaccinationToggle"
                          variant="light"
                          style={{ width: "100%" }}
                        >
                          {selectedVaccination
                            .toLowerCase()
                            .charAt(0)
                            .toUpperCase() +
                            selectedVaccination.toLowerCase().slice(1)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: "100%" }}>
                          {vaccinations.map((vaccination, index) => {
                            return (
                              <Dropdown.Item
                                key={index}
                                eventKey={vaccination.name}
                              >
                                {vaccination.name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </div>
                ) : (
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Control
                        id="nameInput"
                        placeholder="Event name"
                        onChange={(e) => handleFormName(e.target.value)}
                      />
                    </Form.Group>
                    {nameError && <Alert variant="danger">{nameError}</Alert>}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Dropdown onSelect={handleFormFrequency}>
                        <Dropdown.Toggle
                          id="frequencyToggle"
                          variant="light"
                          style={{ width: "100%" }}
                        >
                          {frequency.toLowerCase().charAt(0).toUpperCase() +
                            frequency.toLowerCase().slice(1)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: "100%" }}>
                          <Dropdown.Item eventKey="once">Once</Dropdown.Item>
                          <Dropdown.Item eventKey="everyday">
                            Everyday
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="everyweek">
                            Every Week
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="everymonth">
                            Every Month
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Form.Text className="text-muted">
                        Select a frequency.
                      </Form.Text>
                    </Form.Group>
                  </div>
                )}

                <Button
                  variant="success"
                  onClick={() => eventCreation()}
                  style={{ float: "right" }}
                >
                  Create
                </Button>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        <Modal show={updateShow} onHide={handleUpdateClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <BiBookmarkPlus />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form>
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Enter the animal's name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  ></input>
                </div>
                {nameError && <Alert variant="danger">{nameError}</Alert>}
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    min={0}
                    max={1000}
                    className="form-control"
                    placeholder="Enter the animal's weight"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  ></input>
                </div>
                {weightError && <Alert variant="danger">{weightError}</Alert>}
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    min={0}
                    max={1000}
                    className="form-control"
                    placeholder="Enter the animal's age"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  ></input>
                </div>
                {ageError && <Alert variant="danger">{ageError}</Alert>}

                <Form.Group className="mb-3">
                  <Dropdown onSelect={handleAnimalGender}>
                    <Dropdown.Toggle
                      id="genderToggle"
                      variant="light"
                      style={{ width: "100%" }}
                    >
                      {gender.toLowerCase().charAt(0).toUpperCase() +
                        gender.toLowerCase().slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: "100%" }}>
                      <Dropdown.Item eventKey="FEMALE">Female</Dropdown.Item>
                      <Dropdown.Item eventKey="MALE">Male</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Form.Text className="text-muted">
                    Select an animal gender.
                  </Form.Text>
                </Form.Group>

                <br></br>
                <Form.Text className="text-muted">
                  Choose a picture of an animal
                  <BiLinkAlt
                    id="clip"
                    style={{ width: "25px", height: "25px", cursor: "pointer" }}
                    onClick={() => fileHandler()}
                  />
                </Form.Text>
                {fileError && <Alert variant="danger">{fileError}</Alert>}
                <Button
                  variant="success"
                  onClick={() => handleAnimalUpdate()}
                  style={{ float: "right" }}
                >
                  Create
                </Button>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        <Modal show={checkShow} onHide={handleCheckClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <BiBookmarkPlus />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "center" }}>
              <h5>Vaccination reminder</h5>
              <a style={{ color: "grey" }}>
                Vaccination date is approaching, take care of your dog
              </a>
              <br />
              <br />
              <h5>
                <strong>{checkModalValue}</strong>
              </h5>
              <br />
              <div>
                <Calendar
                  onChange={onChange}
                  value={value}
                  minDate={minDate}
                  maxDate={maxDate}
                  locale="en-GB"
                  onClickDay={handleDayClick}
                />
              </div>
              <br />
              <h6>{selectedCheckDay.toString().slice(0, 15)}</h6>
              {dateError && <Alert variant="danger">{dateError}</Alert>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => handleSaveVaccination()}>
              Save
            </Button>
            <Button variant="danger" onClick={() => handleCheckClose()}>
              Skip
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "50px",
          height: "auto",
          backgroundColor: "#212529",
          float: "left",
          bottom: "0",
        }}
      >
        <hr
          style={{
            color: "white",
            backgroundColor: "white",
            height: 0.5,
            borderColor: "white",
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <p style={{ color: "white", textAlign: "center", fontSize: "12px" }}>
          &copy; Copyright Pets 2022, Inc. All rights reserved.
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PetDetails;
