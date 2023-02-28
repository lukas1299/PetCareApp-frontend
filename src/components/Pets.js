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
                          state: { petId: animal.id,
                              petImage: animal.photo,
                              animal: animal,
                              animalBreed : animal.animalBreed },
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
                              animalBreed : animal.animalBreed
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
