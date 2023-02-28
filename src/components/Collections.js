import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import Button from "react-bootstrap/Button";
import {
  BiPlus,
  BiSearchAlt,
  BiInfoCircle,
  BiCoin,
  BiShare,
} from "react-icons/bi";
import Form from "react-bootstrap/Form";
import navbarService from "./navbar.service";
import userProfileService from "../services/userProfile.service";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import collectionService from "../services/collection.service";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { ToastContainer, toast } from "react-toastify";
import piggyBank from "./photos/piggyBank.png";

const Collections = () => {
  const navigate = useNavigate();

  const [me, setMe] = useState([]);
  const [myCollection, setCollection] = useState([]);
  const [myModalShow, setMyModalShow] = useState(false);
  const [otherPeopleModalShow, setOtherPeopleModalShow] = useState(false);
  const [createCollectionModalShow, setCreateCollectionModalShow] =
    useState(false);

  const [image, setImage] = useState([]);
  const [collections, setCollections] = useState([]);
  const [friendsCollections, setFriendsCollections] = useState([]);
  const [nonFriendsCollections, setNonFriendsCollections] = useState([]);
  const [money, setMoney] = useState(0);

  const [title, setTitle] = useState("");
  const [moneyToCollect, setMoneyToCollect] = useState(0);
  const [collectionDescription, setCollectionDescription] = useState("");

  const [titleError, setTitleError] = useState("");
  const [moneyToCollectError, setMoneyToCollectError] = useState("");
  const [collectionDescriptionError, setCollectionDescriptionError] =
    useState("");

  const [friendMoneyError, setFriendMoneyError] = useState("");
  const [otherPeopleMoneyError, setOtherPeopleMoneyError] = useState("");
  const [otherPeopleModalDonateButton, setOtherPeopleModalDonateButton] =
    useState(true);
  const [friendModalDonateButton, setFriendModalDonateButton] = useState(true);
  const [friendsModalShow, setFriendsModalShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState();

  const handleFriendsModalClose = () => setFriendsModalShow(false);
  const handleSetTitle = (value) => setTitle(value);
  const handleSetMoneyToCollect = (value) => setMoneyToCollect(value);
  const handleSetCollectionDescription = (value) =>
    setCollectionDescription(value);
  const handleOtherPeopleModalClose = () => setOtherPeopleModalShow(false);
  const handleCreateCollectionModalShow = () =>
    setCreateCollectionModalShow(true);
  const handleCreateCollectionModalClose = () =>
    setCreateCollectionModalShow(false);
  const handleMyModalClose = () => setMyModalShow(false);

  const handleMyModalShow = (collection) => {
    setCollection(collection);
    setMyModalShow(true);
  };

  const handleFriendsModalShow = (collection) => {
    setCollection(collection);
    setFriendsModalShow(true);
  };

  const handleOtherPeopleModalShow = (collection) => {
    setCollection(collection);
    setOtherPeopleModalShow(true);
  };

  var binaryData = [];

  const getUser = () => {
    userProfileService.getUser().then(
      (response) => {
        setMe(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
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

  const collectionNotFoundNotify = () => toast.error("Nie znaleziono kolekcji.");
  const collectionSharedSuccessfullyNotify = () =>
    toast.success("Kolekcja została udostępniona pomyślnie.");

  const loadMyCollections = () => {
    collectionService.getMyCollections().then(
      (response) => {
        setCollections(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const loadMyFriendsCollections = () => {
    collectionService.getFriendsCollections().then(
      (response) => {
        setFriendsCollections(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const loadNonFriendsCollections = () => {
    collectionService.getNonFriendsCollections().then(
      (response) => {
        setNonFriendsCollections(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleFriendSetMoney = (value) => {
    if (value < 1) {
      setFriendMoneyError("Nieprawidłowa kwota");
      setFriendModalDonateButton(true);
    } else {
      setFriendModalDonateButton(false);
      setFriendMoneyError("");
      setMoney(value);
    }
  };

  const handleOtherPeopleSetMoney = (value) => {
    if (value < 1) {
      setOtherPeopleMoneyError("Nieprawidłowa kwota");
      setOtherPeopleModalDonateButton(true);
    } else {
      setOtherPeopleModalDonateButton(false);
      setOtherPeopleMoneyError("");
      setMoney(value);
    }
  };

  const handleDonate = (myCollection) => {
    navigate("/collections/pay", {
      state: { collection: myCollection, money: money },
    });
  };

  function validateTitle(title) {
    if (title.length < 2 || title === "") {
      setTitleError("Nieprawidłowy tytuł");
      return false;
    }
    setTitleError(null);
    return true;
  }

  function validateMoneyAmount(moneyToCollect) {
    if (moneyToCollect < 1 || moneyToCollect > 1000000) {
      setMoneyToCollectError("Nieprawidłowa kwota pieniędzy.");
      return false;
    }
    setMoneyToCollectError(null);
    return true;
  }

  function validateCollectionDescription(collectionDescription) {
    if (collectionDescription.length < 2 || collectionDescription.length > 32) {
      setCollectionDescriptionError("Nieprawidłowy opis.");
      return false;
    }
    setCollectionDescriptionError(null);
    return true;
  }

  const handleCollectionCreation = () => {
    if (
      validateTitle(title) &&
      validateMoneyAmount(moneyToCollect) &&
      validateCollectionDescription(collectionDescription)
    ) {
      collectionService
        .createCollection(title, moneyToCollect, collectionDescription)
        .then(
          () => {
            loadMyCollections();
            loadMyFriendsCollections();
            loadNonFriendsCollections();
            handleCreateCollectionModalClose();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const shareCollection = async (content) => {
    fetch(piggyBank)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        try {
          collectionService.shareCollection(content, file).then(
            () => {
              collectionSharedSuccessfullyNotify();
            },
            (error) => {
              console.log(error);
            }
          );
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = async () => {
    console.log(me);
    var foundCollections;
    if (searchValue === "") {
      foundCollections = await collectionService.findCollectionsByTitle(
        "emptySearchBar"
      );
    } else {
      foundCollections = await collectionService.findCollectionsByTitle(
        searchValue
      );
    }

    if (foundCollections.data.length === 0) {
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
    if (foundCollections.data.length > 0) {
      setSearchResult(
        <div
          style={{
            backgroundColor: "#e1e5eb",
            width: "80%",
            height: "auto",
            minHeight: "300px",
            marginBottom: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
          }}
        >
          {foundCollections.data.slice(0, 5).map((collection, index) => {
            if (collection.user.id === me.id) {
              return (
                <div style={{ marginLeft: "4%" }}>
                  <Card
                    key={index}
                    style={{
                      width: "18.2%",
                      height: "270px",
                      minHeight: "150px",
                      position: "revert",
                      float: "left",
                      margin: "0.5%",
                    }}
                  >
                    <Card.Body>
                      <Card.Subtitle>
                        <img
                          src={"data:image/png;base64," + collection.user.photo}
                          style={{ width: "25%", borderRadius: "5px" }}
                        />{" "}
                        {collection.user.username}
                      </Card.Subtitle>
                      <BiShare
                        style={{
                          width: "20px",
                          height: "20px",
                          float: "right",
                          cursor: "pointer",
                        }}
                      />
                      <br />
                      <Card.Title
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.title}
                      </Card.Title>
                      <Card.Text
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.description}
                      </Card.Text>
                    </Card.Body>

                    <ProgressBar
                      style={{ margin: "2px" }}
                      now={collection.percentages}
                      label={`${collection.percentages}%`}
                    />
                    <Button
                      variant="light"
                      onClick={() => handleMyModalShow(collection)}
                    >
                      <BiInfoCircle style={{ width: "20px", height: "20px" }} />
                    </Button>
                  </Card>
                </div>
              );
            } else {
                return (
                <div style={{ marginLeft: "4%" }}>
                  <Card
                    key={index}
                    style={{
                      width: "18.2%",
                      height: "270px",
                      minHeight: "150px",
                      position: "revert",
                      float: "left",
                      margin: "0.5%",
                    }}
                  >
                    <Card.Body>
                      <Card.Subtitle>
                        <img
                          src={"data:image/png;base64," + collection.user.photo}
                          style={{ width: "25%", borderRadius: "5px" }}
                        />{" "}
                        {collection.user.username}
                      </Card.Subtitle>

                      <br />
                      <Card.Title
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.title}
                      </Card.Title>
                      <Card.Text
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.description}
                      </Card.Text>
                    </Card.Body>

                    <ProgressBar
                      style={{ margin: "2px" }}
                      now={collection.percentages}
                      label={`${collection.percentages}%`}
                    />
                    <Button
                      variant="light"
                      onClick={() => handleFriendsModalShow(collection)}
                    >
                      Donate
                    </Button>
                  </Card>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      setSearchResult();
      collectionNotFoundNotify();
    }
  };

  useEffect(() => {
    loadAvatar();
    getUser();
    loadMyCollections();
    loadMyFriendsCollections();
    loadNonFriendsCollections();
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
                onClick={handleCreateCollectionModalShow}
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
            <br></br>
            <h5
              style={{
                fontFamily: " Arial, Helvetica, sans-serif",
                marginLeft: "5%",
              }}
            >
              Moje zbiórki
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
            <div style={{ marginLeft: "4%", marginBottom: "10px" }}>
              {collections.map((collection, index) => {
                return (
                  <Card
                    key={index}
                    style={{
                      width: "18.2%",
                      height: "270px",
                      minHeight: "150px",
                      position: "revert",
                      float: "left",
                      margin: "0.5%",
                    }}
                  >
                    <Card.Body>
                      <Card.Subtitle>
                        <img
                          src={"data:image/png;base64," + collection.user.photo}
                          style={{ width: "25%", borderRadius: "5px" }}
                        />{" "}
                        {collection.user.username}
                      </Card.Subtitle>
                      <BiShare
                        style={{
                          width: "20px",
                          height: "20px",
                          float: "right",
                          cursor: "pointer",
                        }}
                        onClick={() => shareCollection(collection.description)}
                      />
                      <br />
                      <Card.Title
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.title}
                      </Card.Title>
                      <Card.Text
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.description}
                      </Card.Text>
                    </Card.Body>

                    <ProgressBar
                      style={{ margin: "2px" }}
                      now={collection.percentages}
                      label={`${collection.percentages}%`}
                    />
                    <Button
                      variant="light"
                      onClick={() => handleMyModalShow(collection)}
                    >
                      <BiInfoCircle style={{ width: "20px", height: "20px" }} />
                    </Button>
                  </Card>
                );
              })}
            </div>
            <div style={{ clear: "both", height: "50px" }}></div>

            <br></br>
            <h5
              style={{
                clear: "both",
                fontFamily: " Arial, Helvetica, sans-serif",
                marginLeft: "5%",
              }}
            >
              Zbiórki moich znajomych
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
              {friendsCollections.map((collection, index) => {
                return (
                  <Card
                    key={index}
                    style={{
                      width: "18.2%",
                      height: "270px",
                      minHeight: "150px",
                      position: "revert",
                      float: "left",
                      margin: "0.5%",
                    }}
                  >
                    <Card.Body>
                      <Card.Subtitle>
                        <img
                          src={"data:image/png;base64," + collection.user.photo}
                          style={{ width: "25%", borderRadius: "5px" }}
                        />{" "}
                        {collection.user.username}
                      </Card.Subtitle>

                      <br />
                      <Card.Title
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.title}
                      </Card.Title>
                      <Card.Text
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.description}
                      </Card.Text>
                    </Card.Body>

                    <ProgressBar
                      style={{ margin: "2px" }}
                      now={collection.percentages}
                      label={`${collection.percentages}%`}
                    />
                    <Button
                      variant="light"
                      onClick={() => handleFriendsModalShow(collection)}
                    >
                      Wesprzyj
                    </Button>
                  </Card>
                );
              })}
            </div>
            <div style={{ clear: "both", height: "50px" }}></div>
            <h5
              style={{
                clear: "both",
                fontFamily: " Arial, Helvetica, sans-serif",
                marginLeft: "5%",
              }}
            >
              Zbiórki innych użytkowników
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
              {nonFriendsCollections.map((collection, index) => {
                return (
                  <Card
                    key={index}
                    style={{
                      width: "18.2%",
                      height: "270px",
                      minHeight: "150px",
                      position: "revert",
                      float: "left",
                      margin: "0.5%",
                    }}
                  >
                    <Card.Body>
                      <Card.Subtitle>
                        <img
                          src={"data:image/png;base64," + collection.user.photo}
                          style={{ width: "25%", borderRadius: "5px" }}
                        />{" "}
                        {collection.user.username}
                      </Card.Subtitle>
                      <br />
                      <Card.Title
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.title}
                      </Card.Title>
                      <Card.Text
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {collection.description}
                      </Card.Text>
                    </Card.Body>

                    <ProgressBar
                      style={{ margin: "2px" }}
                      now={collection.percentages}
                      label={`${collection.percentages}%`}
                    />
                    <Button
                      variant="light"
                      onClick={() => handleOtherPeopleModalShow(collection)}
                    >
                      Wesprzyj
                    </Button>
                  </Card>
                );
              })}
            </div>
            <br></br>
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

      {/* Create collection modal */}
      <Modal
        show={createCollectionModalShow}
        onHide={handleCreateCollectionModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <BiCoin />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input
              onChange={(e) => handleSetTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Tytuł"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>

          {titleError && <Alert variant="danger">{titleError}</Alert>}

          <div className="input-group mb-3">
            <input
              onChange={(e) => handleSetMoneyToCollect(e.target.value)}
              type="number"
              min={1}
              className="form-control"
              placeholder="Cel zbiorki"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          {moneyToCollectError && (
            <Alert variant="danger">{moneyToCollectError}</Alert>
          )}
          <br></br>
          <div className="input-group">
            <textarea
              onChange={(e) => handleSetCollectionDescription(e.target.value)}
              placeholder="Opisz, na co zbierasz pieniądze..."
              className="form-control"
              aria-label="With textarea"
            ></textarea>
          </div>
          <br />
          {collectionDescriptionError && (
            <Alert variant="danger">{collectionDescriptionError}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={(e) => handleCollectionCreation()}>
            Stwórz
          </Button>
        </Modal.Footer>
      </Modal>

      {/* My collections modal */}
      <Modal show={myModalShow} onHide={handleMyModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <BiCoin />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>{myCollection.title}</h5>
          <br />
          <h6 style={{ textAlign: "center" }}>
            Cel: <strong>{myCollection.target}</strong>$
          </h6>
          <div
            className="scrollable-div"
            style={{ height: "300px", width: "98%", marginLeft: "-1%" }}
          >
            <Table>
              <tr>
                <th>Użytkownik</th>
                <th>Kwota</th>
              </tr>
              {myCollection.donates === undefined ||
              myCollection.donates.length === 0 ? (
                <tr style={{ borderColor: "transparent" }}>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                myCollection.donates.map((donate, index) => {
                  return (
                    <tr key={index} style={{ borderColor: "transparent" }}>
                      <td>
                        <img
                          src={"data:image/png;base64," + donate.user.photo}
                          style={{ width: "40px", marginRight: "10px" }}
                        />
                        {donate.user.username}
                      </td>
                      <td>{donate.money} $</td>
                    </tr>
                  );
                })
              )}
            </Table>
          </div>
          <ProgressBar
            style={{ margin: "2px" }}
            now={myCollection.percentages}
            label={`${myCollection.percentages}%`}
          />
        </Modal.Body>
      </Modal>

      {/* Friends collections modal */}
      <Modal show={friendsModalShow} onHide={handleFriendsModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <BiCoin />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>{myCollection.title}</h5>
          <br />
          <h6 style={{ textAlign: "center" }}>
            Cel: <strong>{myCollection.target}</strong>$
          </h6>
          <div
            className="scrollable-div"
            style={{ height: "200px", width: "98%", marginLeft: "-1%" }}
          >
            <Table>
              <tr>
                <th>Użytkownik</th>
                <th>Kwota</th>
              </tr>
              {myCollection.donates === undefined ||
              myCollection.donates.length === 0 ? (
                <tr style={{ borderColor: "transparent" }}>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                myCollection.donates.map((donate, index) => {
                  return (
                    <tr key={index} style={{ borderColor: "transparent" }}>
                      <td>
                        <img
                          src={"data:image/png;base64," + donate.user.photo}
                          style={{ width: "40px", marginRight: "10px" }}
                        />
                        {donate.user.username}
                      </td>
                      <td>{donate.money} $</td>
                    </tr>
                  );
                })
              )}
            </Table>
          </div>
          <ProgressBar
            style={{ margin: "2px" }}
            now={myCollection.percentages}
            label={`${myCollection.percentages}%`}
          />
          <br />
          <input
            onChange={(e) => handleFriendSetMoney(e.target.value)}
            type="number"
            onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
            min={1}
            className="form-control"
            placeholder="Podaj kwotę"
            aria-label="Username"
            aria-describedby="basic-addon1"
          ></input>
          <br />
          {friendMoneyError && (
            <Alert variant="danger">{friendMoneyError}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={(e) => handleDonate(myCollection)}
            disabled={friendModalDonateButton}
          >
            Wesprzyj <BiCoin />
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Other people modal */}
      <Modal show={otherPeopleModalShow} onHide={handleOtherPeopleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <BiCoin />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>{myCollection.title}</h5>
          <br />
          <h6 style={{ textAlign: "center" }}>
            Cel: <strong>{myCollection.target}</strong>$
          </h6>
          <div
            className="scrollable-div"
            style={{ height: "200px", width: "98%", marginLeft: "-1%" }}
          >
            <Table>
              <tr>
                <th>Użytkownik</th>
                <th>Kwota</th>
              </tr>
              {myCollection.donates === undefined ||
              myCollection.donates.length === 0 ? (
                <tr style={{ borderColor: "transparent" }}>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                myCollection.donates.map((donate, index) => {
                  return (
                    <tr key={index} style={{ borderColor: "transparent" }}>
                      <td>
                        <img
                          src={"data:image/png;base64," + donate.user.photo}
                          style={{ width: "40px", marginRight: "10px" }}
                        />
                        {donate.user.username}
                      </td>
                      <td>{donate.money} $</td>
                    </tr>
                  );
                })
              )}
            </Table>
          </div>
          <ProgressBar
            style={{ margin: "2px" }}
            now={myCollection.percentages}
            label={`${myCollection.percentages}%`}
          />
          <br />
          <input
            onChange={(e) => handleOtherPeopleSetMoney(e.target.value)}
            type="number"
            min={1}
            className="form-control"
            placeholder="Podaj kwotę"
            aria-label="Username"
            aria-describedby="basic-addon1"
            style={{ margin: "2px" }}
          ></input>
          <br />
          {otherPeopleMoneyError && (
            <Alert variant="danger">{otherPeopleMoneyError}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="otherPeopleModalDonateButton"
            variant="warning"
            onClick={(e) => handleDonate(myCollection)}
            disabled={otherPeopleModalDonateButton}
          >
            Wesprzyj <BiCoin />
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Collections;
