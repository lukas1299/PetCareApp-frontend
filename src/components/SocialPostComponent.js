import React, { useEffect, useState } from "react";
import homeService from "../services/home.service";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { BiMessageRounded, BiLike, BiDislike } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Avatar from "./image.png";

const SocialPostComponent = (props) => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    setImage(props.post.socialPost.photo);
  }, []);

  return (
    <div
      className="socialPost"
      style={{
        backgroundColor: "#242526",
        border: "1px solid #242526",
        borderRadius: "25px",
        padding: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "7px",
        width: "40%",
        height: "auto",
        boxShadow:
          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)",
      }}
    >
      <div style={{ display: "flex", color: "white", alignItems: "center" }}>
        <img
          src={Avatar}
          style={{ width: "40px", height: "40px", borderRadius: "15px" }}
        ></img>
        <a style={{ marginLeft: "2%" }}>{props.post.user.username}</a>
      </div>
      <div
        style={{
          borderStyle: "solid",
          color: "gray",
          borderWidth: "1px",
          borderRadius: "15px",
          marginTop: "8px",
          height: "auto",
          textAlign: "center",
        }}
      >
        <p style={{ color: "white", margin: "5px" }}>
          {props.post.socialPost.content}
        </p>
        <Image
          style={{ width: "100%", borderRadius: "15px" }}
          src={"data:image/png;base64," + image}
        //   src={URL.createObjectURL(
        //     new Blob(binaryData, { type: "image/jpeg" })
        //   )}
        />
      </div>
      <div style={{ color: "#8adbd3", margin: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            float: "left",
            cursor: "pointer",
          }}
        >
          <a>Comments</a>
          <BiMessageRounded
            style={{ width: "20px", height: "20px", margin: "2px" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", float: "right" }}>
          <a style={{ marginRight: "4px" }}>
            {props.post.socialPost.negativeOpinionAmount}
          </a>
          <BiDislike
            style={{
              color: "#e62e3a",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
            // onClick={() => handlePostEvaluate(post.socialPost.id, "dislike")}
          />
          <BiLike
            style={{
              color: "#228734",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
            // onClick={() => handlePostEvaluate(post.socialPost.id, "like")}
          />
          <a style={{ marginLeft: "4px" }}>
            {props.post.socialPost.positiveOpinionAmount}
          </a>
        </div>
        <br />
      </div>
    </div>
  );
};

export default SocialPostComponent;
