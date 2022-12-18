import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import image from './image.png';
import notification from './notification.png';
import pets from './pets.png';
import './NavbarComponent.css';
import { color } from "@mui/system";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiBell } from "react-icons/bi";

const NavbarComponent = () => {

    const [currentUser, setCurrentUser] = useState(undefined);

    return(
        <div style={{position:"fixed", width:"100%", textAlign:"center"}}>

      <Navbar bg="dark" variant="dark" >
        <Container>
          <Navbar.Brand href="#home">Pets</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/pets">Pets</Nav.Link>
            <Nav.Link href="/forum">Forum</Nav.Link>
            <Nav.Link href="/collection">Collections</Nav.Link>
            
          </Nav>
          <Nav>
            <Nav.Link><BiBell style={{width:"20px", height:"20px"}} /></Nav.Link>
            <Nav.Link><Image src={image} style={{width:"30px", margin:"1px"}} rounded /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

            {/* <nav className='navbar navbar-expand navbar-dark bg-background-color-red'>
      

        <img src={pets} style={{width:"130px", height:"35px" , margin:"1px"}} />
          <div className='navbar-nav m-auto'>
          
            
          <li className='nav-item'>
            <Link to={"/home"} className="nav-link">
            Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={"/collections"} className="nav-link">
            Collections
            </Link>
          </li>

          <li className='nav-item'>
            <Link to={"/pets"} className="nav-link">
            My pets
            </Link>
          </li>

          <li className='nav-item'>
            <Link to={"/forum"} className="nav-link">
            Forum
            </Link>
          </li>

          <li className='nav-item'>
            <Link to={"/invitation"} className="nav-link">
            Invitation
            </Link>
          </li>

        </div>
        <div style={{float:"right", color:"#ffffff8c"}}>
            <Link to={"/login"} className="nav-link">
            Logout
            </Link>
        </div>
        
        <img src={notification} style={{width:"35px", borderRadius:"50%", margin:"1px"}} />
        <img src={image} style={{width:"40px", borderRadius:"50%", margin:"1px"}} />
        
      </nav> */}
    </div>
    );
}

export default NavbarComponent;