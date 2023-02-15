import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { BiQuestionMark } from "react-icons/bi";
import navbarService from "./navbar.service";
import newsService from "../services/news.service";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [image, setImage] = useState([]);

  const [news, setNews] = useState([]);
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

  const getAllNews = async () => {
    await newsService.getAllNews().then(
      (response) => {
        console.log(response.data);
        setNews(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadAvatar();
    getAllNews();
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
                News
              </a>
            </div>
            <br />

            {news.map((n, index) => {
              return (
                <div key={index}>
                  <Card
                    style={{ width: "700px", marginLeft: "7%", cursor:"pointer", marginTop:"10px" }}
                    onClick={() => {
                      navigate("/newsDetail", {
                        state: {
                          newsDate: n.news.date,
                          newsPhoto: n.news.photo,
                          newsTitle: n.news.title,
                          paragraphs: n.paragraphList
                        },
                      });
                    }}
                  >
                    <Card.Body style={{ display: "flex" }}>
                      <div>
                        <Card.Img
                          variant="top"
                          style={{ width: "200px" }}
                          src={"data:image/png;base64," + n.news.photo}
                        />
                      </div>
                      <div style={{ margin: "10px", marginLeft: "40px" }}>
                        <Card.Text>{n.news.date.slice(0, 10)}</Card.Text>
                        <Card.Title>{n.news.title}</Card.Title>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
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

export default News;
