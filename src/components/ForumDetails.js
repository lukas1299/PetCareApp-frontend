import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import forumService from "../services/forum.service";
import { BiLike, BiDislike, BiTrash, BiPaperPlane } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import navbarService from "./navbar.service";

const ForumDetails = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState([]);
  const [image, setImage] = useState([]);
  const [topic, setTopic] = useState([]);

  var binaryData = [];

  const postIsRatedNotify = () => toast.error("Post został już oceniony.");

  const getAllTopicDetails = () => {
    forumService.getTopicDetails().then(
      (response) => {
        setPosts(response.data);
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

  const handlePostEvaluate = async (id, type) => {
    try {
      await forumService.postEvaluate(id, type).then(
        () => {
          getAllTopicDetails();
        },
        (error) => {
          if (error.response.status === 409) {
            postIsRatedNotify();
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getInfoAboutMe = () => {
    forumService.getInfoAboutMe().then(
      (response) => {
        localStorage.setItem("userName", response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getTopic = () => {
    forumService.getTopicDetailsById().then(
      (response) => {
        setTopic(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handlePostCreation = async (e) => {
    try {
      await forumService.createPost(message).then(
        () => {
          window.location.reload(false);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostRemove = async (id) => {
    try {
      await forumService.postRemove(id).then(
        () => {
          getAllTopicDetails();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAvatar();
    getInfoAboutMe();
    getTopic();
    getAllTopicDetails();
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

      <div
        style={{
          width: "100%",
          height: "auto",
          float: "left",
          marginTop: "80px",
        }}
      >
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
          <div
            style={{
              backgroundColor: "#8adbd3",
              color: "#242526",
              border: "1px solid #8adbd3",
              padding: "20px",
              marginLeft: "5%",
              marginTop: "2px",
              width: "90%",
              height: "auto",
            }}
          >
            <div
              style={{
                width: "60%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "7px",
                textAlign: "center",
              }}
            >
              <h6>Tytuł:</h6>
              <h4>{topic.title}</h4>
              <div>
                <h6>Opis:</h6>
                <h5>{topic.description}</h5>
              </div>
            </div>
            <a style={{ marginRight: "5px" }}>{topic.creationDate}</a>
          </div>

          {posts.map((post, index) => {
            if (post.username === localStorage.getItem("userName")) {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#242526",
                    color: "white",
                    border: "1px solid #242526",
                    padding: "20px",
                    margin: "0px",
                    marginLeft: "5%",
                    marginTop: "2px",
                    width: "90%",
                    height: "auto",
                  }}
                >
                  <div style={{ alignItems: "center" }}>
                    <img
                      src={window.URL.createObjectURL(new Blob(binaryData))}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "15px",
                        marginLeft: "4%",
                      }}
                    ></img>
                    <a style={{ marginLeft: "1%" }}>{post.username}</a>
                    <a style={{ fontSize: "11px", float: "right" }}>
                      {post.post.postCreationDate}
                    </a>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <a style={{ marginLeft: "2%" }}>{post.post.message}</a>
                  </div>

                  <BiTrash
                    style={{
                      float: "right",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePostRemove(post.post.id)}
                  />
                  <br></br>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#242526",
                    color: "white",
                    border: "1px solid #242526",
                    padding: "20px",
                    margin: "0px",
                    marginLeft: "5%",
                    marginTop: "2px",
                    width: "90%",
                    height: "auto",
                  }}
                >
                  <div style={{ alignItems: "center" }}>
                    <img
                      src={"data:image/png;base64," + post.photo}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "15px",
                        marginLeft: "4%",
                      }}
                    ></img>
                    <a style={{ marginLeft: "1%" }}>{post.username}</a>
                    <a style={{ fontSize: "11px", float: "right" }}>
                      {post.post.postCreationDate}
                    </a>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <a style={{ marginLeft: "2%" }}>{post.post.message}</a>
                  </div>

                  <div style={{ float: "right" }}>
                    <a style={{ marginRight: "2px" }}>
                      {post.post.negativeOpinionAmount}
                    </a>
                    <BiDislike
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() =>
                        handlePostEvaluate(post.post.id, "dislike")
                      }
                    />
                    <BiLike
                      style={{ color: "green", cursor: "pointer" }}
                      onClick={() => handlePostEvaluate(post.post.id, "like")}
                    />
                    <a style={{ marginLeft: "2px" }}>
                      {post.post.positiveOpinionAmount}
                    </a>
                  </div>
                  <br></br>
                </div>
              );
            }
          })}

          <div
            style={{
              backgroundColor: "#242526",
              color: "white",
              border: "1px solid #242526",
              padding: "20px",
              marginLeft: "5%",
              marginTop: "2px",
              width: "90%",
              height: "auto",
            }}
          >
            <div
              style={{
                width: "60%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "7px",
                display: "flex",
              }}
            >
              <input
                id="messageInput"
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Napisz wiadomość..."
                className="form-control"
                aria-label="Username"
              ></input>
              <BiPaperPlane
                style={{
                  width: "25px",
                  height: "25px",
                  margin: "7px",
                  color: "#8adbd3",
                  cursor: "pointer",
                }}
                onClick={(e) => handlePostCreation()}
              />
            </div>
          </div>

          <br></br>
          <br></br>
        </div>
        <br></br>
        <br></br>
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

export default ForumDetails;
