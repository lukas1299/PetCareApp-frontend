import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import image from "./image.png";
import notification from "./notification.png";
import pets from "./pets.png";
import "./NavbarComponent.css";
import { color } from "@mui/system";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { BiBell } from "react-icons/bi";

const NavbarComponent = (props) => {
  return (
    <div style={{ position: "fixed", width: "100%", textAlign: "center" }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Pets</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/pets">Pets</Nav.Link>
            <Nav.Link href="/forum">Forum</Nav.Link>
            <Nav.Link href="/collection">Collections</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <BiBell style={{ width: "20px", height: "20px" }} />
            </Nav.Link>
            <Nav.Link>
              <Image
                src={window.URL.createObjectURL(new Blob(props.image))}
                style={{ width: "30px", margin: "1px" }}
                rounded
              />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
