import React, { useEffect, useState, BiTrash } from "react";
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
        window.location.reload(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const loadImage = async () => {
    await petService.getImage(props.id).then(
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
    <div key={props.index}>
      <Card
        
        style={{
          width: "14.5%",
          height: "auto",
          minWidth: "18%",
          float: "left",
          position: "revert",
          margin: "1%",
        }}
      >
        <Card.Img
          variant="top"
          style={{ height: "200px" }}
          src={URL.createObjectURL(
            new Blob(binaryData, { type: "image/jpeg" })
          )}
        />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <a>Age: </a>
            <strong>{props.age}</strong>
            <br></br>
            <a>Weight: </a>
            <strong>{props.weight}</strong>
          </Card.Text>
          <div style={{ alignSelf: "flex-end", height: "50px" }}>
            <BiInfoCircle
              style={{ width: "35px", height: "20px" }}
              onClick={() => {
                navigate("/petDetails", {
                  state: { petId: props.id, petImage: binaryData },
                });
              }}
            />
            <Button
              style={{ float: "right" }}
              variant="danger"
              onClick={() => deleteAnimal()}
            >
              Remove pet
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AnimalCard;
