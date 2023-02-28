import React from "react";
import "./NavbarComponent.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { BiLogOut } from "react-icons/bi";
import Logo from "./photos/flamingo.png";
import zIndex from "@mui/material/styles/zIndex";

const NavbarComponent = (props) => {
  return (
    <div style={{ position: "fixed", width: "100%", textAlign: "center", zIndex:"1" }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Image
            src={Logo}
            style={{ width: "35px", marginRight: "15px" }}
            rounded
          />
          <Navbar.Brand href="/home">Pet care</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Strona główna</Nav.Link>
            <Nav.Link href="/pets">Zwierzęta</Nav.Link>
            <Nav.Link href="/forum">Forum</Nav.Link>
            <Nav.Link href="/collections">Zbiórki</Nav.Link>
            <Nav.Link href="/quizzes">Quizy</Nav.Link>
            <Nav.Link href="/news">Nowości</Nav.Link>
            <Nav.Link href="/competitions">Galeria i konkursy</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/myPanel">
              <Image
                src={window.URL.createObjectURL(new Blob(props.image))}
                style={{ width: "30px", margin: "1px" }}
                rounded
              />
            </Nav.Link>
            <Nav.Link href="/login">
              <BiLogOut style={{ width: "20px", height: "20px" }} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
