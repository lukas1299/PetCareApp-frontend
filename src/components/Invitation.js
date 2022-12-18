import React, { useEffect, useState } from "react"
import NavbarComponent from "./NavbarComponent";
import petService from "../services/pet.service";

const Invitation = () => {

    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        petService.getUserAnimals().then((response) => {
            setAnimals(response.data);
            console.log(response);
            }, (error) => {
            console.log(error);
            }
        );
    }, []);

    return(
        <div>
            <NavbarComponent />

            

        </div>
    );
}

export default Invitation;