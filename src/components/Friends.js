import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import Button from "react-bootstrap/Button";
import navbarService from "./navbar.service";
import homeService from "../services/home.service";
import friendService from "../services/friend.service";
import Card from "react-bootstrap/Card";

const Friends = () => {
  const [invitations, setInvitations] = useState([]);
  const [nonFrinds, setNonFriends] = useState([]);

  const [image, setImage] = useState([]);

  var binaryData = [];

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

  const getNonFriends = () => {
    friendService.getNonFriendUsers().then(
      (response) => {
        console.log(response.data);
        setNonFriends(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const acceptInvitation = (id) => {
    homeService.acceptFriendsInvitation(id).then(
      () => {
        getInvitation();
        getNonFriends();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const rejectInvitation = (id) => {
    homeService.rejectFriendsInvitation(id).then(
      () => {
        getInvitation();
        getNonFriends();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getInvitation = () => {
    homeService.getUserInvitations().then(
      (response) => {
        setInvitations(response.data);
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const sendInvitation = (name) => {
    friendService.sendInvitations(name).then(
      (response) => {
        console.log(response.data);
        getInvitation();
        getNonFriends();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getInvitation();
    getNonFriends();
    loadAvatar();
  }, []);

  binaryData.push(image);
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
          <h3 style={{ margin: "1%", color: "white" }}>Invitations</h3>
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

          <div style={{ marginLeft: "1%", minHeight: "600px" }}>
            {invitations.map((invitation, index) => {
              return (
                <Card
                  style={{
                    width: "14.5%",
                    minWidth: "160px",
                    minHeight: "200px",
                    float: "left",
                    position: "revert",
                    cursor: "pointer",
                    margin: "1%",
                  }}
                  key={index}
                >
                  <Card.Img
                    variant="top"
                    src={"data:image/png;base64," + invitation.profile.user.photo}
                    style={{ height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                      <a>Name: </a>
                      <strong>{invitation.profile.user.username}</strong>
                      <br></br>
                      <a>Email: </a>
                      <strong>{invitation.profile.user.email}</strong>
                    </Card.Text>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Button
                        style={{ width: "50%" }}
                        variant="success"
                        onClick={() => acceptInvitation(invitation.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        style={{ width: "50%", marginLeft: "5%" }}
                        variant="danger"
                        onClick={() => rejectInvitation(invitation.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>

          <div>
            <h3 style={{ clear: "both", marginLeft: "1%", color: "white" }}>
              Other people
            </h3>
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

            <div style={{ marginLeft: "1%", minHeight: "800px" }}>
              {nonFrinds.map((people, index) => {
                console.log(people);

                return (
                  <Card
                    style={{
                      width: "14.5%",
                      minWidth: "160px",
                      minHeight: "200px",
                      float: "left",
                      position: "revert",
                      cursor: "pointer",
                      margin: "1%",
                    }}
                    key={index}
                  >
                    <Card.Img
                      variant="top"
                      src={"data:image/png;base64," + people.photo}
                      style={{ height: "200px" }}
                    />
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text>
                        <a>Name: </a>
                        <strong>{people.username}</strong>
                        <br></br>
                        <a>Email: </a>
                        <strong>{people.email}</strong>
                      </Card.Text>
                      <Button
                        style={{ float: "right" }}
                        variant="primary"
                        onClick={() => sendInvitation(people.username)}
                      >
                        Invite
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
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

export default Friends;
