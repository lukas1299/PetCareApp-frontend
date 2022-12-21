import React, { useEffect, useState } from "react";
import petService from "../services/pet.service";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const AnimalCard = (props) => {

  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  var binaryData = [];

  const loadImage = () => {
    petService.getImage(props.id).then(
      (response) => {
        setImage(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadImage();
  }, []);

  binaryData.push(image);

  return (
    <>
      <Card
        style={{
          width: "14.5%",
          minWidth: "250px",
          minHeight: "300px",
          float: "left",
          position: "revert",
          cursor: "pointer",
          margin: "1%",
        }}
        onClick={() => {
          navigate("/petDetails", { state: { petId: props.id } });
        }}
      >
        <Card.Img
          variant="top"
          src={URL.createObjectURL(
            new Blob(binaryData, { type: "image/jpeg" })
          )}
        />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
           
          </Card.Text>
          <Button style={{ float: "right" }} variant="danger">
            Remove pet
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default AnimalCard;
