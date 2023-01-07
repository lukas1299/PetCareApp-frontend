import React, { useEffect, useState } from "react";
import petService from "../services/pet.service";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { BiInfoCircle } from "react-icons/bi";

const AnimalCard = (props) => {

  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  var binaryData = [];

  const deleteAnimal = () => {
    petService.deleteAnimal(props.id).then(
      () => {
        window.location.reload(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

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
           <a>Age: </a><strong>{props.age}</strong>
           <br></br>
           <a>Weight: </a><strong>{props.weight}</strong>
          </Card.Text>
          <BiInfoCircle style={{width:"20px", height:"20px"}} onClick={() => {
          navigate("/petDetails", { state: { petId: props.id, petImage: binaryData } });
        }}/>
          <Button style={{ float: "right" }} variant="danger" onClick={() => deleteAnimal()}>
            Remove pet
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default AnimalCard;
