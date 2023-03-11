import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import petService from "../services/pet.service";
import Button from "react-bootstrap/Button";
import {
  BiPlus,
  BiSearchAlt,
  BiBookmarkPlus,
  BiLinkAlt,
  BiInfoCircle,
} from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import navbarService from "./navbar.service";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { ToastContainer, toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import dogForTab1 from "./photos/gallery_photo/photo1.png";
import dogForTab2 from "./photos/gallery_photo/photo2.png";
import dogForTab3 from "./photos/gallery_photo/photo3.png";
import dogForTab4 from "./photos/gallery_photo/photo4.png";

import photo1 from "./photos/gallery_photo/photo1.png";
import photo2 from "./photos/gallery_photo/photo2.png";
import photo3 from "./photos/gallery_photo/photo3.png";
import photo4 from "./photos/gallery_photo/photo4.png";
import photo5 from "./photos/gallery_photo/photo5.png";
import photo6 from "./photos/gallery_photo/photo6.png";
import photo7 from "./photos/gallery_photo/photo7.png";
import photo8 from "./photos/gallery_photo/photo8.png";

import dogp from "./photos/gallery_photo/dogp.png";

import dogg1 from "./photos/gallery_photo/dogg1.png";
import dogg2 from "./photos/gallery_photo/dogg2.png";
import dogg3 from "./photos/gallery_photo/dogg3.png";

import Carousel from "react-bootstrap/Carousel";

import szk1krok1 from "../components/photos/gif/szkolenie1_krok1.gif";
import szk1krok2 from "../components/photos/gif/szkolenie1_krok2.gif";
import szk2krok3 from "../components/photos/gif/szkolenie2_krok3.gif";
import szk2krok1 from "../components/photos/gif/szkolenie2_krok1.gif";
import szk2krok2 from "../components/photos/gif/szkolenie2_krok2.gif";
import szk3krok1 from "../components/photos/gif/szkolenie3_krok1.gif";
import szk3krok2 from "../components/photos/gif/szkolenie3_krok2.gif";
import szk4krok1 from "../components/photos/gif/szk4krok1.gif";
import szk4krok2 from "../components/photos/gif/szk4krok2.gif";
import szk4krok3 from "../components/photos/gif/szk4krok3.gif";

import smakolyk from "../components/photos/gallery_photo/smakolyk.png";

import szkoleniepsa1 from "../components/photos/gallery_photo/szkoleniepsa1.png";
import szkoleniepsa2 from "../components/photos/gallery_photo/szkoleniepsa2.png";
import szkoleniepsa3 from "../components/photos/gallery_photo/szkoleniepsa3.png";
import szkoleniepsa4 from "../components/photos/gallery_photo/szkoleniepsa4.png";

const Pets = () => {
  const [animals, setAnimals] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [image, setImage] = useState([]);

  const [nameError, setNameError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [fileError, setFileError] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState();

  const navigate = useNavigate();

  var binaryData = [];
  var animalType = "brak";
  var gender = "SAMIEC";
  var animalImage;

  const petNotFoundNotify = () => toast.error("Nie znaleziono zwierzaka.");

  const loadAvatar = () => {
    navbarService.getUserImage().then(
      (response) => {
        setImage(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const deleteAnimal = (id) => {
    petService.deleteAnimal(id).then(
      () => {
        window.location.reload(true);
      },
      (error) => {
        console.log(error);
      }
    );
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

  const handleAnimalType = (selectedAnimalType) => {
    animalType = selectedAnimalType;
    document.getElementById("animalTypeToggle").textContent =
      selectedAnimalType.toLowerCase().charAt(0).toUpperCase() +
      selectedAnimalType.toLowerCase().slice(1);
  };

  const handleAnimalGender = (selectedAnimalGender) => {
    gender = selectedAnimalGender;
    document.getElementById("genderToggle").textContent =
      selectedAnimalGender.toLowerCase().charAt(0).toUpperCase() +
      selectedAnimalGender.toLowerCase().slice(1);
  };

  const handleAnimalCreation = async (e) => {
    if (
      validateName(name) &&
      validateWeight(weight) &&
      validateAge(age) &&
      validateFile(animalImage)
    ) {
      try {
        await petService
          .createAnimal(name, animalType, age, weight, gender, animalImage)
          .then(
            () => {
              getAllUserAnimals();
              handleClose();
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

  const getAllUserAnimals = () => {
    petService.getUserAnimals().then(
      (response) => {
        setAnimals(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getBreeds = () => {
    petService.getBreeds().then(
      (response) => {
        setBreeds(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  function validateName(name) {
    if (name.length === 0) {
      setNameError("Imię nie może być puste.");
      return false;
    } else if (name.length < 1 || name.length > 15) {
      setNameError("Nieodpowiednia długość.");
      return false;
    } else if (name.match(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/)) {
      setNameError("Nazwa może zawierać tylko literę.");
      return false;
    }
    setNameError(null);
    return true;
  }

  function validateWeight(weight) {
    if (weight === undefined) {
      setWeightError("Waga nie może być pusta.");
      return false;
    } else if (weight < 0) {
      setWeightError("Waga nie może być mniejsza niż 0.");
      return false;
    }
    setWeightError(null);
    return true;
  }

  function validateAge(age) {
    if (age === undefined) {
      setAgeError("Wiek nie może być pusty.");
      return false;
    } else if (age < 0) {
      setAgeError("Wiek nie może być mniejszy niż 0.");
      return false;
    }
    setAgeError(null);
    return true;
  }

  function validateFile(file) {
    if (file === undefined) {
      setFileError("Plik nie może być pusty.");
      return false;
    }
    setFileError(null);
    return true;
  }

  const handleSearch = async () => {
    var foundAnimals;
    if (searchValue === "") {
      foundAnimals = await petService.findAnimalsByName("emptySearchBar");
    } else {
      foundAnimals = await petService.findAnimalsByName(searchValue);
    }

    if (foundAnimals.data.length === 0) {
      setSearchResult(
        <div
          style={{
            backgroundColor: "#e1e5eb",
            width: "80%",
            height: "auto",
            minHeight: "100px",
            marginLeft: "auto",
            marginBottom: "20px",
            marginRight: "auto",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
          }}
        ></div>
      );
    }
    if (foundAnimals.data.length > 0) {
      setSearchResult(
        <div
          style={{
            backgroundColor: "#e1e5eb",
            width: "80%",
            overflow: "hidden",
            minHeight: "450px",
            marginBottom: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
          }}
        >
          {foundAnimals.data.slice(0, 5).map((animal, index) => {
            return (
              <Card
                key={index}
                style={{
                  width: "14.5%",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                }}
              >
                <Card.Img
                  variant="top"
                  style={{ height: "10%" }}
                  src={"data:image/png;base64," + animal.photo}
                />
                <Card.Body>
                  <Card.Title>{animal.name}</Card.Title>
                  <Card.Text>
                    <a>Age: </a>
                    <strong>{animal.age}</strong>
                    <br></br>
                    <a>Weight: </a>
                    <strong>{animal.weight}</strong>
                  </Card.Text>
                  <div style={{ alignSelf: "flex-end", height: "50px" }}>
                    <BiInfoCircle
                      style={{
                        width: "35px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/petDetails", {
                          state: {
                            petId: animal.id,
                            petImage: animal.photo,
                            animal: animal,
                            animalBreed: animal.animalBreed,
                          },
                        });
                      }}
                    />
                    <Button
                      style={{ float: "right" }}
                      variant="danger"
                      onClick={() => deleteAnimal(animal.id)}
                    >
                      Usuń
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      );
    } else {
      setSearchResult();
      petNotFoundNotify();
    }
  };

  binaryData.push(image);

  useEffect(() => {
    loadAvatar();
    getAllUserAnimals();
    getBreeds();
  }, []);

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

      <div>
        <div
          style={{
            width: "100%",
            height: "100%",
            float: "left",
            marginTop: "100px",
            position: "initial",
          }}
        >
          <br />
          <a style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}>
            Szkolenia dla psa
          </a>
          <br />
          <br />
          <div style={{ width: "100%", backgroundColor: "#E1E5EB" }}>
            <div
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              <br></br>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={8}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Jak nauczyć psa komendy "DO MNIE"
                        </h4>
                        <a style={{ color: "#212529", fontWeight: "bold" }}>
                          Potrzebne rzeczy:
                        </a>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#212529",
                              textJustify: "inter-word",
                              fontWeight: "bold",
                            }}
                          >
                            Smycz
                          </a>
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#212529",
                              textJustify: "inter-word",
                              fontWeight: "bold",
                            }}
                          >
                            Ulubiony smakołyk
                          </a>
                        </div>
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 1. Cofając się, przywołaj psa
                        </h4>
                        <br></br>
                        <img
                          src={szk1krok1}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 2. Zawołaj psa i oddal się od niego
                        </h4>
                        <br></br>
                        <img
                          src={szk1krok2}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 3. Stosuj różne nagrody
                        </h4>
                        <br></br>
                        <img
                          src={smakolyk}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Jak nauczyć psa reagować na komendę "NIE"
                        </h4>
                        <a style={{ color: "#212529", fontWeight: "bold" }}>
                          Potrzebne rzeczy:
                        </a>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#212529",
                              textJustify: "inter-word",
                              fontWeight: "bold",
                            }}
                          >
                            Smycz
                          </a>
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#212529",
                              textJustify: "inter-word",
                              fontWeight: "bold",
                            }}
                          >
                            Ulubiony smakołyk
                          </a>
                        </div>
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 1. Połóż smakołyk i nie dopuść aby, by pies go
                          zjadł
                        </h4>
                        <br></br>
                        <img
                          src={szk2krok1}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 2. Komendę "nie" trenuj w pozycji stojącej
                        </h4>
                        <br></br>
                        <img
                          src={szk2krok2}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 3. Połóż smakołyk i oddal się
                        </h4>
                        <br></br>
                        <img
                          src={szk2krok3}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br></br>
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 4. Ćwicz komendę "nie" w życiu codziennym
                        </h4>
                        <br></br>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Sztuczka "turlanie"
                        </h4>
                        <a style={{ color: "#212529", fontWeight: "bold" }}>
                          Potrzebne rzeczy:
                        </a>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#212529",
                              textJustify: "inter-word",
                              fontWeight: "bold",
                            }}
                          >
                            Ulubiony smakołyk
                          </a>
                        </div>
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 1. Naprowadzaj pupila ulubionymi przysmakami
                        </h4>
                        <br></br>
                        <img
                          src={szk3krok1}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br />

                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 2. Naprowadzaj psa pustą ręką
                        </h4>
                        <br></br>
                        <img
                          src={szk3krok2}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br></br>
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 3. Dodaj komendę słowną i ogranicz gest
                        </h4>
                        <br />
                        <br />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <br />
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Sztuczka "Przynieś"
                        </h4>
                        <a style={{ color: "#212529", fontWeight: "bold" }}>
                          Potrzebne rzeczy:
                        </a>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#212529",
                              textJustify: "inter-word",
                              fontWeight: "bold",
                            }}
                          >
                            Ulubiony smakołyk
                          </a>
                        </div>
                        <br />

                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#212529",
                              textJustify: "inter-word",
                              fontWeight: "bold",
                            }}
                          >
                            Miękki przedmiot
                          </a>
                        </div>
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 1. Zainteresowanie psa przedmiotem
                        </h4>
                        <br></br>
                        <img
                          src={szk4krok1}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br />

                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 2. Dotykanie przedmiotu pyskiem
                        </h4>
                        <br></br>
                        <img
                          src={szk4krok2}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br></br>
                        <br />
                        <h4 style={{ color: "#212529", fontWeight: "bold" }}>
                          Krok 3. Wydłużanie czasu trzymania przedmiotu
                        </h4>
                        <br></br>
                        <img
                          src={szk4krok3}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br></br>
                        <br />
                        <br />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                  <Col sm={4}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <div style={{ display: "flex" }}>
                            <img
                              src={szkoleniepsa1}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#212529",
                                  fontWeight: "bold",
                                }}
                              >
                                Jak nauczyć psa komendy "DO MNIE"
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <div style={{ display: "flex" }}>
                            <img
                              src={szkoleniepsa2}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#212529",
                                  fontWeight: "bold",
                                }}
                              >
                                Jak nauczyć psa reagować na komendę "NIE"
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          <div style={{ display: "flex" }}>
                            <img
                              src={szkoleniepsa3}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#212529",
                                  fontWeight: "bold",
                                }}
                              >
                                Sztuczka "Turalnie"
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">
                          <div style={{ display: "flex" }}>
                            <img
                              src={szkoleniepsa4}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#212529",
                                  fontWeight: "bold",
                                }}
                              >
                                Sztuczka "Przynieś"
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
              </Tab.Container>
              <br></br>
            </div>
          </div>
          <br />

          <div
            style={{
              width: "780px",
              marginLeft: "auto",
              marginRight: "auto",
              zIndex: "0",
            }}
          >
            <Carousel variant="dark">
              <Carousel.Item>
                <img className="d-block w-100" src={photo1} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={photo2} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={photo3} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={photo4} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={photo5} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={photo6} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={photo7}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={photo8} alt="Third slide" />
              </Carousel.Item>
            </Carousel>
          </div>
          <br />
          <br />
          <a style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}>
            Sport dla psa
          </a>
          <br />
          <br />
          <div style={{ width: "100%", backgroundColor: "#125137" }}>
            <div
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              <br></br>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={7}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <br />
                        <br />
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Dla psów
                        </h4>
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Poprawiają kondycję i wytrzymałość fizyczną, co może
                            przyczynić się do poprawy zdrowia i dłuższego życia
                            psa.
                          </a>
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>

                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Dają psu okazję do spędzenia czasu na świeżym
                            powietrzu, co może wpłynąć pozytywnie na jego
                            samopoczucie i nastrój.
                          </a>
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Poprawiają relacje między właścicielem a psem,
                            ponieważ sporty te wymagają współpracy i
                            zaangażowania ze strony obu stron.
                          </a>
                        </div>
                        <br />
                        <br />
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Dla właścicieli
                        </h4>
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Umożliwiają spędzenie czasu na świeżym powietrzu w
                            towarzystwie swojego pupila, co może przyczynić się
                            do poprawy zdrowia i samopoczucia właściciela.
                          </a>
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>

                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Mogą pomóc w redukcji stresu, ponieważ aktywność
                            fizyczna uwalnia endorfiny, które wpływają
                            pozytywnie na nastrój.
                          </a>
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Wymagają zaangażowania i interakcji z psem, co może
                            pomóc w lepszym zrozumieniu jego zachowania i
                            potrzeb.
                          </a>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <br />
                        <img
                          src={dogp}
                          style={{
                            width: "600px",
                            borderRadius: "20px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        ></img>
                        <br />
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            <strong>Spacer:</strong> Regularne spacery to
                            podstawa aktywności fizycznej dla psów. Postaraj się
                            zabrać swojego pupila na co najmniej 30-minutowy
                            spacer każdego dnia.
                          </a>
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            <strong>Bieganie:</strong> Jeśli masz psa, który
                            uwielbia biegać, rozważ bieganie z nim. Zacznij od
                            krótkich dystansów, a następnie stopniowo zwiększaj
                            czas i dystans.
                          </a>
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            <strong>Zabawa z piłką lub frisbee:</strong> Wiele
                            psów uwielbia biegać za piłką lub frisbee. To
                            świetna zabawa i doskonały sposób na zwiększenie
                            aktywności fizycznej twojego psa.
                          </a>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Przed rozpoczęciem jakiejkolwiek aktywności
                            fizycznej z twoim psem, skonsultuj się z
                            weterynarzem, aby upewnić się, że twój pies jest w
                            dobrej kondycji i gotowy do uprawiania sportów.
                          </a>
                        </div>
                        <br />

                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Zawsze zapewnij swojemu psu odpowiednią ochronę. W
                            zależności od rodzaju sportu, może to oznaczać
                            założenie ochraniaczy na łapy, kasku ochronnym na
                            głowę, kamizelki odblaskowej lub kamizelki
                            ratunkowej w przypadku pływania. Upewnij się, że
                            wszystkie sprzęty są odpowiednio dopasowane do
                            rozmiaru twojego psa.
                          </a>
                        </div>
                        <br />

                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Rozgrzewaj swojego psa przed każdą aktywnością
                            fizyczną. Krótki spacer lub bieg, a także kilka
                            ćwiczeń rozgrzewających, pomogą zmniejszyć ryzyko
                            kontuzji.
                          </a>
                        </div>
                        <br />

                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            Uważaj na warunki pogodowe. Upewnij się, że twojemu
                            psu nie jest ani za gorąco, ani za zimno, a także
                            unikaj uprawiania sportów w silnym wietrze, ulewnym
                            deszczu lub burzy.
                          </a>
                        </div>
                        <br />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            <strong>Agility</strong> - to dynamiczny i
                            wymagający sport, w którym pies musi pokonywać
                            różnego rodzaju przeszkody na czas. Jest to świetny
                            sposób, aby poprawić kondycję psa, a także zwiększyć
                            jego zdolność do koncentracji i współpracy z
                            właścicielem.
                          </a>
                        </div>
                        <br />

                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "20px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            <strong>Canicross</strong> - to bieganie z psem, w
                            którym pies ciągnie właściciela za pomocą
                            specjalnego pasa. Jest to idealny sport dla psów o
                            dużej energii, które lubią biegać i potrzebują dużo
                            ruchu.
                          </a>
                        </div>

                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "20px",
                              textAlign: "justify",
                              marginLeft: "10px",
                              color: "#7ECE68",
                              textJustify: "inter-word",
                            }}
                          >
                            <strong>Flyball</strong> - to szybki i ekscytujący
                            sport, w którym psi zespół musi przebiec tor,
                            przeskoczyć przeszkody i zebrać piłki tenisowe, a
                            następnie wrócić do startu. Jest to świetny sposób,
                            aby poprawić refleks psa i zwiększyć jego zwinność.
                          </a>
                        </div>

                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>

                          <a
                            style={{
                              fontSize: "20px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            <strong>Frisbee</strong> - to gra z frisbee, w
                            której pies musi złapać frisbee rzucony przez
                            właściciela. Jest to idealny sport dla psów, które
                            lubią biegać i łapać rzeczy w locie.
                          </a>
                        </div>

                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "20px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            <strong>Rally obedience</strong> - to sport, w
                            którym pies musi wykonać różnego rodzaju polecenia i
                            manewry na czas. Jest to idealny sposób, aby
                            zwiększyć posłuszeństwo psa i jego zdolność do pracy
                            w grupie.
                          </a>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                  <Col sm={5}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <div style={{ display: "flex" }}>
                            <img
                              src={dogForTab1}
                              style={{ width: "50%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Jakie korzyści przynoszą sporty dla psów zarówno
                                dla nich, jak i dla ich apiekunów
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <div style={{ display: "flex" }}>
                            <img
                              src={dogForTab2}
                              style={{ width: "50%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Jak zwiększyć aktywność fizyczną twojego psa:
                                Propozycje ćwiczeń i zabaw
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          <div style={{ display: "flex" }}>
                            <img
                              src={dogForTab3}
                              style={{ width: "50%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Zasady bezpieczeństwa w sportach dla psów: Jak
                                ochronić twojego pupila przed kontuzjami
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">
                          <div style={{ display: "flex" }}>
                            <img
                              src={dogForTab4}
                              style={{ width: "50%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                5 Najlepszych sportów dla twojego psa: Od
                                Agility po Canicross
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
            <br></br>
          </div>
          <br />
          <a style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}>
            Przydatne porady
          </a>
          <br />
          <br />
          <br />
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "#e1e5eb",
              textAlign: "center",
              display: "flex",
            }}
          >
            <div style={{ width: "33.3%" }}>
              <br></br>
              <img
                src={dogg1}
                style={{
                  width: "50%",
                  borderRadius: "15px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
              ></img>
              <br></br>
              <br></br>

              <div>
                <a style={{ fontWeight: "bold" }}>
                  Wystarczająca ilość ruchu jest niezbędna dla zdrowia psa, a
                  regularne spacery to doskonała okazja, aby zarówno pies, jak i
                  opiekun naładowali baterie.
                </a>
              </div>
            </div>
            <div style={{ width: "33.3%" }}>
              <br></br>
              <img
                src={dogg2}
                style={{
                  width: "50%",
                  borderRadius: "15px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
              ></img>
              <br></br>
              <br></br>

              <div>
                <a style={{ fontWeight: "bold" }}>
                  Karmienie psa zdrową, zbilansowaną dietą jest kluczowe dla
                  jego dobrego samopoczucia i długowieczności. Warto pamiętać,
                  że psy mają różne potrzeby żywieniowe w zależności od rasy,
                  wieku i aktywności fizycznej.
                </a>
              </div>
            </div>
            <div style={{ width: "33.3%" }}>
              <br></br>
              <img
                src={dogg3}
                style={{
                  width: "50%",
                  borderRadius: "15px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
              ></img>
              <br></br>
              <br></br>

              <div>
                <a style={{ fontWeight: "bold" }}>
                  Regularne wizyty u weterynarza pomagają w wykryciu chorób lub
                  innych problemów zdrowotnych u psa na wczesnym etapie, co
                  zwiększa szanse na wyleczenie. Warto również pamiętać o
                  regularnym szczepieniu psa przeciw chorobom zakaźnym.
                </a>
              </div>
            </div>
          </div>
          <br></br>

          <br />
          <a style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}>
            Twoje zwierzęta
          </a>
          <br />
          <br />
          <br />

          <div
            style={{
              backgroundColor: "#e1e5eb",
              marginBottom: "30px",
              width: "80%",
              height: "100px",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
            }}
          >
            <div style={{ marginLeft: "20px" }}>
              <BiSearchAlt
                style={{
                  float: "left",
                  width: "30px",
                  height: "30px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "35px",
                  cursor: "pointer",
                }}
                onClick={() => handleSearch()}
              />

              <Form.Control
                type="text"
                placeholder="Szukaj..."
                style={{
                  float: "left",
                  width: "60%",
                  marginTop: "30px",
                  marginLeft: "2%",
                }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button
                variant="success"
                style={{
                  marginTop: "30px",
                  marginLeft: "13%",
                  width: "10%",
                }}
                onClick={handleShow}
              >
                <BiPlus />
              </Button>
            </div>
          </div>
          {searchResult}
          <div
            style={{
              width: "80%",
              overflow: "auto",
              marginTop: "1%",
              margin: "auto",
              position: "initial",
              minHeight: "3000px",
              backgroundColor: "#e1e5eb",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
            }}
          >
            {animals.map((animal, index) => {
              return (
                <Card
                  key={index}
                  style={{
                    width: "14.5%",
                    height: "auto",
                    minWidth: "18%",
                    float: "left",
                    position: "revert",
                    margin: "1%",
                  }}
                >
                  <Card.Img
                    variant="top"
                    style={{ height: "10%" }}
                    src={"data:image/png;base64," + animal.photo}
                  />
                  <Card.Body>
                    <Card.Title>{animal.name}</Card.Title>
                    <Card.Text>
                      <a>Wiek: </a>
                      <strong>{animal.age + " lat"}</strong>
                      <br></br>
                      <a>Waga: </a>
                      <strong>{animal.weight + " kg"}</strong>
                    </Card.Text>
                    <div style={{ alignSelf: "flex-end", height: "50px" }}>
                      <BiInfoCircle
                        style={{
                          width: "35px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate("/petDetails", {
                            state: {
                              petId: animal.id,
                              petImage: animal.photo,
                              animal: animal,
                              animalBreed: animal.animalBreed,
                            },
                          });
                        }}
                      />
                      <Button
                        style={{ float: "right" }}
                        variant="danger"
                        onClick={() => deleteAnimal(animal.id)}
                      >
                        Usuń
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
          <br />
          <div
            style={{
              width: "100%",
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
            <p
              style={{ color: "white", textAlign: "center", fontSize: "12px" }}
            >
              &copy; Copyright Pets 2022, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
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
                  placeholder="Podaj imię zwierzaka"
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
                  placeholder="Podaj wagę zwierzaka"
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
                  placeholder="Podaj wiek zwierzaka"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                ></input>
              </div>
              {ageError && <Alert variant="danger">{ageError}</Alert>}
              <Form.Group className="mb-3">
                <Dropdown onSelect={handleAnimalType}>
                  <Dropdown.Toggle
                    id="animalTypeToggle"
                    variant="light"
                    style={{ width: "100%" }}
                  >
                    {animalType.toLowerCase().charAt(0).toUpperCase() +
                      animalType.toLowerCase().slice(1)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "100%" }}>
                    {breeds.map((breed, index) => {
                      return (
                        <div key={index}>
                          <Dropdown.Item eventKey={breed.name}>
                            {breed.name}
                          </Dropdown.Item>
                        </div>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Text className="text-muted">
                  Wybierz rasę zwierzaka.
                </Form.Text>
              </Form.Group>

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
                    <Dropdown.Item eventKey="SAMICA">Samica</Dropdown.Item>
                    <Dropdown.Item eventKey="SAMIEC">Samiec</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Text className="text-muted">
                  Wybierz płeć zwierzaka.
                </Form.Text>
              </Form.Group>

              <br></br>
              <Form.Text className="text-muted">
                Wybierz zdjęcie zwierzaka
                <BiLinkAlt
                  id="clip"
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                  onClick={() => fileHandler()}
                />
              </Form.Text>
              {fileError && <Alert variant="danger">{fileError}</Alert>}
              <Button
                variant="success"
                onClick={() => handleAnimalCreation()}
                style={{ float: "right" }}
              >
                Dodaj
              </Button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Pets;
