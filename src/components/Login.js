import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Logo from "./photos/logo.png";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const [login, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const validateLogin = (login) => {
    if (login.length === 0) {
      setLoginError("The login cannot be empty.");
      return false;
    }
    setLoginError(null);
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Incorrect password!");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLogin(login) && validatePassword(password)) {
      try {
        await authService.login(login, password).then(
          (response) => {
            setSubmitError(null);
            localStorage.setItem("userToken", response.data.token);
            navigate("/home");
          },
          (error) => {
            console.log(error);
            if (error.response.status === 400) {
              setSubmitError("Invalid login or password.");
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "90%",
          height: "90vh",
          backgroundColor: "white",
          boxShadow:
            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)",
          marginTop: "40px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            width: "60%",
            textAlign: "center",
            height: "100%",
            backgroundColor: "#8adbd3",
            float: "left",
          }}
        >
          <br></br>
          <a
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "40px",
              marginTop: "10%",
            }}
          >
            Sign in to Account
          </a>
          <div
            style={{
              display: "block",
              borderBottom: "1px solid #000000",
              marginBottom: "5px",
              marginTop: "10px",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>
          <form
            className="Auth-form"
            onSubmit={handleLogin}
            style={{ marginTop: "3%" }}
          >
            <div className="Auth-form-content">
              <div className="form-group mt-3">
                <label>
                  <strong>Login</strong>
                </label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter login"
                  style={{
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {loginError && (
                  <Alert
                    variant="danger"
                    style={{
                      width: "50%",
                      marginTop: "3px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {loginError}
                  </Alert>
                )}
              </div>
              <div className="form-group mt-3">
                <label>
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  style={{
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <Alert
                    variant="danger"
                    style={{
                      width: "50%",
                      marginTop: "3px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {passwordError}
                  </Alert>
                )}
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Login
                </button>
                {submitError && (
                  <Alert
                    variant="danger"
                    style={{
                      width: "50%",
                      marginTop: "3px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {submitError}
                  </Alert>
                )}
                <br></br>

                <br></br>
                <div
                  style={{
                    display: "block",
                    borderBottom: "1px solid #000000",
                    marginBottom: "5px",
                    marginTop: "10px",
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                ></div>
                <a>
                  <strong>
                    Fill up personal information and start journey with us.
                  </strong>
                </a>

                <button
                  className="btn btn-success"
                  style={{
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
        <div style={{ float: "left", width: "40%", height: "100%" }}>
          <img
            src={Logo}
            style={{ width: "95%", marginLeft: "2.5%", marginTop: "20%" }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
