import React, { useEffect, useState } from "react";
import {Link, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Pets from "./components/Pets";
import Forum from "./components/Forum";
import ForumDetails from "./components/ForumDetails";
import AuthService from "./services/auth.service"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "bootstrap";
import Invitation from "./components/Invitation";
import PetDetails from "./components/PetDetails";
import Friends from "./components/Friends";
import Achievements from "./components/Achievements";
import Collections from "./components/Collections";


function App() {
  
  return (
    <div>

      <div>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/pets" element={<Pets />}></Route>
          <Route path='/petDetails' element={<PetDetails />}></Route>
          <Route path="/forum" element={<Forum />}></Route>
          <Route path="/forumDetails" element={<ForumDetails />}></Route>
          <Route path="/invitations" element={<Invitation />}></Route>
          <Route path="/friends" element={<Friends />}></Route>
          <Route path="/achievements" element={<Achievements />}></Route>
          <Route path="/collections" element={<Collections />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
