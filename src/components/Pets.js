import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import petService from "../services/pet.service";
import Button from "react-bootstrap/Button";
import { BiPlus, BiSearchAlt } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import AnimalCard from "./AnimalCard";

const Pets = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [name, setName] = useState("");
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  var animalType = "SHAGGY";
  var gender = "MALE";

  const handleAnimalType = (selectedAnimalType) => {
    animalType = selectedAnimalType;
  };

  const handleAnimalGender = (selectedAnimalGender) => {
    gender = selectedAnimalGender;
  };

  const handleAnimalCreation = async (e) => {
    try {
      await petService.createAnimal(name, animalType, age, weight, gender).then(
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

  useEffect(() => {
    getAllUserAnimals();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#3A3B3C",
        width: "100%",
        minHeight: "950px",
        overflow: "hidden",
      }}
      className="Auth-form-container"
    >
      <NavbarComponent />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Name
              </span>
            </div>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Animal name"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Weight
              </span>
            </div>
            <input
              onChange={(e) => setWeight(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Animal name"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Age
              </span>
            </div>
            <input
              onChange={(e) => setAge(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Animal name"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>

          <Dropdown onSelect={handleAnimalType}>
            <Dropdown.Toggle variant="secondary">Category</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="SHAGGY">SHAGGY</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown onSelect={handleAnimalGender}>
            <Dropdown.Toggle variant="secondary">Gender</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="FEMALE">FEMALE</Dropdown.Item>
              <Dropdown.Item eventKey="MALE">MALE</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br></br>

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">With textarea</span>
            </div>
            <textarea
              className="form-control"
              aria-label="With textarea"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger">Close</Button>
          <Button variant="success" onClick={(e) => handleAnimalCreation()}>
            Create
          </Button>
        </Modal.Footer>
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
              backgroundColor: "#787271",
              width: "60%",
              height: "100px",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "15px",
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
              <h5 style={{ float: "left", marginTop: "35px" }}>Search</h5>
              <Form.Control
                type="text"
                placeholder="Normal text"
                style={{
                  float: "left",
                  width: "500px",
                  marginTop: "30px",
                  marginLeft: "5%",
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
                <BiPlus /> Add pet
              </Button>
            </div>
          </div>
          <div style={{ margin: "1%", float: "left", minHeight: "800px" }}>
            {animals.map((animal, index) => {
              
              return <AnimalCard index={index} id={animal.id} name={animal.name} />;
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

export default Pets;
