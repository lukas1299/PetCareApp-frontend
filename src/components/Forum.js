import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import forumService from "../services/forum.service";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import {
  BiPlus,
  BiSearchAlt,
  BiMessageRounded,
  BiCalendarEdit,
} from "react-icons/bi";
import Form from "react-bootstrap/Form";
import navbarService from "./navbar.service";
import Alert from "react-bootstrap/Alert";
import { ToastContainer, toast } from "react-toastify";

const Forum = () => {
  const [show, setShow] = useState(false);
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState();

  var binaryData = [];

  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  var topicCategory = "OGÓLNY";

  const topicNotFoundNotify = () => toast.error("Nie znaleziono tematu.");

  const [cat, setCat] = useState("OGÓLNY");

  const handleTopicCategory = (selectedCategory) => {
    topicCategory = selectedCategory;
    setCat(topicCategory);
    document.getElementById("topicCategoryToggle").textContent =
      selectedCategory.toLowerCase().charAt(0).toUpperCase() +
      selectedCategory.toLowerCase().slice(1);
  };

  const getAllTopics = () => {
    forumService.getAllTopics().then(
      (response) => {
        setTopics(response.data);
 
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleTopicCreation = async (e) => {
    if (validateTitle(title) && validateDescription(cat)) {
      try {
        await forumService.createTopic(title, description, cat).then(
          () => {
            handleClose();
            getAllTopics();
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

  const showTopicDetails = (topicId) => {
    localStorage.setItem("topicId", topicId);

    navigate("/forumDetails");
  };

  function validateTitle(title) {
    if (title.length === 0) {
      setTitleError("Tytuł nie może być pusty.");
      return false;
    }
    if (title.length < 1 || title.length > 70) {
      setTitleError("Nieodpowiednia długość.");
      return false;
    }
    setTitleError(null);
    return true;
  }

  function validateDescription(description) {
    if (description.length === 0) {
      setDescriptionError("Opis nie może być pusty.");
      return false;
    }
    if (title.length < 1 || title.length > 512) {
      setDescriptionError("Nieodpowiednia długość.");
      return false;
    }
    setDescriptionError(null);
    return true;
  }

  const handleSearch = async () => {
    var foundTopic;
    if (searchValue === "") {
      foundTopic = await forumService.findTopicByTitle("emptySearchBar");
    } else {
      foundTopic = await forumService.findTopicByTitle(searchValue);
    }
    if (foundTopic.data.length === 0) {
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
    if (foundTopic.data.length > 0) {
      setSearchResult(
        <div
          style={{
            backgroundColor: "#e1e5eb",
            width: "80%",
            height: "auto",
            marginBottom: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
          }}
        >
          <br />
          {foundTopic.data.slice(0, 2).map((topic, index) => {
            return (
              <div
                key={index}
                onClick={() => showTopicDetails(topic.topic.id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#242526",
                  color: "white",
                  border: "1px solid #242526",
                  padding: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "7px",
                  width: "95%",
                  height: "auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={"data:image/png;base64," + topic.image}
                    style={{
                      width: "5%",
                      height: "5%",
                      borderRadius: "15px",
                      marginLeft: "4%",
                    }}
                  ></img>
                  <a style={{ marginLeft: "2%" }}>{topic.username}</a>
                  <a style={{ fontSize: "12px", marginLeft: "67%" }}>
                    {topic.topic.creationDate}
                  </a>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      display: "block",
                      borderBottom: "0.5px solid #9E9E9E",
                      marginBottom: "5px",
                      marginTop: "5px",
                    }}
                  ></div>
                  <h5 style={{ margin: "10px" }}>{topic.topic.title}</h5>
                  <p>{topic.topic.description}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <a>{topic.topic.posts.length}</a>
                  <BiMessageRounded
                    style={{ width: "20px", height: "20px", margin: "2px" }}
                  />
                </div>
              </div>
            );
          })}
          <br />
        </div>
      );
    } else {
      setSearchResult();
      topicNotFoundNotify();
    }
  };

  useEffect(() => {
    loadAvatar();
    getAllTopics();
  }, []);

  binaryData.push(image);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "auto",
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
              height: "100%",
              minHeight: "3000px",
              marginTop: "1%",
              margin: "auto",
              position: "initial",
              backgroundColor: "#e1e5eb",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
            }}
          >
            <br></br>

            {topics.map((topic, index) => {
              return (
                <div
                  key={index}
                  onClick={() => showTopicDetails(topic.topic.id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#242526",
                    color: "white",
                    border: "1px solid #242526",
                    padding: "20px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "7px",
                    width: "95%",
                    height: "auto",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={"data:image/png;base64," + topic.image}
                      style={{
                        width: "5%",
                        height: "5%",
                        borderRadius: "15px",
                        marginLeft: "4%",
                      }}
                    ></img>
                    <a style={{ marginLeft: "2%" }}>{topic.username}</a>
                    <a style={{ fontSize: "12px", marginLeft: "67%" }}>
                      <a>Data utworzenia: </a>{topic.topic.creationDate}
                    </a>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        display: "block",
                        borderBottom: "0.5px solid #9E9E9E",
                        marginBottom: "5px",
                        marginTop: "5px",
                      }}
                    ></div>
                    <h5 style={{ margin: "10px" }}>{topic.topic.title}</h5>
                    <p>{topic.topic.description}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <a>{topic.topic.posts.length}</a>
                    <BiMessageRounded
                      style={{ width: "20px", height: "20px", margin: "2px" }}
                    />
                  </div>
                </div>
              );
            })}
            <br />
            <br />
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
            <BiCalendarEdit />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Tytuł wątku"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          {titleError && <Alert variant="danger">{titleError}</Alert>}

          <Dropdown onSelect={handleTopicCategory}>
            <Dropdown.Toggle
              id="topicCategoryToggle"
              variant="light"
              style={{ width: "100%" }}
            >
              {topicCategory.toLowerCase().charAt(0).toUpperCase() +
                topicCategory.toLowerCase().slice(1)}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: "100%" }}>
              <Dropdown.Item eventKey="OGÓLNY">Ogólny</Dropdown.Item>
              <Dropdown.Item eventKey="ZDROWIE">Zdrowie</Dropdown.Item>
              <Dropdown.Item eventKey="JEDZENIE">Jedzenie</Dropdown.Item>
              <Dropdown.Item eventKey="AKCESORIA">Akcesoria</Dropdown.Item>
              <Dropdown.Item eventKey="CHOROBY">Choroby</Dropdown.Item>
            </Dropdown.Menu>
            <Form.Text className="text-muted">
              Wybierz kategorię tematu.
            </Form.Text>
          </Dropdown>

          <br></br>
          <div className="input-group">
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opisz swój problem..."
              className="form-control"
              aria-label="With textarea"
            ></textarea>
          </div>
          <br></br>
          {descriptionError && (
            <Alert variant="danger">{descriptionError}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={(e) => handleTopicCreation()}>
            Dodaj
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Forum;
