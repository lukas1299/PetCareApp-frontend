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
                      navigate("/quizzes/quiz", { state: { quizId: quiz.quiz.id } });
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
                      <a>{quiz.quiz.topic}</a>
                    </div>

                    <a style={{ color: "green", fontWeight: "bold" }}>{quiz.result}%</a>
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
