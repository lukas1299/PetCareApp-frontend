import React, { useEffect, useState } from "react"
import NavbarComponent from "./NavbarComponent";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import forumService from "../services/forum.service";
import {BiPlus, BiLike, BiDislike, BiCheckCircle, BiCalendar, BiTrash} from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import dog from "./dog.png";
import "./PetDetailsStyle.css";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import petService from "../services/pet.service";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import navbarService from "./navbar.service";

import p1 from './photos/1.jpg';
import p2 from './photos/2.jpg';
import p3 from './photos/3.jpg';
import p4 from './photos/4.jpg';
import p5 from './photos/5.jpg';
import p6 from './photos/6.jpg';
import p7 from './photos/7.jpg';
import p8 from './photos/8.jpg';
import p9 from './photos/9.jpg';
import p10 from './photos/10.jpg';
import p11 from './photos/11.jpg';
import p12 from './photos/12.jpg';
import p13 from './photos/13.jpg';
import p14 from './photos/14.jpg';
import p15 from './photos/15.jpg';
import p16 from './photos/16.jpg';
import p17 from './photos/17.jpg';
import p18 from './photos/18.jpg';
import p19 from './photos/19.jpg';
import p20 from './photos/20.jpg';
import p21 from './photos/21.jpg';
import p22 from './photos/22.jpg';
import p23 from './photos/23.jpg';
import p24 from './photos/24.jpg';
import p25 from './photos/25.jpg';
import p26 from './photos/26.jpg';
import p27 from './photos/27.jpg';
import p28 from './photos/28.jpg';
import p29 from './photos/29.jpg';
import p30 from './photos/30.jpg';
import p31 from './photos/31.jpg';

