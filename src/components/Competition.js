import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useNavigate, useLocation } from "react-router-dom";
import { BiQuestionMark } from "react-icons/bi";
import navbarService from "./navbar.service";
import petService from "../services/pet.service";
import quizzesService from "../services/quizzes.service";
import competitionService from "../services/competition.service";
import Carousel from "react-bootstrap/Carousel";
import agama from "./photos/agamaQ.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import photo1 from "./photos/gallery_photo/photo1.png"
import photo2 from "./photos/gallery_photo/photo2.png"
import photo3 from "./photos/gallery_photo/photo3.png"
import photo4 from "./photos/gallery_photo/photo4.png"
import photo5 from "./photos/gallery_photo/photo5.png"
import photo6 from "./photos/gallery_photo/photo6.png"
import photo7 from "./photos/gallery_photo/photo7.png"
import photo8 from "./photos/gallery_photo/photo8.png"

import paw from "./photos/paw.png";

const Competition = () => {
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  const [competitions, setCompetitions] = useState([]);
  const [competitionResult, setFinishedCompetitionsResult] = useState([]);
  const [facts, setFacts] = useState([]);

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

  const getAllFacts = async () => {
    await petService.getFacts().then(
      (response) => {
        console.log(response.data);
        setFacts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getCompetitions = () => {
    competitionService.getCompetitions().then(
      (response) => {
        console.log(response.data);
        setCompetitions(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getFinishedCompetitionsResult = () => {
    competitionService.getFinishedCompetitionsResult().then(
      (response) => {
        console.log(response.data);
        setFinishedCompetitionsResult(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadAvatar();
    getAllFacts();
    getCompetitions();
    getFinishedCompetitionsResult();
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
              width: "90%",
              height: "100%",
              minHeight: "3000px",
              overflow: "auto",
              marginTop: "1%",
              margin: "auto",
              position: "initial",
              backgroundColor: "#e1e5eb",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
            }}
          >
            <div style={{ marginTop: "50px", textAlign: "center" }}>
              <a
                style={{
                  fontWeight: "bold",
                  fontSize: "70px",
                }}
              >
                Galeria
              </a>
            </div>

            <br></br>
            <br></br>
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
                  <img
                    className="d-block w-100"
                    src={photo1}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={photo2}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={photo3}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={photo4}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={photo5}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={photo6}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={photo7}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={photo8}
                    alt="Third slide"
                  />

                </Carousel.Item>
              </Carousel>

              <div style={{ marginTop: "50px", textAlign: "center" }}>
                <a
                  style={{
                    fontWeight: "bold",
                    fontSize: "70px",
                  }}
                >
                  Wiedziałeś to?
                </a>
              </div>
             

              <div
              style={{
                position:"relative",
                width: "800px",
                height: "auto",
                overflow: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "100px",
                justifyContent: "space-between",
              }}
            >
                {facts.slice(0, 4).map((fact, index) => {
                  return (
                    <Card key={index} style={{ width: "48%",
                        height: "auto",
                        minWidth: "18%",
                        margin: "1%",
                        float: "left",
                        position: "revert",
                        textAlign: "center", }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          float:"left",
                          
                          backgroundColor: "#8adbd3",
                          color: "white",
                          margin: "2px",
                          borderRadius: "10px",
                        }}
                      >
                        <BiQuestionMark style={{ fontSize: "30px" }} />
                      </div>
                      <Card.Body>
                        <Card.Title>Ciekawostka</Card.Title>
                        <Card.Text>{fact.name}</Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>

              <div style={{ width: "100%", textAlign: "center" }}>
                <a
                  style={{
                    fontWeight: "bold",
                    fontSize: "70px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Nasi zwycięzcy
                </a>
                <h5>Oto zwyciezcy naszych konkursów</h5>
              </div>
            </div>

            <div
              style={{
                width: "800px",
                height: "auto",
                overflow: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "100px",
                justifyContent: "space-between",
              }}
            >
              {competitionResult.map((result, index) => {
                return (
                  <div>
                    <Card
                      style={{
                        width: "48%",
                        height: "auto",
                        minWidth: "18%",
                        margin: "1%",
                        float: "left",
                        position: "revert",
                        textAlign: "center",
                      }}
                      key={index}
                    >
                      <Card.Img
                        variant="top"
                        style={{ height: "15%" }}
                        src={
                          "data:image/png;base64," + result.competition.photo
                        }
                      />
                      <Card.Body>
                        <Card.Title>{result.competition.title}</Card.Title>
                        <Card.Text>
                          <a>
                            <strong>{result.competitionDetails.petName}</strong>
                          </a>
                        </Card.Text>
                        <Card.Text>
                          <a>Zebrane głosy:</a>
                        </Card.Text>
                        <Card.Text>
                          <a>
                            <strong>{result.competitionDetails.points}</strong>
                          </a>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "50px", textAlign: "center" }}>
              <a
                style={{
                  fontWeight: "bold",
                  fontSize: "70px",
                  clear: "both",
                }}
              >
                Konkursy
              </a>
            </div>

            <div style={{ width: "100%", textAlign: "center" }}>
              <h5>Sprawdź nasze konkursy</h5>
            </div>

            <div
              style={{
                width: "800px",
                height: "auto",
                overflow: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "100px",
                justifyContent: "space-between",
              }}
            >
              {competitions.map((competition, index) => {
                return (
                  <div key={index}>
                    <Card
                      style={{
                        width: "48%",
                        height: "auto",
                        minWidth: "18%",
                        margin: "1%",
                        float: "left",
                        position: "revert",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/competitions/details", {
                          state: { competitionId: competition.id },
                        })
                      }
                    >
                      <Card.Img
                        variant="top"
                        style={{ height: "15%" }}
                        src={"data:image/png;base64," + competition.photo}
                      />
                      <Card.Body>
                        <Card.Title>{competition.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

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
        <p style={{ color: "white", textAlign: "center", fontSize: "12px" }}>
          &copy; Copyright Pets 2022, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Competition;
