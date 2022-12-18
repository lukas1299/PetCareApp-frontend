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

const PetDetails = () => {

    const { state } = useLocation();
    const { petId } = state;
    const [show, setShow] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventsInDay, setEventsInDay] = useState([]);

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
        
        if(eventName === undefined || eventName === ''){
            eventNameCannotBeEmptyNotify();
        } else {

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
        getEventsCalendar(petId);

        

    }, []);

    return(

        <div style={{backgroundColor: "#3A3B3C", width: '100%',minHeight:"950px", overflow:"hidden"}} className="Auth-form-container">

        <NavbarComponent />

        <div style={{width: '100%', height: '100%', float: 'left', marginTop:"70px"}}>
  
            <div style={{width:"30%", height:"800px", backgroundColor:"#8adbd3", margin:"5px", float:"left", borderRadius:"15px"}}>
                <img src={dog} style={{width:"50%", marginLeft:"25%", marginTop:"7px", borderRadius:"15px", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)"}}></img>
            </div>
            <div id="scrolleDiv" style={{overflow:"scroll", gridRow: "auto", width:"68%", height:"800px", backgroundColor:"#8adbd3", margin:"5px", float:"left", borderRadius:"15px"}}>

            {events.map((event) => {
                if(event.eventList.length === 0){
                    return (
                        <Card  onClick={() => handleShow(event.date)} style={{ width: '14%', float:"left", position:"revert", cursor:"pointer", margin:"0.14%", height:"250px"}}>
                            <Card.Img variant="top" src={dog} />
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
                            <Card.Img variant="top" src={dog} />
                                <Card.Body>  

                                    {event.eventList.slice(0, 3).map((eve) => {
                                        
                                        if(eve.eventType === "FEEDING"){
                                            return(
                                                <Card.Text style={{color:"orange", fontSize:"15px"}}><BiCheckCircle /> {new String(eve.name).slice(0, 10)}</Card.Text>
                                            ) 
                                        } else if(eve.eventType === "COMBING") {
                                            return(
                                                <Card.Text style={{color:"brown", fontSize:"15px"}}><BiCheckCircle />  {new String(eve.name).slice(0, 10)}</Card.Text>
                                            )
                                        } else if(eve.eventType === "VACCINATION") {
                                            return(
                                                <Card.Text style={{color:"red", fontSize:"15px"}}><BiCheckCircle />  {new String(eve.name).slice(0, 10)}</Card.Text>
                                            )
                                        } else if(eve.eventType === "WALKING") {
                                            return(
                                                <Card.Text style={{color:"green", fontSize:"15px"}}><BiCheckCircle />  {new String(eve.name).slice(0, 10)}</Card.Text>
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
                <div className="scrollable-div" style={{height:"200px", width:"420px", borderRadius:"15px" }}>

                    <Table>
                        <tbody>
                         
                {eventsInDay.map((dayEvent) => {
                    if(dayEvent.eventType === "FEEDING"){
                        return (
                            <tr>
                            <td><BiCheckCircle style={{ color: "orange" }} /> {dayEvent.name}</td>
                            <td><Button variant="danger" onClick={() => deleteEvent(dayEvent.name)}><BiTrash /></Button></td>
                            </tr>
                        )
                    } else if(dayEvent.eventType === "COMBING") {
                        return (
                            <tr>
                            <td><BiCheckCircle style={{color:"brown"}} /> {dayEvent.name}</td>
                            <td><Button variant="danger" onClick={() => deleteEvent(dayEvent.name)}><BiTrash /></Button></td>
                            </tr>
                        )
                    } else if(dayEvent.eventType === "VACCINATION") {
                        return (
                            <tr>
                            <td><BiCheckCircle style={{color:"red"}} /> {dayEvent.name}</td>
                            <td><Button variant="danger" onClick={() => deleteEvent(dayEvent.name)}><BiTrash /></Button></td>
                            </tr>                        )
                    } else if(dayEvent.eventType === "WALKING") {
                        return (
                            <tr>
                            <td><BiCheckCircle style={{color:"green"}} /> {dayEvent.name}</td>
                            <td><Button variant="danger" onClick={() => deleteEvent(dayEvent.name)}><BiTrash /></Button></td>
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
                        <Form.Text className="text-muted">
                                 Write a simple description of the event.
                        </Form.Text>
                    </Form.Group>

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