const PetDetails = () => {

    const { state } = useLocation();
    const { petId } = state;
    const { petImage } = state;
    const [show, setShow] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventsInDay, setEventsInDay] = useState([]);
    const [image, setImage] = useState([]);
    const [nameError, setNameError] = useState("");

    var binaryData = [];

    const [eventFormName, setEventFormName] = useState([]);
    var selectedType = 'WALKING';
    var eventName;
    var frequency = "once";
    var tempModalDate;

    // Toasts messages
    const eventNameCannotBeEmptyNotify = () => toast.error("Event name cannot be empty!");
    const eventCreatedSuccessfullyNotify = () => toast.success("Event created successfully!");
    const eventRemovedSuccessfullyNotify = () => toast.success("Event removed successfully!");
    const eventAlreadyExistsNotify = () => toast.error("Event already exists!");
    const eventCannotBeCreatedNotify = () => toast.error("Invalid date!");

    const handleFormType = (selectedEventType) => {
        selectedType = selectedEventType;
        document.getElementById("typeToggle").textContent = selectedType.toLowerCase().charAt(0).toUpperCase() + selectedType.toLowerCase().slice(1);
    }

    const handleFormName = (selectedEventName) => {
        eventName = selectedEventName;
    }

    const handleFormFrequency = (selectedEventFrequency) => {
        frequency = selectedEventFrequency;
         document.getElementById("frequencyToggle").textContent = frequency.toLowerCase().charAt(0).toUpperCase() + frequency.toLowerCase().slice(1);
    }

    const loadAvatar = () => {
      navbarService.getUserImage().then(
      (response) => {
        console.log(response.data);
        setImage(response.data);
      },
      (error) => {
        console.log(error);
      });
  }

    const [eventDate, setEventDate] = useState([]);

    const handleShow = (date) => {
        setEventDate(date);
        getEventForDay(date);
        setShow(true);

    };
    const handleClose = () => setShow(false);

    const getEventsCalendar = () => {
        petService.getEvents(petId).then((response) => {
           
            setEvents(response.data);
            document.getElementById("scrolleDiv").scrollTop = 2800;
        }, (error) => {
            console.log(error);
        })
    }

    const getEventForDay = (date) => {
        petService.getEventsForDay(petId, date).then((response) => {
            console.log(response.data);
            setEventsInDay(response.data);
        }, (error) => {
            console.log(error);
        })
    }

    const eventCreation = async (e) => {
        
        if(validateName(eventName)){
            try {
            await petService.createEvent(petId, eventName, selectedType, frequency, eventDate).then(
                () => {
                    getEventsCalendar();
                    getEventForDay(eventDate);
                    eventCreatedSuccessfullyNotify();

                    document.getElementById('nameInput').value='';

                }, (error) => {
                    console.log(error);
                    if(error.response.data === 'The event cannot be created because the date is invalid'){
                        eventCannotBeCreatedNotify();
                    } else if (error.response.data === 'Event already exists') {
                        eventAlreadyExistsNotify();
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
        }
         
    }

    function validateName(name) {
    if (name === undefined) {
      setNameError("The name cannot be empty.");
      return false;
    }
    if (name.length < 1 || name.length > 15) {
      setNameError("Inappropriate length.");
      return false;
    } else if (name.match(/[^a-zA-Z]/)) {
      setNameError("The name can only contain letter.");
      return false;
    }
    setNameError(null);
    return true;
    }

    const deleteEvent = async (name) => {

        try {
            await petService.deleteEvent(name, petId).then(
                () => {
                    getEventsCalendar();
                    getEventForDay(eventDate);
                    eventRemovedSuccessfullyNotify();
                }, (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }

    }

  
    useEffect(() => {
        loadAvatar();
        getEventsCalendar(petId);
    }, []);

    binaryData.push(image);

    return(

        <div style={{backgroundColor: "#3A3B3C", width: '100%',minHeight:"950px", overflow:"hidden"}} className="Auth-form-container">

        <NavbarComponent image={binaryData} />

        <div style={{width: '100%', height: '100%', float: 'left', marginTop:"70px"}}>
  
            <div style={{width:"30%", height:"800px", backgroundColor:"#8adbd3", margin:"5px", float:"left", borderRadius:"15px"}}>
                <img src={URL.createObjectURL(
            new Blob(petImage, { type: "image/jpeg" })
          )} style={{width:"70%", marginLeft:"15%", marginTop:"7px", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)"}}></img>
            <div style={{width:"70%", height:"400px", marginLeft:"15%", marginTop:"10px", backgroundColor:"white", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)"}}></div>
            </div>
            <div id="scrolleDiv" style={{overflow:"scroll", gridRow: "auto", width:"68%", height:"800px", backgroundColor:"#8adbd3", margin:"5px", float:"left", borderRadius:"15px"}}>

            {events.map((event) => {
                if(event.eventList.length === 0){
                    return (
                        <Card  onClick={() => handleShow(event.date)} style={{ width: '14%', float:"left", position:"revert", cursor:"pointer", margin:"0.14%", height:"250px"}}>
                           {event.date.slice(8,10) === "01" && 
                                <Card.Img variant="top" src={p1} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "02" && 
                                <Card.Img variant="top" src={p2} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "03" && 
                                <Card.Img variant="top" src={p3} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "04" && 
                                <Card.Img variant="top" src={p4} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "05" && 
                                <Card.Img variant="top" src={p5} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "06" && 
                                <Card.Img variant="top" src={p6} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "07" && 
                                <Card.Img variant="top" src={p7} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "08" && 
                                <Card.Img variant="top" src={p8} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "09" && 
                                <Card.Img variant="top" src={p9} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "10" && 
                                <Card.Img variant="top" src={p10} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "11" && 
                                <Card.Img variant="top" src={p11} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "12" && 
                                <Card.Img variant="top" src={p12} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "13" && 
                                <Card.Img variant="top" src={p13} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "14" && 
                                <Card.Img variant="top" src={p14} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "15" && 
                                <Card.Img variant="top" src={p15} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "16" && 
                                <Card.Img variant="top" src={p16} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "17" && 
                                <Card.Img variant="top" src={p17} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "18" && 
                                <Card.Img variant="top" src={p18} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "19" && 
                                <Card.Img variant="top" src={p19} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "20" && 
                                <Card.Img variant="top" src={p20} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "21" && 
                                <Card.Img variant="top" src={p21} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "22" && 
                                <Card.Img variant="top" src={p22} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "23" && 
                                <Card.Img variant="top" src={p23} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "24" && 
                                <Card.Img variant="top" src={p24} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "25" && 
                                <Card.Img variant="top" src={p25} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "26" && 
                                <Card.Img variant="top" src={p26} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "27" && 
                                <Card.Img variant="top" src={p27} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "28" && 
                                <Card.Img variant="top" src={p28} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "29" && 
                                <Card.Img variant="top" src={p29} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "30" && 
                                <Card.Img variant="top" src={p30} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "31" && 
                                <Card.Img variant="top" src={p31} style={{height:"50%"}} />
                            }
                            
                                <Card.Body>  

                                    <Card.Text style={{color:"red", fontSize:"15px"}}>-</Card.Text>
                                    <Card.Text style={{color:"green", fontSize:"15px"}}>-</Card.Text>
                                    <Card.Text style={{color:"green", fontSize:"15px"}}>-</Card.Text>
                                  
                                </Card.Body>
                        </Card>
                    )
                } else {
                  
                    return (

                        <div>
                            <Card onClick={() => handleShow(event.date)} style={{ width: '14%', float:"left", position:"revert", cursor:"pointer", margin:"0.14%", height:"250px"}}>
                            
                            {event.date.slice(8,10) === "01" && 
                                <Card.Img variant="top" src={p1} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "02" && 
                                <Card.Img variant="top" src={p2} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "03" && 
                                <Card.Img variant="top" src={p3} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "04" && 
                                <Card.Img variant="top" src={p4} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "05" && 
                                <Card.Img variant="top" src={p5} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "06" && 
                                <Card.Img variant="top" src={p6} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "07" && 
                                <Card.Img variant="top" src={p7} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "08" && 
                                <Card.Img variant="top" src={p8} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "09" && 
                                <Card.Img variant="top" src={p9} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "10" && 
                                <Card.Img variant="top" src={p10} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "11" && 
                                <Card.Img variant="top" src={p11} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "12" && 
                                <Card.Img variant="top" src={p12} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "13" && 
                                <Card.Img variant="top" src={p13} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "14" && 
                                <Card.Img variant="top" src={p14} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "15" && 
                                <Card.Img variant="top" src={p15} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "16" && 
                                <Card.Img variant="top" src={p16} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "17" && 
                                <Card.Img variant="top" src={p17} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "18" && 
                                <Card.Img variant="top" src={p18} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "19" && 
                                <Card.Img variant="top" src={p19} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "20" && 
                                <Card.Img variant="top" src={p20} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "21" && 
                                <Card.Img variant="top" src={p21} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "22" && 
                                <Card.Img variant="top" src={p22} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "23" && 
                                <Card.Img variant="top" src={p23} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "24" && 
                                <Card.Img variant="top" src={p24} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "25" && 
                                <Card.Img variant="top" src={p25} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "26" && 
                                <Card.Img variant="top" src={p26} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "27" && 
                                <Card.Img variant="top" src={p27} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "28" && 
                                <Card.Img variant="top" src={p28} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "29" && 
                                <Card.Img variant="top" src={p29} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "30" && 
                                <Card.Img variant="top" src={p30} style={{height:"50%"}} />
                            }
                            {event.date.slice(8,10) === "31" && 
                                <Card.Img variant="top" src={p31} style={{height:"50%"}} />
                            }
                                <Card.Body>  

                                    {event.eventList.slice(0, 3).map((eve) => {
                                        
                                        if(eve.eventType === "FEEDING"){
                                            return(
                                                <Card.Text style={{color:"orange", fontSize:"15px"}}><BiCheckCircle /> {eve.name.slice(0, 10)}</Card.Text>
                                            ) 
                                        } else if(eve.eventType === "COMBING") {
                                            return(
                                                <Card.Text style={{color:"brown", fontSize:"15px"}}><BiCheckCircle />  {eve.name.slice(0, 10)}</Card.Text>
                                            )
                                        } else if(eve.eventType === "VACCINATION") {
                                            return(
                                                <Card.Text style={{color:"red", fontSize:"15px"}}><BiCheckCircle />  {eve.name.slice(0, 10)}</Card.Text>
                                            )
                                        } else if(eve.eventType === "WALKING") {
                                            return(
                                                <Card.Text style={{color:"green", fontSize:"15px"}}><BiCheckCircle />  {eve.name.slice(0, 10)}</Card.Text>
                                            )
                                        }
                                    })}

                                </Card.Body>
                            </Card>
                        </div>
                )}}
            )}
                       
            </div>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><BiCalendar /></Modal.Title>
                    
                </Modal.Header>
                <Modal.Body >

                <div style={{textAlign:"center"}}>
                    <h4>{new String(eventDate).slice(0, 10)}</h4>
                </div>
                <div className="scrollable-div" style={{height:"200px", width:"98%", marginLeft: "-1%" }}>

                    <Table>
                        <tbody>
                         
                {eventsInDay.map((dayEvent) => {
                    if(dayEvent.eventType === "FEEDING"){
                        return (
                            <tr style={{borderColor:"transparent"}}>
                            <td><BiCheckCircle style={{ color: "orange" }} /> {dayEvent.name}</td>
                             <td style={{float:"right"}}><Button variant="danger" onClick={() => deleteEvent(dayEvent.name)}><BiTrash /></Button></td>
                            </tr>
                        )
                    } else if(dayEvent.eventType === "COMBING") {
                        return (
                            <tr style={{borderColor:"transparent"}}>
                            <td><BiCheckCircle style={{color:"brown"}} /> {dayEvent.name}</td>
                            <td style={{float:"right"}}><Button variant="danger" onClick={() => deleteEvent(dayEvent.name)}><BiTrash /></Button></td>
                            </tr>
                        )
                    } else if(dayEvent.eventType === "VACCINATION") {
                        return (
                            <tr style={{borderColor:"transparent"}}>
                            <td><BiCheckCircle style={{color:"red"}} /> {dayEvent.name}</td>
                            <td style={{float:"right"}}><Button variant="danger" onClick={() => deleteEvent(dayEvent.name)}><BiTrash /></Button></td>
                            </tr>                        )
                    } else if(dayEvent.eventType === "WALKING") {
                        return (
                            <tr style={{borderColor:"transparent"}}>
                            <td><BiCheckCircle style={{color:"green"}} /> {dayEvent.name}</td>
                            <td style={{float:"right"}}><Button variant="danger" onClick={() => deleteEvent(dayEvent.name)}><BiTrash /></Button></td>
                            </tr> 
                        )
                    }
                    
                })} 
                       
                        </tbody>
                    </Table>
                </div>
                <div>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Control id="nameInput" type="email" placeholder="Event name" onChange={(e) => handleFormName(e.target.value)} />
                    </Form.Group>
                    {nameError && (
                        <p style={{ color: "red", fontSize: "14px", margin: "1px" }}>
                            {nameError}
                         </p>
                    )}

                    <Form.Group className="mb-3">
   
                            <Dropdown onSelect={handleFormType} >
                            <Dropdown.Toggle id="typeToggle" variant="light" style={{ width:"100%"}}>
                                {selectedType.toLowerCase().charAt(0).toUpperCase() + selectedType.toLowerCase().slice(1)}
                            </Dropdown.Toggle>
                                <Dropdown.Menu style={{ width:"100%"}}>
                                    <Dropdown.Item eventKey="VACCINATION">Vaccination</Dropdown.Item>
                                    <Dropdown.Item eventKey="FEEDING">Feeding</Dropdown.Item>
                                    <Dropdown.Item eventKey="COMBING">Combing</Dropdown.Item>
                                    <Dropdown.Item eventKey="WALKING">Walking</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        <Form.Text className="text-muted" onChange={() => setEventFormName()}>
                                 Select an event type.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                 
                        <Dropdown onSelect={handleFormFrequency} >
                            <Dropdown.Toggle id="frequencyToggle" variant="light" style={{ width:"100%"}}>
                                {frequency.toLowerCase().charAt(0).toUpperCase() + frequency.toLowerCase().slice(1)}
                            </Dropdown.Toggle>
                                <Dropdown.Menu style={{ width:"100%"}}>
                                    <Dropdown.Item eventKey="once">Once</Dropdown.Item>
                                    <Dropdown.Item eventKey="everyday">Everyday</Dropdown.Item>
                                    <Dropdown.Item eventKey="everyweek">Every Week</Dropdown.Item>
                                    <Dropdown.Item eventKey="everymonth">Every Month</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        <Form.Text className="text-muted">
                                 Select a frequency.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="success" onClick={() => eventCreation()} style={{float:"right"}}>
                        Create
                    </Button>
                </Form>
                </div>

                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>

        </div>
        
            <div style={{width:"100%", marginTop:"50px", height:"100px", backgroundColor:"#212529", float:"left", bottom:"0"}}>
                <hr style={{color: 'white', backgroundColor: 'white', height: .5, borderColor : 'white', width:"90%", marginLeft:"auto", marginRight:"auto"}}/>
                <p style={{color:"white", textAlign:"center"}}>&copy; Copyright Pets 2022, Inc. All rights reserved.</p>
            </div>

            <ToastContainer />
        </div>
    );
}

export default PetDetails;