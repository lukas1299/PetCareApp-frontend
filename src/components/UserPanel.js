import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userProfileService from "../services/userProfile.service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiMailSend, BiLeftArrowAlt } from "react-icons/bi";
import friendService from "../services/friend.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserPanel = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state;

  const [animals, setAnimals] = useState([]);
  const [friends, setFriends] = useState([]);

  const inviteSuccess = () => toast.success("Zaproszenie zostało wysłane");
  const inviteCurrentExistNotify = () =>
    toast.error("Zaproszenie już istnieje");

  const getUserAnimal = () => {
    userProfileService.getUserAnimals(user.id).then(
      (response) => {
        setAnimals(response.data);
      },
      (error) => {
        console.log(error.response.code);
      }
    );
  };

  const getUserFriends = () => {
    userProfileService.getUserFriends(user.id).then(
      (response) => {
        setFriends(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const inviteUser = (name) => {
    friendService.sendInvitations(name).then(
      () => {
        inviteSuccess();
      },
      (error) => {
        console.log(error);
        if (error.response.status === 400) {
          inviteCurrentExistNotify();
        }
      }
    );
  };

  useEffect(() => {
    getUserAnimal();
    getUserFriends();
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
            onClick={() => navigate("/friends")}
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
          <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <img
              style={{
                height: "200px",
                marginTop: "65px",
                borderRadius: "15px",
              }}
              src={"data:image/png;base64," + user.photo}
            />
            <h5 style={{ marginTop: "10px" }}>Nazwa użytkownika:</h5>
            <a>{user.username}</a>
            <h5 style={{ marginTop: "10px" }}>E-mail:</h5>
            <a>{user.email}</a>
            <br />
            <br />
            <Button variant="success" onClick={() => inviteUser(user.username)}>
              <BiMailSend style={{ fontSize: "20px" }} /> Zaproś
            </Button>
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
          <h5 style={{ margin: "15px" }}>Zwierzęta użytkownika</h5>
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
          <h5 style={{ margin: "15px" }}>Znajomi użytkownika</h5>
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
                    <a>Imię: </a>
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserPanel;
