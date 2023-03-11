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
import quizzesService from "../services/quizzes.service";
import Alert from "react-bootstrap/Alert";
import { ToastContainer, toast } from "react-toastify";
import piggyBank from "./photos/piggyBank.png";

import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import dogn1 from "./photos/gallery_photo/dogn1.png";
import dogn2 from "./photos/gallery_photo/dogn2.png";
import dogn3 from "./photos/gallery_photo/dogn3.png";
import dogn4 from "./photos/gallery_photo/dogn4.png";
import { width } from "@mui/system";

import balto from "./photos/gallery_photo/balto.png";
import proteo from "./photos/gallery_photo/proteo.png";
import stubby from "./photos/gallery_photo/stubby.png";

import balto2 from "./photos/gallery_photo/balto2.png";
import hachiko from "./photos/gallery_photo/hachiko.png";
import conan from "./photos/gallery_photo/conan.png";
import endal from "./photos/gallery_photo/endal.png";
import endal2 from "./photos/gallery_photo/endal2.png";

import owczarekniem from "./photos/gallery_photo/owczarekniem.png";
import labradorret from "./photos/gallery_photo/labradorret.png";
import jackrus from "./photos/gallery_photo/jackrus.png";

import beagle from "./photos/gallery_photo/beagle.png";
import collie from "./photos/gallery_photo/collie.png";

import greyhound from "./photos/gallery_photo/greyhound.png";

import choroba from "./photos/gallery_photo/choroba.png";

