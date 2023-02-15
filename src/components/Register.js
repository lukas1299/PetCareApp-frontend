import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Logo from "./photos/logo.png";
import Alert from "react-bootstrap/Alert";
import { BiLinkAlt } from "react-icons/bi";
import basicUserAvatar from "./photos/basicUserAvatar.png";

const Register = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [radioState, setRadioState] = useState(false);

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [userImage, setUserImage] = useState();

  const validateLogin = () => {
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setSubmitError(null);
    if (login.length === 0) {
      setLoginError("The login cannot be empty.");
      return false;
    }
    setLoginError(null);
    return true;
  };

  const fileHandler = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      var file = e.target.files[0];
      setUserImage(file);
      document.getElementById("clip").style.color = "#e62e3a";
    };

    input.click();
  };

  const validatePassword = () => {
    setLoginError(null);
    setEmailError(null);
    setConfirmPasswordError(null);
    setSubmitError(null);
    if (password.length < 8) {
      setPasswordError("Incorrect password!");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const validateEmail = () => {
    setLoginError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setSubmitError(null);
    if (email.length < 5) {
      setEmailError("Incorrect email length");
      return false;
    } else if (!email.match("@")) {
      setEmailError("Email address must have @");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validateConfirmPassword = () => {
    setLoginError(null);
    setEmailError(null);
    setPasswordError(null);
    setSubmitError(null);

    if (password !== confirmPassword) {
      setConfirmPasswordError("The passwords are not the same");
      return false;
    }
    setConfirmPasswordError(null);
    return true;
  };

  const validateSubmit = () => {
    setLoginError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setSubmitError(null);
    if (!radioState) {
      setSubmitError("Accept the terms and conditions");
      return false;
    }
    setSubmitError(null);
    return true;
  };

  const handleRegister = async () => {
    if (userImage === undefined) {
      fetch(basicUserAvatar)
        .then((res) => res.blob())
        .then((blob) => {
          setUserImage(new File([blob], "image.jpg", { type: "image/jpeg" }));
        })
        .catch((error) => console.log(error));
    }

    if (
      validateLogin() &&
      validateEmail() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword() &&
      validateSubmit()
    ) {
      try {
        await authService.register(login, email, password, userImage).then(
          () => {
            navigate("/login");
          },
          (error) => {
            console.log(error);
            if (error.response.status === 400) {
              setSubmitError("The user already exists");
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
            Sign up
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

          <div className="Auth-form-content">
            <div className="form-group mt-3">
              <label>
                <strong>Login / Username</strong>
              </label>
              <input
                className="form-control mt-1"
                placeholder="Enter login"
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onChange={(e) => setLogin(e.target.value)}
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
                <strong>Email</strong>
              </label>
              <input
                className="form-control mt-1"
                placeholder="Enter email"
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <Alert
                  variant="danger"
                  style={{
                    width: "50%",
                    marginTop: "3px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {emailError}
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
            <div className="form-group mt-3">
              <label>
                <strong>Confirm password</strong>
              </label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Confirm password"
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && (
                <Alert
                  variant="danger"
                  style={{
                    width: "50%",
                    marginTop: "3px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {confirmPasswordError}
                </Alert>
              )}
            </div>
            <input
              onClick={() => setRadioState(!radioState)}
              type={"radio"}
              checked={radioState}
            />
            <a style={{ marginLeft: "10px" }}>
              I accept the terms and conditions
            </a>
            <br></br>
            <a>
              <BiLinkAlt
                id="clip"
                style={{ width: "25px", height: "25px", cursor: "pointer" }}
                onClick={() => fileHandler()}
              />{" "}
              Select photo
            </a>

            <div className="d-grid gap-2 mt-3">
              <button
                className="btn btn-success"
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={() => handleRegister()}
              >
                Register
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
            </div>
          </div>
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

export default Register;
