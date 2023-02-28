import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import { BiSearchAlt } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import navbarService from "./navbar.service";
import homeService from "../services/home.service";
import friendService from "../services/friend.service";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const [invitations, setInvitations] = useState([]);
  const [friends, setFriends] = useState([]);
  const [nonFrinds, setNonFriends] = useState([]);

  const [image, setImage] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState();
  const navigate = useNavigate();

  const inviteCurrentExistNotify = () => toast.error("Zaproszenie jest obecnie dostępne.");
  const inviteSentSuccessfully = () => toast.success("Zaproszenie wysłane pomyślnie.");
  const friendsNotFoundNotify = () => toast.error("Nie znaleziono osoby o podanej nazwie.");

  var binaryData = [];

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

  const getFriends = () => {
    friendService.getUserAllFriends().then(
      (response) => {
        setFriends(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getNonFriends = () => {
    friendService.getNonFriendUsers().then(
      (response) => {
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
        getFriends();
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

  const removeFriend = (id) => {
    friendService.removeUserFromFriends(id).then(
      () => {
        getFriends();
        getNonFriends();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const sendInvitation = (name) => {
    friendService.sendInvitations(name).then(
      () => {
        inviteSentSuccessfully();
        getInvitation();
        getNonFriends();
      },
      (error) => {
        if (error.response.status) {
          inviteCurrentExistNotify();
        }
      }
    );
  };

  const showFriendProfile = (people) => {
    navigate("/userPanel", { state: { user: people } });
  };

  const handleSearch = async () => {
    var foundPeople;
    if (searchValue === "") {
      foundPeople = await friendService.findPeopleByName("emptySearchBar");
    } else {
      foundPeople = await friendService.findPeopleByName(searchValue);
    }
    if (foundPeople.data.length === 0) {
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
    if (foundPeople.data.length > 0) {
      setSearchResult(
        <div
          style={{
            backgroundColor: "#e1e5eb",
            width: "80%",
            height: "auto",
            minHeight: "400px",
            marginBottom: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
          }}
        >
          {foundPeople.data.slice(0, 5).map((people, index) => {
            return (
              <Card
                style={{
                  width: "14.5%",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => showFriendProfile(people)}
              >
                <Card.Img
                  variant="top"
                  src={"data:image/png;base64," + people.photo}
                  style={{ height: "10%" }}
                />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <a style={{ fontSize: "14px" }}>
                      Imię: <strong>{people.username}</strong>
                    </a>

                    <br></br>
                    <a style={{ fontSize: "14px" }}>
                      E-mail: <strong>{people.email}</strong>
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      );
    } else {
      setSearchResult();
      friendsNotFoundNotify();
    }
  };

  useEffect(() => {
    getInvitation();
    getFriends();
    getNonFriends();
    loadAvatar();
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
                  width: "40%",
                  marginTop: "30px",
                  marginLeft: "2%",
                }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
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
            <br></br>
            <h5
              style={{
                fontFamily: " Arial, Helvetica, sans-serif",
                marginLeft: "5%",
              }}
            >
              Zaproszenia
            </h5>
            <div
              style={{
                display: "block",
                borderBottom: "0.5px solid #9E9E9E",
                marginBottom: "5px",
                marginTop: "10px",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></div>

            <div style={{ marginLeft: "4%" }}>
              {invitations.map((invitation, index) => {
                return (
                  <Card
                    style={{
                      width: "14.5%",
                      height: "auto",
                      minWidth: "18%",
                      float: "left",
                      position: "revert",
                      margin: "1%",
                    }}
                    key={index}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        "data:image/png;base64," + invitation.profile.user.photo
                      }
                      style={{ height: "10%", cursor:"pointer" }}
                      onClick={() => showFriendProfile(invitation.profile.user)}
                    />
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text>
                        <a>Imię: </a>
                        <strong>{invitation.profile.user.username}</strong>
                        <br></br>
                        <a>E-mail: </a>
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
                          Akceptuj
                        </Button>
                        <Button
                          style={{ width: "50%", marginLeft: "5%" }}
                          variant="danger"
                          onClick={() => rejectInvitation(invitation.id)}
                        >
                          Odrzuć
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
            <div style={{ clear: "both", height: "50px" }}></div>

            <div style={{ clear: "both" }}>
              <h5
                style={{
                  fontFamily: " Arial, Helvetica, sans-serif",
                  marginLeft: "5%",
                }}
              >
                Znajomi
              </h5>
              <div
                style={{
                  display: "block",
                  borderBottom: "0.5px solid #9E9E9E",
                  marginBottom: "5px",
                  marginTop: "10px",
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              ></div>

              <div style={{ marginLeft: "4%" }}>
                {friends.map((people, index) => {
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
                        src={"data:image/png;base64," + people.photo}
                        style={{ height: "10%", cursor:"pointer" }}
                        onClick={() => showFriendProfile(people)}
                      />
                      <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                          <a style={{ fontSize: "14px" }}>
                            Name: <strong>{people.username}</strong>
                          </a>

                          <br></br>
                          <a style={{ fontSize: "14px" }}>
                            Email: <strong>{people.email}</strong>
                          </a>
                        </Card.Text>
                        <Button
                          style={{ width: "100%" }}
                          variant="light"
                          onClick={() => removeFriend(people.id)}
                        >
                          Usuń znajomego
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div style={{ clear: "both", height: "50px" }}></div>
            <div style={{ clear: "both" }}>
              <h5
                style={{
                  fontFamily: " Arial, Helvetica, sans-serif",
                  marginLeft: "5%",
                }}
              >
                Osoby które możesz znać
              </h5>
              <div
                style={{
                  display: "block",
                  borderBottom: "0.5px solid #9E9E9E",
                  marginBottom: "5px",
                  marginTop: "10px",
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              ></div>

              <div style={{ marginLeft: "4%" }}>
                {nonFrinds.map((people, index) => {
                  return (
                    <Card
                      style={{
                        width: "14.5%",
                        height: "auto",
                        minWidth: "18%",
                        float: "left",
                        position: "revert",
                        margin: "1%",
                      }}
                      key={index}
                    >
                      <Card.Img
                        variant="top"
                        src={"data:image/png;base64," + people.photo}
                        style={{ height: "10%", cursor:"pointer" }}
                        onClick={() => showFriendProfile(people)}
                      />
                      <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                          <a style={{ fontSize: "14px" }}>
                            Imię: <strong>{people.username}</strong>
                          </a>

                          <br></br>
                          <a style={{ fontSize: "14px" }}>
                            E-mail: <strong>{people.email}</strong>
                          </a>
                        </Card.Text>
                        <Button
                          style={{ width: "100%" }}
                          variant="light"
                          onClick={() => sendInvitation(people.username)}
                        >
                          Zaproś
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
          <br></br>
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
      <ToastContainer />
    </div>
  );
};

export default Friends;
