import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useLocation } from "react-router-dom";
import navbarService from "./navbar.service";
import competitionService from "../services/competition.service";
import Card from "react-bootstrap/Card";
import paw from "./photos/paw.png";
import { ToastContainer, toast } from "react-toastify";

const CompetitionDetails = () => {
  const [image, setImage] = useState([]);
  const { state } = useLocation();
  const { competitionId } = state;
  const [competitionDetails, setCompetitionDetails] = useState([]);

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

  const getCompetitionDetails = () => {
    competitionService.getCompetitionDetails(competitionId).then(
      (response) => {
        console.log(response.data);
        setCompetitionDetails(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const rateRealization = (id) => {
    competitionService.rateRealization(id).then(
      () => {
        getCompetitionDetails();
      },
      (error) => {
        console.log(error);
        if(error.response.status === 409){
            toast.error("You have already chosen your candidate");
        }
        
      }
    );
  }

  useEffect(() => {
    loadAvatar();
    getCompetitionDetails();
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
              height: "auto",
              minHeight: "3000px",
              marginTop: "1%",
              overflow: "auto",
              margin: "auto",
              position: "initial",
              backgroundColor: "#e1e5eb",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
            }}
          >
            <div style={{ height: "50px" }}></div>
            <div style={{ textAlign: "center" }}>
              <a
                style={{
                  fontWeight: "bold",
                  fontSize: "70px",
                  clear: "both",
                }}
              >
                Competitions
              </a>
              <h5>Which photo do you like the most?</h5>
            </div>

            <br></br>
            <br></br>
            <div
              style={{
                width: "800px",
                height: "500px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {competitionDetails.map((detail, index) => {
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
                      }}
                    >
                      <Card.Img
                        variant="top"
                        style={{ height: "15%" }}
                        src={"data:image/png;base64," + detail.photo}
                      />
                      <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                          <a>
                            <strong>{detail.petName}</strong>
                          </a>
                        </Card.Text>
                        <Card.Text>
                          <a>Collected votes:</a>
                        </Card.Text>
                        <Card.Text>
                          <a>
                            <strong>{detail.points}</strong>
                          </a>
                        </Card.Text>
                        <div
                          style={{
                            alignSelf: "flex-end",
                            height: "auto",
                            width: "70px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            cursor: "pointer",
                          }}
                          onClick={() => rateRealization(detail.id)}
                        >
                          <img src={paw} style={{ width: "60px" }} />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
            <br />
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
      <ToastContainer />
    </div>
  );
};

export default CompetitionDetails;
