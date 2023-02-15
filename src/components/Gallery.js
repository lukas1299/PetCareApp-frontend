import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useNavigate, useLocation } from "react-router-dom";
import navbarService from "./navbar.service";
import quizzesService from "../services/quizzes.service";
import Carousel from "react-bootstrap/Carousel";
import agama from "./photos/agamaQ.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import paw from "./photos/paw.png";

const Gallery = () => {
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

  useEffect(() => {
    loadAvatar();
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
              marginTop: "1%",
              margin: "auto",
              position: "initial",
              backgroundColor: "#e1e5eb",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
            }}
          >
            <a
              style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}
            >
              Gallery
            </a>
            <br></br>
            <br></br>
            <div
              style={{
                width: "800px",
                height: "500px",
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
              }}
            >
              <Card
                style={{
                  width: "350px",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                  textAlign: "center",
                }}
              >
                <Card.Img variant="top" style={{ height: "15%" }} src={agama} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <a><strong>Bela</strong></a>
                  </Card.Text>
                  <Card.Text>
                    <a>Collected votes:</a>
                  </Card.Text>
                  <Card.Text>
                    <a>
                      <strong>342</strong>
                    </a>
                  </Card.Text>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      height: "auto",
                      width: "70px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      cursor:"pointer"
                    }}
                  >
                    <img src={paw} style={{ width: "60px" }} />
                  </div>
                </Card.Body>
              </Card>
              <Card
                style={{
                  width: "350px",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                  textAlign: "center",
                }}
              >
                <Card.Img variant="top" style={{ height: "15%" }} src={agama} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <a><strong>Bela</strong></a>
                  </Card.Text>
                  <Card.Text>
                    <a>Collected votes:</a>
                  </Card.Text>
                  <Card.Text>
                    <a>
                      <strong>342</strong>
                    </a>
                  </Card.Text>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      height: "auto",
                      width: "70px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      cursor:"pointer"
                    }}
                  >
                    <img src={paw} style={{ width: "60px" }} />
                  </div>
                </Card.Body>
              </Card>

              <Card
                style={{
                  width: "350px",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                  textAlign: "center",
                }}
              >
                <Card.Img variant="top" style={{ height: "15%" }} src={agama} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <a><strong>Bela</strong></a>
                  </Card.Text>
                  <Card.Text>
                    <a>Collected votes:</a>
                  </Card.Text>
                  <Card.Text>
                    <a>
                      <strong>342</strong>
                    </a>
                  </Card.Text>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      height: "auto",
                      width: "70px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      cursor:"pointer"
                    }}
                  >
                    <img src={paw} style={{ width: "60px" }} />
                  </div>
                </Card.Body>
              </Card>
              <Card
                style={{
                  width: "350px",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                  textAlign: "center",
                }}
              >
                <Card.Img variant="top" style={{ height: "15%" }} src={agama} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <a><strong>Bela</strong></a>
                  </Card.Text>
                  <Card.Text>
                    <a>Collected votes:</a>
                  </Card.Text>
                  <Card.Text>
                    <a>
                      <strong>342</strong>
                    </a>
                  </Card.Text>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      height: "auto",
                      width: "70px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      cursor:"pointer"
                    }}
                  >
                    <img src={paw} style={{ width: "60px" }} />
                  </div>
                </Card.Body>
              </Card>
            </div>

            <a
              style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}
            >
              Competition
            </a>
            <div
              style={{
                width: "800px",
                height: "500px",
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
              }}
            >
              <Card
                style={{
                  width: "350px",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                  textAlign: "center",
                }}
              >
                <Card.Img variant="top" style={{ height: "15%" }} src={agama} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <a><strong>Bela</strong></a>
                  </Card.Text>
                  <Card.Text>
                    <a>Collected votes:</a>
                  </Card.Text>
                  <Card.Text>
                    <a>
                      <strong>342</strong>
                    </a>
                  </Card.Text>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      height: "auto",
                      width: "70px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      cursor:"pointer"
                    }}
                  >
                    <img src={paw} style={{ width: "60px" }} />
                  </div>
                </Card.Body>
              </Card>
              <Card
                style={{
                  width: "350px",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                  textAlign: "center",
                }}
              >
                <Card.Img variant="top" style={{ height: "15%" }} src={agama} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <a><strong>Bela</strong></a>
                  </Card.Text>
                  <Card.Text>
                    <a>Collected votes:</a>
                  </Card.Text>
                  <Card.Text>
                    <a>
                      <strong>342</strong>
                    </a>
                  </Card.Text>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      height: "auto",
                      width: "70px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      cursor:"pointer"
                    }}
                  >
                    <img src={paw} style={{ width: "60px" }} />
                  </div>
                </Card.Body>
              </Card>

              <Card
                style={{
                  width: "350px",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                  textAlign: "center",
                }}
              >
                <Card.Img variant="top" style={{ height: "15%" }} src={agama} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <a><strong>Bela</strong></a>
                  </Card.Text>
                  <Card.Text>
                    <a>Collected votes:</a>
                  </Card.Text>
                  <Card.Text>
                    <a>
                      <strong>342</strong>
                    </a>
                  </Card.Text>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      height: "auto",
                      width: "70px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      cursor:"pointer"
                    }}
                  >
                    <img src={paw} style={{ width: "60px" }} />
                  </div>
                </Card.Body>
              </Card>
              <Card
                style={{
                  width: "350px",
                  height: "auto",
                  minWidth: "18%",
                  float: "left",
                  position: "revert",
                  margin: "1%",
                  textAlign: "center",
                }}
              >
                <Card.Img variant="top" style={{ height: "15%" }} src={agama} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    <a><strong>Bela</strong></a>
                  </Card.Text>
                  <Card.Text>
                    <a>Collected votes:</a>
                  </Card.Text>
                  <Card.Text>
                    <a>
                      <strong>342</strong>
                    </a>
                  </Card.Text>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      height: "auto",
                      width: "70px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      cursor:"pointer"
                    }}
                  >
                    <img src={paw} style={{ width: "60px" }} />
                  </div>
                </Card.Body>
              </Card>
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
