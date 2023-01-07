import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import petService from "../services/pet.service";
import Button from "react-bootstrap/Button";
import { BiPlus, BiSearchAlt, BiBookmarkPlus, BiLinkAlt } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import AnimalCard from "./AnimalCard";
import navbarService from "./navbar.service";

const Collections = () => {
  const [animals, setAnimals] = useState([]);
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

  var binaryData = [];
  var animalType = "OTHER";
  var gender = "MALE";
  var animalImage;

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

  function validateName(name) {
    if (name.length === 0) {
      setNameError("The name cannot be empty.");
      return false;
    }
    if (name.length < 1 || name.length > 15) {
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

  useEffect(() => {
    getAllUserAnimals();
    loadAvatar();
  }, []);

  binaryData.push(image);

  return (
    <div
      style={{
        backgroundColor: "#787271",
        width: "100%",
        minHeight: "950px",
        overflow: "hidden",
      }}
      className="Auth-form-container"
    >
      <NavbarComponent image={binaryData} />

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
                  placeholder="Enter the animal's name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                ></input>
              </div>
              {nameError && (
                <p style={{ color: "red", fontSize: "14px", margin: "1px" }}>
                  {nameError}
                </p>
              )}
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
              {weightError && (
                <p style={{ color: "red", fontSize: "14px", margin: "1px" }}>
                  {weightError}
                </p>
              )}
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
              {ageError && (
                <p style={{ color: "red", fontSize: "14px", margin: "1px" }}>
                  {ageError}
                </p>
              )}
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
                    <Dropdown.Item eventKey="OTHER">Other</Dropdown.Item>
                    <Dropdown.Item eventKey="DOGS">Dogs</Dropdown.Item>
                    <Dropdown.Item eventKey="CATS">Cats</Dropdown.Item>
                    <Dropdown.Item eventKey="BIRDS">Birds</Dropdown.Item>
                    <Dropdown.Item eventKey="FISH">Fish</Dropdown.Item>
                    <Dropdown.Item eventKey="REPTILES">Reptiles</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Text className="text-muted">
                  Select an animal type.
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
              {fileError && (
                <p style={{ color: "red", fontSize: "14px", margin: "1px" }}>
                  {fileError}
                </p>
              )}

              <Button
                variant="success"
                onClick={() => handleAnimalCreation()}
                style={{ float: "right" }}
              >
                Create
              </Button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

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
              marginBottom:"30px",
              width: "80%",
              height: "100px",
              marginLeft: "auto",
              marginRight: "auto",
              
              boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)"
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
                }}
              />

              <Form.Control
                type="text"
                placeholder="Search..."
                style={{
                  float: "left",
                  width: "70%",
                  marginTop: "30px",
                  marginLeft: "2%",
                }}
              />
              <Button
                variant="success"
                style={{
                  float: "right",
                  marginRight: "30px",
                  marginTop: "30px",
                }}
                onClick={handleShow}
              >
                <BiPlus /> Create animal
              </Button>
            </div>
          </div>
          <div style={{display:"block", borderBottom:"0.5px solid #9E9E9E", marginBottom:"5px", marginTop:"10px",  width: "90%", marginLeft: "auto", marginRight: "auto"}}></div>
          <div style={{ margin: "1%", float: "left", minHeight: "800px" }}>
            {animals.map((animal, index) => {
              console.log(animal);
              return (
                <AnimalCard
                  index={index}
                  id={animal.id}
                  name={animal.name}
                  age={animal.age}
                  weight={animal.weight}
                />
              );
            })}
          </div>
          <div
            style={{
              width: "100%",
              height: "100px",
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
            <p style={{ color: "white", textAlign: "center" }}>
              &copy; Copyright Pets 2022, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