const Quizzes = () => {
  const [image, setImage] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

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
  const loadQuizzes = () => {
    quizzesService.getQuizzes().then(
      (response) => {
        console.log(response.data);
        setQuizzes(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadAvatar();
    loadQuizzes();
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
          <br></br>
          <br></br>

          <a style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}>
            Rankingi dotyczące psów
          </a>
          <br></br>
          <br></br>
          <div style={{ width: "100%", backgroundColor: "#125137" }}>
            <br></br>
            <div
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={5}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <div style={{ display: "flex" }}>
                            <img
                              src={beagle}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Ranking najbardziej przyjaznych psich ras dla
                                dzieci
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <div style={{ display: "flex" }}>
                            <img
                              src={collie}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Ranking najmądrzejszych psich ras
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          <div style={{ display: "flex" }}>
                            <img
                              src={greyhound}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Ranking najbardziej atletycznych psich ras
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">
                          <div style={{ display: "flex" }}>
                            <img
                              src={choroba}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Ranking najczęściej występujących chorób u psów
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={7}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Ranking najbardziej przyjaznych psich ras dla dzieci
                        </h4>
                        <br />
                        <img
                          src={beagle}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        />
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Złote Retriever: Złote Retriever to idealny pies dla
                            dzieci. Są oni bardzo cierpliwi, przyjaźni i
                            łagodni. Lubią bawić się z dziećmi i często są
                            bardzo aktywni, co oznacza, że będą potrzebować
                            wiele ruchu i zabawy.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Labradory: Podobnie jak złote Retriever, Labradory
                            są bardzo przyjazne dla dzieci i uwielbiają bawić
                            się z nimi. Są to inteligentne psy, które łatwo się
                            uczą i bardzo dobrze nadają się do szkolenia.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Beagle: Beagle to rasa psa, która jest zwykle bardzo
                            łagodna i przyjazna dla dzieci. Są to również bardzo
                            energiczne psy, które uwielbiają bawić się i
                            potrzebują dużo ruchu.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Pudel: Pudel to rasa psa, która jest znana ze swojej
                            inteligencji i łatwości w szkoleniu. Są oni również
                            bardzo łagodni i przyjacielscy dla dzieci.
                          </a>
                        </div>
                        <br />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Ranking najmądrzejszych psich ras
                        </h4>
                        <br />
                        <img
                          src={collie}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        />
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Border Collie: Border Collie to rasa psa, która jest
                            znana ze swojej niesamowitej inteligencji. Są one
                            bardzo zwinne, energiczne i bardzo dobrze nadają się
                            do pracy w roli pasterskiej.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Pudel: Pudel to rasa psa, która jest bardzo
                            inteligentna i łatwo się uczy. Są one bardzo
                            energiczne i wesołe, co sprawia, że ​​są one idealne
                            dla rodzin z dziećmi.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Owczarek niemiecki: Owczarek niemiecki to rasa psa,
                            która jest znana ze swojej zdolności do nauki i
                            pracowitości. Są one bardzo posłuszne i łatwo się
                            uczyć, co czyni je idealnymi do pracy w roli psa
                            policyjnego lub ratowniczego.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Golden Retriever: Golden Retriever to rasa psa,
                            która jest bardzo przyjazna i łatwo się uczy. Są one
                            również bardzo aktywne i uwielbiają pracować, co
                            sprawia, że ​​są one idealne dla rodzin z dziećmi.
                          </a>
                        </div>
                        <br />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Ranking najbardziej atletycznych psich ras
                        </h4>
                        <br />
                        <img
                          src={greyhound}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        />
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Greyhound: Greyhound to rasa psa, która jest znana z
                            doskonałej szybkości i wytrzymałości. Są one idealne
                            do wyścigów i innych sportów, które wymagają dużej
                            prędkości i wytrzymałości.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Ogar polski: Ogar polski to rasa psa, która jest
                            znana ze swojej szybkości i wytrzymałości. Są one
                            idealne dla myśliwych, którzy potrzebują psa, który
                            będzie mógł długo biegać w trudnym terenie.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Siberian Husky: Siberian Husky to rasa psa, która
                            jest znana ze swojej wytrzymałości i siły. Są one
                            idealne do jazdy na sankach, wypraw w góry lub
                            długich biegów.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Australian Shepherd: Australian Shepherd to rasa
                            psa, która jest znana ze swojej szybkości,
                            wytrzymałości i zwinności. Są one idealne dla osób,
                            które lubią aktywności na świeżym powietrzu, takie
                            jak wspinaczka czy jogging.
                          </a>
                        </div>
                        <br />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Ranking najczęściej występujących chorób u psów
                        </h4>
                        <br />
                        <img
                          src={choroba}
                          style={{
                            width: "450px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        />
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Choroby zębów i dziąseł: Zęby i dziąsła psa są
                            narażone na rozwój chorób, takich jak choroba
                            przyzębia, kamienie nazębne i infekcje. Nieleczone,
                            choroby te mogą prowadzić do utraty zębów i innych
                            poważnych problemów zdrowotnych.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Otyłość: Otyłość u psów jest coraz częstszym
                            problemem. Nadwaga może prowadzić do wielu problemów
                            zdrowotnych, takich jak cukrzyca, choroby serca i
                            problemy z układem oddechowym.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Choroby skóry: Psy często cierpią na różne choroby
                            skóry, takie jak alergie, grzybice, łuszczyca i
                            infekcje skóry. Choroby te mogą powodować swędzenie,
                            łysienie, ból i dyskomfort.
                          </a>
                        </div>
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                          <div>
                            <svg
                              fill="#7ECE68"
                              height="24px"
                              width="24px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 392.747 392.747"
                            >
                              <path
                                d="M379.498,90.453l-40.104-16.18c-2.449-12.946-12.287-23.311-24.947-26.528l-2.169-24.992
	c-0.31-3.565-2.702-6.608-6.093-7.75c-3.392-1.142-7.138-0.168-9.541,2.484l-10.492,11.572l-6.437-22.531
	c-1.072-3.752-4.441-6.386-8.341-6.522c-3.898-0.121-7.443,2.258-8.774,5.928l-55.536,153.21
	c-39.95,10.374-74.835,35.938-96.262,70.724c-19.626,31.862-25.722,68.366-17.165,102.786c5.001,20.117,14.496,33.373,24.209,42.065
	h-7.639c-0.072,0-0.144,0.001-0.216,0.003c-36.135,0.881-69.622-19.663-85.259-52.307c-2.147-4.483-7.522-6.375-12.005-4.229
	c-4.483,2.148-6.376,7.522-4.228,12.005c18.31,38.226,57.078,62.557,99.286,62.557c0.842,0,171.829,0,171.829,0c4.971,0,9-4.029,9-9
	c0-24.226-19.323-35.268-36.377-39.321c7.974-15.546,8.663-29.218,7.759-38.162l2.352-0.314l53.943,82.713
	c1.662,2.547,4.497,4.083,7.539,4.083h32.755c3.277,0,6.296-1.782,7.879-4.651c1.584-2.869,1.482-6.373-0.265-9.146
	c-0.348-0.552-34.166-54.247-52.346-84.309V143.416c2.676,0.308,5.681,0.463,8.335,0.463c26.109,0,50.664-14.73,63.885-40.848
	c0.011-0.021,0.35-0.729,0.404-0.865C386.337,97.557,384.108,92.312,379.498,90.453z"
                              />
                            </svg>
                          </div>
                          <a
                            style={{
                              fontSize: "18px",
                              textAlign: "justify",
                              color: "#7ECE68",
                              marginLeft: "10px",
                              textJustify: "inter-word",
                            }}
                          >
                            Choroby serca: Choroby serca u psów obejmują wiele
                            różnych stanów, takich jak choroby zastawek serca,
                            choroby mięśnia sercowego i niewydolność serca.
                            Choroby te mogą prowadzić do trudności z
                            oddychaniem, osłabienia i innych poważnych problemów
                            zdrowotnych.
                          </a>
                        </div>
                        <br />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
              <br></br>
            </div>
          </div>
          <br />
          <a style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}>
            Ranking ras psów w Polsce
          </a>
          <br />
          <br />
          <br />
          <div
            style={{
              width: "100%",
              height: "450px",
              backgroundColor: "#e1e5eb",
              textAlign: "center",
              display: "flex",
            }}
          >
            <div style={{ width: "33.3%" }}>
              <br></br>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="100"
                height="100"
              >
                <path
                  fill="#D4AF37"
                  d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"
                />
              </svg>

              <br></br>
              <br></br>

              <img
                src={owczarekniem}
                style={{
                  width: "60%",
                  borderRadius: "15px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
              ></img>
              <div>
                <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                  Owczarek niemiecki
                </a>
              </div>
            </div>
            <div style={{ width: "33.3%" }}>
              <br></br>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="100"
                height="100"
              >
                <path
                  fill="#C0C0C0"
                  d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"
                />
              </svg>

              <br></br>
              <br></br>

              <img
                src={labradorret}
                style={{
                  width: "60%",
                  borderRadius: "15px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
              ></img>
              <div>
                <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                  Labrador retriever
                </a>
              </div>
            </div>
            <div style={{ width: "33.3%" }}>
              <br></br>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="100"
                height="100"
              >
                <path
                  fill="#D2691E"
                  d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"
                />
              </svg>

              <br></br>
              <br></br>
              <img
                src={jackrus}
                style={{
                  width: "60%",
                  borderRadius: "15px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
              ></img>

              <div>
                <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                  Jack Russell Terrier
                </a>
              </div>
            </div>
          </div>
          <br></br>
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
              Quizy
            </a>
            <br></br>

            {quizzes.map((quiz, index) => {
              return (
                <div key={index}>
                  <br></br>
                  <div
                    style={{
                      width: "80%",
                      minWidth: "500px",
                      height: "250px",
                      backgroundColor: "#e1e5eb",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "flex",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/quizzes/quiz", {
                        state: { quizId: quiz.quiz.id },
                      });
                    }}
                  >
                    <img
                      src={"data:image/png;base64," + quiz.quiz.photo}
                      style={{ height: "100%", borderRadius: "15px" }}
                    />

                    <div
                      style={{
                        width: "55%",
                        marginLeft: "15px",
                        marginTop: "90px",
                      }}
                    >
                      <a
                        style={{
                          fontSize: "20px",
                          color: "#125137",
                          fontWeight: "bold",
                        }}
                      >
                        {quiz.quiz.topic}
                      </a>
                    </div>

                    <a style={{ color: "green", fontWeight: "bold" }}>
                      {quiz.result}%
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Quizzes;
