import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import {Link, Route, Routes} from "react-router-dom";
import Home from "./Home";

const Login = () => {

    const [login, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(login, password).then(
              (response) => {
                localStorage.setItem("userToken" ,response.data.token);
                navigate("/home");
              }, (error) => {
                console.log(error);
              }
            );
          } catch (err) {
            console.log(err);
          }
    }

    return (
      <div className="Auth-form-container" style={{margin:'20px'}}>

        <form className="Auth-form" onSubmit={handleLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                //type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>

        <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="/home" element={<Home />}></Route> */}
        </Routes>
        </div>

      </div>
    )
  }

  export default Login;