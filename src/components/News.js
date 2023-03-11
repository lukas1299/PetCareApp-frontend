import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { BiQuestionMark } from "react-icons/bi";
import navbarService from "./navbar.service";
import newsService from "../services/news.service";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import dogn1 from "./photos/gallery_photo/dogn1.png";
import dogn2 from "./photos/gallery_photo/dogn2.png";
import dogn3 from "./photos/gallery_photo/dogn3.png";
import dogn4 from "./photos/gallery_photo/dogn4.png";
import { width } from "@mui/system";

import balto from "./photos/gallery_photo/balto.png";
import proteo from "./photos/gallery_photo/proteo.png";
import stubby from "./photos/gallery_photo/stubby.png";

import balto2 from "./photos/gallery_photo/balto2.png";
import hachiko from "./photos/gallery_photo/hachiko.png";
import conan from "./photos/gallery_photo/conan.png";
import endal from "./photos/gallery_photo/endal.png";
import endal2 from "./photos/gallery_photo/endal2.png";

const News = () => {
  const [image, setImage] = useState([]);

  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  var binaryData = [];

  const loadAvatar = () => {
    navbarService.getUserImage().then(
      (response) => {
        console.log(response.data);
        setImage(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAllNews = async () => {
    await newsService.getAllNews().then(
      (response) => {
        console.log(response.data);
        setNews(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadAvatar();
    getAllNews();
  }, []);

  binaryData.push(image);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "auto",
        overflow: "hidden",
      }}
      className="Auth-form-container"
    >
      <NavbarComponent image={binaryData} />
      <div>
        <div
          style={{
            width: "100%",
            height: "100%",
            float: "left",
            marginTop: "100px",
            position: "initial",
          }}
        >
          <br />
          <a style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}>
            Warto wiedzieć
          </a>
          <br></br>
          <br></br>
          <div style={{ width: "100%", backgroundColor: "#125137" }}>
            <br></br>
            <div
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={7}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Dlaczego psy liżą ludzi i inne psy?
                        </h4>
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Psy towarzyszą nam od tysięcy lat i są jednymi z
                          najbardziej oddanych i lojalnych zwierząt, jakie można
                          znaleźć. Jednym z ich zachowań, które często
                          zastanawia właścicieli, jest lizanie. Psy lizną ludzi,
                          inne psy, a nawet innych zwierząt. Dlaczego tak robią?
                        </a>
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Lizanie jest naturalnym zachowaniem psów i może mieć
                          różne przyczyny. Jednym z powodów, dla których psy
                          liżą nas, jest to, że po prostu nas lubią. Lizanie
                          jest sposobem na okazywanie uczuć i miłości, podobnie
                          jak przytulanie czy mruczenie u kotów. Psy także liżą
                          nas, aby wyrazić wdzięczność, szczególnie jeśli
                          właśnie daliśmy im jedzenie lub przysmak. Innym
                          powodem, dla którego psy liżą nas, jest to, że chcą
                          poznać naszą skórę i zapach. Psy mają bardzo
                          wyostrzony węch i lizanie może pomóc im
                          zidentyfikować, kim jesteśmy i gdzie byliśmy.
                        </a>
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          {" "}
                          Podobnie psy liżą inne psy, aby okazać im miłość i
                          szacunek, ale także w celu komunikacji. Psy komunikują
                          się przede wszystkim za pomocą ciała, a lizanie może
                          być sposobem na nawiązanie kontaktu z innymi psami.
                          Psy liżą również inne psy w celu uspokojenia ich i
                          wyrażenia swojego podporządkowania. Lizanie może pomóc
                          zmniejszyć napięcie między psami i zwiększyć zaufanie
                          między nimi.
                        </a>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Jak szkolić psa?
                        </h4>
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Szkolenie psa jest kluczowe, aby zapewnić mu zdrowe i
                          szczęśliwe życie w naszym towarzystwie. Właściwe
                          szkolenie może pomóc naszemu psu nauczyć się dobrych
                          manier i zachowań, które ułatwią mu życie w domu i
                          poza nim. Oto kilka podstawowych wskazówek dotyczących
                          szkolenia psa.
                        </a>
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Pierwszym krokiem do skutecznego szkolenia psa jest
                          ustanowienie jasnych i konkretnych reguł. Określ,
                          jakie zachowania są dozwolone, a jakie nie, i
                          konsekwentnie trzymaj się tych zasad. Kolejnym ważnym
                          aspektem szkolenia psa jest pozytywne wzmocnienie.
                          Nagradzaj swojego psa za dobre zachowanie, na przykład
                          smakołykiem lub pochwałą. Unikaj karania psa za złe
                          zachowanie, ponieważ może to prowadzić do stresu i
                          niepożądanych zachowań.
                        </a>
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Innym ważnym elementem szkolenia psa jest cierpliwość
                          i wytrwałość. Szkolenie psa wymaga czasu i pracy, a
                          wyniki nie zawsze będą natychmiastowe. Bądź
                          konsekwentny w swoim podejściu i pamiętaj, że każdy
                          pies jest inny, więc szkolenie może wymagać
                          dostosowania do jego indywidualnych potrzeb.
                        </a>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Czy psy rozumieją ludzką mowę?
                        </h4>
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Jednym z najczęstszych pytań, które zadają właściciele
                          psów, jest to, czy ich czworonożny przyjaciel rozumie,
                          co mówią. Odpowiedź na to pytanie nie jest prosta,
                          ponieważ zależy od wielu czynników.
                        </a>
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Badania wykazały, że psy są w stanie rozumieć około
                          165 słów i poleceń, a także intonację i emocje, z
                          którymi są wypowiadane. Ponadto, psy są w stanie
                          nauczyć się skomplikowanych poleceń, takich jak
                          otwieranie drzwi czy przyniesienie gazety. Jednak
                          zrozumienie ludzkiej mowy zależy również od
                          indywidualnego psa oraz jego poziomu szkolenia i
                          interakcji z człowiekiem.
                        </a>
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Innym ważnym aspektem jest to, że psy często polegają
                          na gestach i sygnałach niewerbalnych, aby zrozumieć,
                          co właściciel chce od nich. Na przykład, pokazywanie
                          palcem na drzwi może oznaczać, że właściciel chce
                          wyjść z psem na spacer. Dlatego też, aby zapewnić
                          skuteczne porozumienie między psem a właścicielem,
                          ważne jest, aby stosować zarówno werbalne, jak i
                          niewerbalne sygnały.
                        </a>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Jakie są najbardziej popularne rasy psów na świecie?
                        </h4>
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Pies jest jednym z najbardziej popularnych zwierząt
                          domowych na świecie, a wybór rasy psa zależy od
                          preferencji i stylu życia właściciela. Jednakże, pewne
                          rasy są bardziej popularne niż inne i to właśnie o
                          nich będziemy mówić w tym artykule.
                        </a>
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Najpopularniejszą rasą psa na świecie jest Labrador
                          Retriever. Ten przyjacielski i inteligentny pies jest
                          idealnym towarzyszem dla rodzin z dziećmi, a także dla
                          osób samotnych. Na drugim miejscu znajduje się Pudel,
                          który jest nie tylko uroczym, ale i bardzo
                          inteligentnym psem, który łatwo się uczy i jest
                          świetnym partnerem w zabawie. Na trzecim miejscu
                          znajduje się Chihuahua, mały, ale dzielny pies, który
                          jest często wybierany przez osoby, które mieszkają w
                          małych mieszkaniach lub lubią mieć towarzystwo
                          zwierzaka w podróży. Inne popularne rasy to: Golden
                          Retriever, Owczarek Niemiecki, Bulldog Francuski,
                          Beagle, Husky Syberyjski i wiele innych.
                        </a>
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Podsumowując, wybór rasy psa zależy od stylu życia i
                          preferencji właściciela. Labrador Retriever, Pudel i
                          Chihuahua są jednak trzema najpopularniejszymi rasami
                          na świecie. Każda rasa ma swoje unikalne cechy i
                          zalety, które przyciągają do siebie różnych ludzi,
                          dlatego wybór psa powinien być dobrze przemyślany i
                          dostosowany do indywidualnych potrzeb.
                        </a>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                  <Col sm={5}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <div style={{ display: "flex" }}>
                            <img
                              src={dogn1}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Dlaczego psy lizią ludzi i inne psy?
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <div style={{ display: "flex" }}>
                            <img
                              src={dogn2}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Jak szkolić psa?
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          <div style={{ display: "flex" }}>
                            <img
                              src={dogn3}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Czy psy rozumieją ludzką mowę?
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">
                          <div style={{ display: "flex" }}>
                            <img
                              src={dogn4}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Jakie są najbardziej popularne rasy psów na
                                świecie?
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
              </Tab.Container>
              <br></br>
            </div>
          </div>
          <br></br>
          <a style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}>
            Psi bohaterowie
          </a>
          <br></br>
          <br></br>
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "#e1e5eb",
              textAlign: "center",
              display: "flex",
            }}
          >
            <div style={{ width: "33.3%" }}>
              <br></br>
              <img
                src={stubby}
                style={{
                  width: "50%",
                  borderRadius: "15px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
              ></img>
              <br></br>
              <br></br>
              <h4>
                <strong>Stubby</strong>
              </h4>
              <div>
                <a style={{ fontWeight: "bold" }}>
                  Pies rasy Pit Bull, który służył w armii amerykańskiej podczas
                  I wojny światowej i pomógł w odnalezieniu wielu rannych
                  żołnierzy.
                </a>
              </div>
            </div>
            <div style={{ width: "33.3%" }}>
              <br></br>
              <img
                src={balto}
                style={{
                  width: "50%",
                  borderRadius: "15px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
              ></img>
              <br></br>
              <br></br>
              <h4>
                <strong>Balto</strong>
              </h4>
              <div>
                <a style={{ fontWeight: "bold" }}>
                  Husky syberyjski, który przewiózł serum z wykrytym wirusem
                  dyfterii przez 674 mile w ekstremalnie trudnych warunkach,
                  ratując tysiące dzieci w Alasce.
                </a>
              </div>
            </div>
            <div style={{ width: "33.3%" }}>
              <br></br>
              <img
                src={proteo}
                style={{
                  width: "50%",
                  borderRadius: "15px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                }}
              ></img>
              <br></br>
              <br></br>
              <h4>
                <strong>Proteo</strong>
              </h4>
              <div>
                <a style={{ fontWeight: "bold" }}>
                  Psi ratownik ocalił wiele osób podczas trzesienia ziemi w
                  Turcji.
                </a>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>

          <a style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}>
            Niezwykłe historie
          </a>
          <br></br>
          <br></br>
          <div style={{ width: "100%", backgroundColor: "#125137" }}>
            <br></br>
            <div
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={5}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <div style={{ display: "flex" }}>
                            <img
                              src={balto}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Balto - pies, który przyniósł ratunek
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <div style={{ display: "flex" }}>
                            <img
                              src={hachiko}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Hachiko - historia niezłomnej wierności
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          <div style={{ display: "flex" }}>
                            <img
                              src={conan}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Conan - pies-bohater ze służby wojskowej
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">
                          <div style={{ display: "flex" }}>
                            <img
                              src={endal}
                              style={{ width: "60%", borderRadius: "15px" }}
                            ></img>
                            <div style={{ margin: "2px", marginLeft: "12px" }}>
                              <a
                                style={{
                                  fontSize: "20px",
                                  color: "#7ECE68",
                                  fontWeight: "bold",
                                }}
                              >
                                Endal - najbardziej szkolony pies przewodnik w
                                Wielkiej Brytanii
                              </a>
                            </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={7}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Balto - pies, który przyniósł ratunek
                        </h4>
                        <br />
                        <img
                          src={balto2}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        />
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          W 1925 roku w mieście Nome na Alasce wybuchła epidemia
                          dyfterii, a jedynym sposobem na uratowanie mieszkańców
                          miasta było dostarczenie leków z Anchorage, oddalonego
                          o 1,600 kilometrów. Z powodu złych warunków
                          atmosferycznych, lotnictwo nie mogło pomóc, więc
                          dostarczenie leków z Anchorage do Nome polecono psim
                          zaprzęgom. Balto, samojed, prowadził ostatni etap tej
                          trasy i przewiózł leki do Nome, ratując wiele istnień
                          ludzkich.
                        </a>
                        <br />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Hachiko - historia niezłomnej wierności
                        </h4>
                        <br />
                        <img
                          src={hachiko}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        />
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Hachiko był akita inu, który mieszkał w Tokio w latach
                          20. XX wieku i był wiernym towarzyszem swojego
                          właściciela, profesora Uniwersytetu w Tokio. Po
                          śmierci profesora, Hachiko kontynuował codzienną
                          rutynę czekania na stacji kolejowej na powrót swojego
                          właściciela, który nigdy już nie powrócił. Hachiko
                          przez kolejne dziewięć lat codziennie odwiedzał
                          stację, czekając na powrót właściciela. Jego historia
                          stała się symbolem niezłomnej wierności.
                        </a>
                        <br />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Conan - pies-bohater ze służby wojskowej
                        </h4>
                        <br />
                        <img
                          src={conan}
                          style={{
                            width: "500px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        />
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Conan to pies, który został wysłany na misję do Syrii,
                          aby pomóc siłom specjalnym w przeprowadzeniu ataku na
                          terrorystów. Conan przeszkodził terrorystom w wyjściu
                          z tunelu, w którym się ukrywali, po czym został ranny
                          od wybuchu bomby. Mimo że jego ciało zostało
                          uszkodzone, Conan przetrwał i został uznany za
                          bohatera narodowego.
                        </a>
                        <br />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <br></br>
                        <h4 style={{ color: "#7ECE68", fontWeight: "bold" }}>
                          Endal - najbardziej szkolony pies przewodnik w
                          Wielkiej Brytanii
                        </h4>
                        <br />
                        <img
                          src={endal2}
                          style={{
                            width: "300px",
                            borderRadius: "15px",
                            boxShadow:
                              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
                          }}
                        />
                        <br />
                        <br />
                        <a
                          style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            color: "#7ECE68",
                            textJustify: "inter-word",
                          }}
                        >
                          Endal był szkolonym psem przewodnikiem, który
                          asystował swojemu właścicielowi, byłemu sierżantowi
                          brytyjskiej armii Allenowi Partonowi, który został
                          poważnie ranny w wypadku. Endal pomagał Allenowi w
                          codziennych czynnościach, takich jak ubieranie się,
                          robienie zakupów, czytanie książek, ale także w
                          nagłych wypadkach, takich jak omdlenia i ataki
                          padaczki. Endal został uznany za najbardziej
                          szkolonego psa przewodnika w Wielkiej Brytanii i
                          zdobył wiele nagród.
                        </a>
                        <br />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
              <br></br>
            </div>
          </div>
          <br></br>
          <div
            style={{
              width: "90%",
              height: "100%",
              minHeight: "3000px",
              overflow: "auto",
              marginTop: "1%",
              margin: "auto",
              position: "initial",
              backgroundColor: "#e1e5eb",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)",
            }}
          >
            <br />

            <a
              style={{ fontWeight: "bold", fontSize: "70px", marginLeft: "5%" }}
            >
              Nowości
            </a>

            {news.map((n, index) => {
              return (
                <div key={index}>
                  <Card
                    style={{
                      width: "700px",
                      marginLeft: "7%",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                    onClick={() => {
                      navigate("/newsDetail", {
                        state: {
                          newsDate: n.news.date,
                          newsPhoto: n.news.photo,
                          newsTitle: n.news.title,
                          paragraphs: n.paragraphList,
                        },
                      });
                    }}
                  >
                    <Card.Body style={{ display: "flex" }}>
                      <div>
                        <Card.Img
                          variant="top"
                          style={{ width: "200px" }}
                          src={"data:image/png;base64," + n.news.photo}
                        />
                      </div>
                      <div style={{ margin: "10px", marginLeft: "40px" }}>
                        <Card.Text>{n.news.date.slice(0, 10)}</Card.Text>
                        <Card.Title>
                          <a
                            style={{
                              fontSize: "20px",
                              color: "#125137",
                              fontWeight: "bold",
                            }}
                          >
                            {n.news.title}
                          </a>
                        </Card.Title>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: "#212529",
          float: "left",
          bottom: "0",
        }}
      >
        <hr
          style={{
            color: "white",
            backgroundColor: "white",
            height: 0.5,
            borderColor: "white",
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <p style={{ color: "white", textAlign: "center", fontSize: "12px" }}>
          &copy; Copyright Pets 2022, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default News;
