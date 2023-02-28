import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useLocation } from "react-router-dom";
import navbarService from "./navbar.service";
import { ToastContainer } from "react-toastify";

const NewsDetails = () => {
  const [image, setImage] = useState([]);
  const { state } = useLocation();
  const { paragraphs } = state;
  const { newsTitle } = state;
  const { newsPhoto } = state;
  const { newsDate } = state;

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
            <div style={{ marginLeft: "7%" }}>
              <a
                style={{
                  fontWeight: "bold",
                  fontSize: "70px",
                  clear: "both",
                }}
              >
                {newsTitle}
              </a>
              <h6>{newsDate.slice(0, 10)}</h6>
            </div>
            <br />
            <img
              style={{ width: "500px", marginLeft: "7%", borderRadius:"15px" }}
              src={"data:image/png;base64," + newsPhoto}
            />

            {paragraphs.map((paragraph, index) => {
              return (
                <div
                  key={index}
                  style={{ marginLeft: "7%", marginTop: "30px" }}
                >
                  <h2>{paragraph.title}</h2>
                  <div style={{ width: "600px" }}>
                    <p style={{fontSize:"20px"}}>
                      {paragraph.text}
                    </p>
                  </div>
                </div>
              );
            })}

            <br></br>
            <br></br>

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

export default NewsDetails;
