import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useNavigate, useLocation } from "react-router-dom";
import navbarService from "./navbar.service";
import quizzesService from "../services/quizzes.service";

const Quiz = () => {
  const [image, setImage] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { quizId } = state;
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0);

  const handleCorrectAnswerCounter = () => {
    setCorrectAnswerCounter(correctAnswerCounter + 1);
  };

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

  const loadQuizQuestions = () => {
    quizzesService.getQuestions(quizId).then(
      (response) => {
        console.log(response.data);
        setQuestions(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const itemExists = (item) => {
    return localStorage.getItem("question" + item) !== null;
  };

  const handleAnswerSelection = (questionId, answerId) => {
    if (!itemExists(questionId)) {
      const question = questions.find((obj) => obj.id == questionId);
      const selectedAnswer = question.quizAnswer.find(
        (obj) => obj.id == answerId
      );

      if (selectedAnswer.correctness === true) {
        document.getElementById(answerId).style.backgroundColor = "#60BB46";
        handleCorrectAnswerCounter();
      } else {
        document.getElementById(answerId).style.backgroundColor = "#ED553B";
        const correctAnswer = question.quizAnswer.find(
          (obj) => obj.correctness == true
        );
        document.getElementById(correctAnswer.id).style.backgroundColor =
          "#60BB46";
      }
      localStorage.setItem("question" + questionId, questionId);
    }
  };

  const clearStorage = () => {
    const questionKeys = Object.keys(localStorage).filter((key) =>
      key.includes("question")
    );
    questionKeys.forEach((key) => localStorage.removeItem(key));
  };

  const handleChangeColor = (questionId, id, color) => {
    if (!itemExists(questionId)) {
      document.getElementById(id).style.backgroundColor = color;
    }
  };

  const handleQuizFinish = () => {
    quizzesService.finishQuiz(quizId, correctAnswerCounter).then(
      () => {
        clearStorage();
        navigate("/quizzes");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadAvatar();
    loadQuizQuestions();
    clearStorage();
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
              Quizzes
            </a>
            <br></br>
            <br></br>

            <div
              style={{ width: "10%", marginLeft: "auto", marginRight: "auto" }}
            >
              <a style={{ fontSize: "40px" }}>{correctAnswerCounter}/10</a>
            </div>

            <br></br>
            <br></br>

            <div style={{}}>
              {questions.map((question, index) => {
                return (
                  <div key={index}>
                    <div style={{ width: "700px",marginLeft:"10%"}}>
                      <img
                        src={"data:image/png;base64," + question.photo}
                        style={{ width: "850px", borderRadius: "15px" }}
                      />
                      <br></br>
                      <br></br>
                      <div style={{ width: "850px", textAlign: "center" }}>
                        <h5>{question.content}</h5>
                      </div>

                      <div
                        style={{
                          width: "850px",
                          height: "auto",
                          backgroundColor: "#e1e5eb",
                          textAlign: "left",
                          margin: "1px",

                          cursor: "pointer",
                        }}
                      >
                        <a
                          style={{
                            margin: "20px",
                            fontSize: "25px",
                            fontWeight: "bold",
                          }}
                        >
                          {question.quizAnswer.map((answer, index) => {
                            return (
                              <div key={index}>
                                <div
                                  style={{
                                    width: "850px",
                                    height: "auto",
                                    backgroundColor: "white",
                                    textAlign: "left",
                                    margin: "2px",
                                    display: "flex",
                                    cursor: "pointer",
                                  }}
                                  id={answer.id}
                                  onMouseEnter={() =>
                                    handleChangeColor(
                                      question.id,
                                      answer.id,
                                      "#E7E3E3"
                                    )
                                  }
                                  onMouseLeave={() =>
                                    handleChangeColor(
                                      question.id,
                                      answer.id,
                                      "white"
                                    )
                                  }
                                  onClick={() =>
                                    handleAnswerSelection(
                                      question.id,
                                      answer.id
                                    )
                                  }
                                >
                                  <a
                                    style={{
                                      margin: "20px",
                                      fontSize: "22px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {answer.answer}
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                width: "10%",
                height: "40px",
                backgroundColor: "green",
                textAlign: "center",
                fontSize: "24px",
                borderRadius: "10px",
                marginLeft: "auto",
                marginRight: "auto",
                cursor: "pointer",
              }}
              onClick={() => handleQuizFinish()}
            >
              <a>Finish</a>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
