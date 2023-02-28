import React, { useState } from "react";
import card from "./photos/card.jpg";
import { BiCoin } from "react-icons/bi";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/es/styles-compiled.css";
import { Visa, Mastercard, Amex, Blik } from "react-pay-icons";
import { useLocation, useNavigate } from "react-router-dom";
import payRealizationService from "../services/payRealization.service";
import Alert from "react-bootstrap/Alert";

const PayRealization = () => {
  const [focus, setFocus] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [cardView, setCardView] = useState(false);
  const [blikView, setBlikView] = useState(false);
  const [blikRadioChecked, setBlikRadioChecked] = useState(false);
  const [cardRadioChecked, setCardRadioChecked] = useState(false);

  const [blikCode, setBlikCode] = useState("");
  const [blikCodeError, setBlikCodeError] = useState("");
  const [cardDateError, setCardDateError] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const [codeDateAlertVariant, setCodeDateAlertVariant] = useState("danger");

  const location = useLocation();
  const navigate = useNavigate();

  const handleInputFocus = (e) => {
    setFocus(e);
  };

  const handleInputChange = (e) => {
    if (focus === "number") {
      setNumber(e);
    } else if (focus === "name") {
      setName(e);
    } else if (focus === "expiry") {
      setExpiry(e);
    } else if (focus === "cvc") {
      setCvc(e);
    }
  };

  const handleBlikCode = (code) => {
    setBlikCode(code);
  };

  const handleShowView = (selectedOption) => {
    setCardView(false);
    setBlikView(false);
    setBlikRadioChecked(false);
    setCardRadioChecked(false);

    if (selectedOption === "card") {
      setCardView(true);
      setCardRadioChecked(true);
    } else if (selectedOption === "blik") {
      setBlikView(true);
      setBlikRadioChecked(true);
    }
  };

  const handleDonateRealization = () => {
    payRealizationService
      .donateRealization(location.state.collection.id, location.state.money)
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handlePayClick = async () => {
    if (blikCode.length < 6) {
      setAlertVariant("danger");
      setBlikCodeError("Nieprawidłowy kod");
    } else {
      if (alertVariant !== "success") {
        setBlikCodeError("Sukces!");
        setAlertVariant("success");
        await delay(3000);
        handleDonateRealization();
        navigate("/collections");
      }
    }
  };

  const handleCardSubmitClick = async () => {
    if (
      number.length < 16 ||
      name.length === 0 ||
      expiry.length < 4 ||
      cvc.length < 3
    ) {
      setCardDateError("Nieprawidłowe dane karty.");
    } else {
      if (codeDateAlertVariant !== "success") {
        setCardDateError("Sukces!");
        setCodeDateAlertVariant("success");
        await delay(3000);
        handleDonateRealization();
        navigate("/collections");
      }
    }
  };

  return (
    <>
      <div
        style={{
          width: "90%",
          height: "100vh",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px",
          backgroundColor: "lightGray",
          boxShadow:
            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
          display: "flex",
        }}
      >
        <div
          style={{ height: "100%", width: "40%", backgroundColor: "darkgray" }}
        >
          <div
            style={{
              width: "30%",
              height: "auto",
              display: "flex",
              marginLeft: "10%",
              marginTop: "20%",
              backgroundColor: "lightgray",
              borderRadius: "10px",
            }}
          >
            <img
              style={{ width: "40px", height: "40px", borderRadius: "10px" }}
              src={
                "data:image/png;base64," + location.state.collection.user.photo
              }
            />
            <h6 style={{ marginLeft: "30px", marginTop: "9px" }}>
              {location.state.collection.user.username}
            </h6>
          </div>
          <div
            style={{ display: "flex", marginLeft: "10%", marginTop: "10px" }}
          >
            <a>Opis:</a>
            <h5 style={{ marginLeft: "10px" }}>
              {location.state.collection.description}
            </h5>
          </div>

          <div
            style={{
              display: "block",
              borderBottom: "0.5px solid black",
              marginBottom: "5px",
              marginTop: "10px",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>
          <div style={{ display: "flex", marginLeft: "10%" }}>
            <a>Kwota:</a>
            <h5 style={{ marginLeft: "10px" }}>{location.state.money}$</h5>
          </div>

          <img
            src={card}
            style={{
              width: "70%",
              height: "50%",
              marginLeft: "70px",
              marginTop: "50px",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
            }}
          ></img>
        </div>
        <div
          style={{ width: "60%", height: "100%", backgroundColor: "lightGray" }}
        >
          <h5 style={{ marginTop: "15px", marginLeft: "40px" }}>
            <BiCoin /> Płatność
          </h5>
          <div
            style={{
              display: "block",
              borderBottom: "0.5px solid #9E9E9E",
              marginBottom: "5px",
              marginTop: "10px",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                margin: "10px",
                display: "flex",
                width: "47%",
                height: "70px",
                backgroundColor: "darkgray",
                boxShadow:
                  " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
              }}
              onClick={() => handleShowView("card")}
            >
              <input
                style={{ marginLeft: "8px" }}
                type={"radio"}
                checked={cardRadioChecked}
              />
              <div style={{ display: "flex", marginTop: "10px" }}>
                <Visa style={{ margin: 5, width: "50" }} />
                <Mastercard style={{ margin: 5, width: "50" }} />
                <Amex style={{ margin: 5, width: "50" }} />
              </div>
            </div>
            <div
              style={{
                margin: "10px",
                width: "47%",
                display: "flex",
                height: "70px",
                backgroundColor: "darkgray",
                boxShadow:
                  " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
              }}
              onClick={() => handleShowView("blik")}
            >
              <input
                style={{ marginLeft: "8px" }}
                type={"radio"}
                checked={blikRadioChecked}
              />
              <div style={{ display: "flex", marginTop: "10px" }}>
                <Blik style={{ margin: 5, width: "50" }} />
              </div>
            </div>
          </div>
          <br></br>

          {cardView ? (
            <div>
              <div id="PaymentForm" style={{ margin: "10px" }}>
                <Cards
                  cvc={cvc}
                  expiry={expiry}
                  focused={focus}
                  name={name}
                  number={number}
                />
              </div>
              <div style={{ marginLeft: "32%", marginTop: "30px" }}>
                <form>
                  <input
                    style={{ width: "300px" }}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => handleInputFocus("number")}
                    type="number"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 16))
                    }
                    placeholder="Numer karty"
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  ></input>
                  <input
                    style={{ width: "300px", marginTop: "5px" }}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => handleInputFocus("name")}
                    type="tel"
                    placeholder="Imię i nazwisko"
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  ></input>
                  <input
                    style={{ width: "300px", marginTop: "5px" }}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => handleInputFocus("expiry")}
                    type="number"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 4))
                    }
                    placeholder="Czas wygaśnięcia"
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  ></input>
                  <input
                    style={{ width: "100px", marginTop: "5px" }}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => handleInputFocus("cvc")}
                    type="number"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 3))
                    }
                    placeholder="CVV"
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  ></input>
                  {cardDateError && (
                    <Alert
                      variant={codeDateAlertVariant}
                      style={{
                        width: "300px",
                        marginTop: "10px",
                      }}
                    >
                      {cardDateError}
                    </Alert>
                  )}
                </form>

                <div
                  id="submitButton"
                  style={{
                    textAlign: "center",
                    width: "300px",
                    height: "35px",
                    borderRadius: "10px",
                    backgroundColor: "red",
                    marginRight: "0%",
                    marginTop: "30px",
                    cursor: "pointer",
                    boxShadow:
                      " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                  }}
                  onClick={() => handleCardSubmitClick()}
                >
                  <a>Zrealizuj</a>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          {blikView ? (
            <div
              style={{
                width: "400px",
                height: "400px",
                backgroundColor: "white",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "15px",
                marginTop: "50px",
                boxShadow:
                  " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
              }}
            >
              <Blik
                style={{
                  width: "50px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "5px",
                }}
              ></Blik>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "35px",
                }}
              >
                <h6>Podaj kod BLIK</h6>
                <a style={{ fontSize: "12px" }}>
                  wygenerowany w swojej aplikacji bankowej
                </a>
              </div>
              <input
                style={{
                  width: "200px",
                  marginTop: "40px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onChange={(e) => handleBlikCode(e.target.value)}
                type="number"
                onInput={(e) => (e.target.value = e.target.value.slice(0, 6))}
                placeholder="6-cyfrowy kod"
                className="form-control"
                aria-describedby="basic-addon1"
              ></input>
              <br />

              {blikCodeError && (
                <Alert
                  variant={alertVariant}
                  style={{
                    width: "200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {blikCodeError}
                </Alert>
              )}

              <div
                style={{
                  width: "100px",
                  height: "35px",
                  borderRadius: "7px",
                  backgroundColor: "red",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
                onClick={() => handlePayClick()}
              >
                <a>Zapłać</a>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};
export default PayRealization;
