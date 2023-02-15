import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Pets from "./components/Pets";
import Forum from "./components/Forum";
import ForumDetails from "./components/ForumDetails";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PetDetails from "./components/PetDetails";
import Friends from "./components/Friends";
import Collections from "./components/Collections";
import PayRealization from "./components/PayRealization";
import UserPanel from "./components/UserPanel";
import MyPanel from "./components/MyPanel";
import Quizzes from "./components/Quizzes";
import News from "./components/News";
import Competition from "./components/Competition";
import CompetitionDetails from "./components/CompetitionDetails";
import Quiz from "./components/Quiz";
import NewsDetail from "./components/NewsDetail";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/pets" element={<Pets />}></Route>
          <Route path="/petDetails" element={<PetDetails />}></Route>
          <Route path="/forum" element={<Forum />}></Route>
          <Route path="/forumDetails" element={<ForumDetails />}></Route>
          <Route path="/friends" element={<Friends />}></Route>
          <Route path="/collections" element={<Collections />}></Route>
          <Route path="/collections/pay" element={<PayRealization />}></Route>
          <Route path="/userPanel" element={<UserPanel />}></Route>
          <Route path="/myPanel" element={<MyPanel />}></Route>
          <Route path="/quizzes" element={<Quizzes />}></Route>
          <Route path="/quizzes/quiz" element={<Quiz />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/newsDetail" element={<NewsDetail />}></Route>
          <Route path="/competitions" element={<Competition />}></Route>
          <Route path="/competitions/details" element={<CompetitionDetails />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
