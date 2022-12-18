import React, { useEffect, useState } from "react"
import NavbarComponent from "./NavbarComponent";
import petService from "../services/pet.service";

const AnimalCard = () => {

    

    return (
        <>
        <Card  key={index} style={{ width: '14.5%', minWidth:"250px", minHeight:"300px", float:"left", position:"revert", cursor:"pointer", margin:"1%"}} onClick={() => {navigate("/petDetails", { state: {petId: animal.id}});}}>
            <Card.Img variant="top" src={URL.createObjectURL(new Blob(binaryData, {type: "image/jpeg"}))} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    {animal.name}
                    <img src={image}></img>
                </Card.Text>
                    <Button style={{float:"right"}} variant="danger">Remove pet</Button>
                </Card.Body>
        </Card>
        
        </>
    )
                    

}

export default AnimalCard;