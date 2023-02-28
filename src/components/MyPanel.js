import React, { useEffect, useState } from "react";
import userProfileService from "../services/userProfile.service";
import Card from "react-bootstrap/Card";
import {
  BiEditAlt,
  BiLeftArrowAlt,
  BiEdit,
  BiLinkAlt,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const MePanel = () => {
  const [animals, setAnimals] = useState([]);
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fileError, setFileError] = useState("");
  const [updateShow, setUpdateShow] = useState(false);
  const handleClose = () => setUpdateShow(false);
  const navigate = useNavigate();
  var userImage;

  const handleUpdateClose = () => setUpdateShow(false);

  const fileHandler = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      var file = e.target.files[0];
      userImage = file;
      document.getElementById("clip").style.color = "#e62e3a";
    };

    input.click();
  };

  const getUser = async () => {
    await userProfileService.getUser().then(
      (response) => {
        setUser(response.data);
        getUserAnimal(response.data.id);
        getUserFriends(response.data.id);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getUserAnimal = async (id) => {
    await userProfileService.getUserAnimals(id).then(
      (response) => {
        setAnimals(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getUserFriends = async (id) => {
    await userProfileService.getUserFriends(id).then(
      (response) => {
        setFriends(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  function validateName() {
    setEmailError(null);
    setFileError(null);
    if (name.length === 0) {
      setNameError("Nazwa nie może być pusta.");
      return false;
    } else if (name.length < 1 || name.length > 15) {
      setNameError("Nieodpowiednia długość.");
      return false;
    }
    setNameError(null);
    return true;
  }

  const validateEmail = () => {
    setNameError(null);
    setFileError(null);
    if (email.length < 5) {
      setEmailError("Nieprawidłowa długość e-maila.");
      return false;
    } else if (!email.match("@")) {
      setEmailError("Adres e-mail musi mieć @.");
      return false;
    }
    setEmailError(null);
    return true;
  };

  function validateFile() {
    setNameError(null);
    setEmailError(null);
    if (userImage === undefined) {
      setFileError("Plik nie może być pusty.");
      return false;
    }
    setFileError(null);
    return true;
  }

  const handleUserUpdate = async () => {
    if (validateName() && validateEmail() && validateFile()) {
      try {
        await userProfileService
          .updateUser(
            user.id,
            name,
            email,
            userImage
          )
          .then(
            () => {
              handleClose();
              navigate("/login");
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

  useEffect(() => {
    getUser();
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
      <div
        style={{
          width: "100%",
          height: "100%",
          float: "left",
          marginTop: "80px",
          position: "initial",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "20%",
            backgroundColor: "#8adbd3",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)",
            marginLeft: "auto",
            marginRight: "auto",
            display: "grid",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "40px",
              backgroundColor: "white",
              float: "left",
              marginLeft: "2%",
              marginTop: "5px",
              borderRadius: "15px",
              fontSize: "25px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          >
            <BiLeftArrowAlt />
          </div>
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
          <div>
            <img
              style={{
                height: "200px",
                marginTop: "65px",
                borderRadius: "15px",
              }}
              src={"data:image/png;base64," + user.photo}
            />
            <h5 style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => setUpdateShow(true)}>
              <BiEditAlt />
            </h5>

            <h5 style={{ marginTop: "10px" }}>Nazwa użytkownika:</h5>
            <a>{user.username}</a>
            <h5 style={{ marginTop: "10px" }}>E-mail:</h5>
            <a>{user.email}</a>
            <br />
            <br />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            marginTop: "20px",
            width: "90%",
            height: "auto",
            overflow: "auto",
            minHeight: "100px",
            marginLeft: "auto",
            marginBottom: "20px",
            marginRight: "auto",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
          }}
        >
          <h5 style={{ margin: "15px" }}>Zwierzęta należące do użytkownika</h5>
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
          {animals.slice(0, 30).map((animal, index) => {
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
                  cursor: "pointer",
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
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <div
          style={{
            backgroundColor: "white",
            marginTop: "20px",
            width: "90%",
            height: "auto",
            overflow: "auto",
            minHeight: "100px",
            marginLeft: "auto",
            marginBottom: "20px",
            marginRight: "auto",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
          }}
        >
          <h5 style={{ margin: "15px" }}>Znajomi</h5>
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
          {friends.slice(0, 30).map((friend, index) => {
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
                  cursor: "pointer",
                }}
              >
                <Card.Img
                  variant="top"
                  style={{ height: "10%" }}
                  src={"data:image/png;base64," + friend.photo}
                />
                <Card.Body>
                  <Card.Text>
                    <a>Nazwa: </a>
                    <strong>{friend.username}</strong>
                    <br></br>
                    <a>E-mail: </a>
                    <strong>{friend.email}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <Modal show={updateShow} onHide={handleUpdateClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <BiEdit />
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
                    placeholder="Wprowadź nową nazwę użytkownika"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  ></input>
                </div>
                {nameError && <Alert variant="danger">{nameError}</Alert>}
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Wprowadź nowy adres e-mail użytkownika"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                  ></input>
                </div>
                {emailError && <Alert variant="danger">{emailError}</Alert>}

                <br></br>
                <Form.Text className="text-muted">
                  Wybierz nowego awatara
                  <BiLinkAlt
                    id="clip"
                    style={{ width: "25px", height: "25px", cursor: "pointer" }}
                    onClick={() => fileHandler()}
                  />
                </Form.Text>
                {fileError && <Alert variant="danger">{fileError}</Alert>}
                <Button
                  variant="success"
                  onClick={() => handleUserUpdate()}
                  style={{ float: "right" }}
                >
                  Zaktualizuj
                </Button>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MePanel;
