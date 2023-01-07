import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react"
import NavbarComponent from "./NavbarComponent";
import forumService from "../services/forum.service";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from "react-router-dom";
import {BiPlus, BiLike, BiDislike, BiSearchAlt, BiMessageRounded, BiCalendarEdit} from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import navbarService from "./navbar.service";
import Avatar from './image.png';

const Forum = () => {

    const [show, setShow] = useState(false);
    const [topics, setTopics] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    var binaryData = [];

    const navigate = useNavigate();
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    var topicCategory = 'GENERAL';

    const handleTopicCategory = (selectedCategory) => {
        topicCategory = selectedCategory;
        document.getElementById("topicCategoryToggle").textContent =
      selectedCategory.toLowerCase().charAt(0).toUpperCase() +
      selectedCategory.toLowerCase().slice(1);
    }

    const getAllTopics = () => {
            forumService.getAllTopics().then((response) => {
                setTopics(response.data);
                console.log(response.data);
            }, (error) => {
                console.log(error);
            }
        );
    }

    const handleTopicCreation = async (e) => {
       if(validateTitle(title) && validateDescription(description)){
        try {
            await forumService.createTopic(title, description, topicCategory).then(
                () => {
                    handleClose();
                    getAllTopics();
                    
                }, (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
       }
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

    const showTopicDetails = (topicId) => {
        localStorage.setItem("topicId", topicId);

        navigate("/forumDetails");
    }

    function validateTitle(title) {
    if (title.length === 0) {
      setTitleError("The title cannot be empty.");
      return false;
    }
    if (title.length < 1 || title.length > 30) {
      setTitleError("Inappropriate length.");
      return false;
    } 
    setTitleError(null);
    return true;
    }

    function validateDescription(description) {
    if (description.length === 0) {
      setDescriptionError("The description cannot be empty.");
      return false;
    }
    if (title.length < 1 || title.length > 512) {
      setDescriptionError("Inappropriate length.");
      return false;
    } 
    setDescriptionError(null);
    return true;
    }

  

    useEffect(() => {
        loadAvatar();
        getAllTopics();
    }, []);

    binaryData.push(image);

    return(

        <div style={{backgroundColor: "white", width: '100%', height: 'auto', overflow:"hidden"}} className="Auth-form-container">
            <NavbarComponent image={binaryData} />
            
            {/* <div style={{backgroundColor:"#787271", display: "flex", alignItems: "center", marginTop:"80px", marginBottom:"20px", width:"600px", height:"80px", marginLeft:"auto", marginRight:"auto", borderRadius:"15px"}}>
                <BiSearchAlt style={{marginLeft:"5%", fontSize:"25px"}}/>
                <Form.Control type="text" placeholder="Search" style={{width:"67%", marginLeft:"2%"}}/>
                <div onClick={handleShow} style={{backgroundColor: '#242526', color: '#5EDA66', fontSize:"30px", width: '50px', height: '50px', marginLeft:"10%", borderRadius:"25px", textAlign:"center", cursor:"pointer"}}>
                    <BiPlus />
                </div>
            </div> */}

            <div
            style={{
              backgroundColor: "#e1e5eb",
              marginTop:"80px",
              marginBottom:"30px",
              width: "80%",
              height: "100px",
              marginLeft: "auto",
              marginRight: "auto",
              
              boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)"
            }}
          >
            <div style={{ marginLeft: "20px" }}>
              <BiSearchAlt
                style={{
                  float: "left",
                  width: "30px",
                  height: "30px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "35px",
                }}
              />

              <Form.Control
                type="text"
                placeholder="Search..."
                style={{
                  float: "left",
                  width: "70%",
                  marginTop: "30px",
                  marginLeft: "2%",
                }}
              />
              <Button
                variant="success"
                style={{
                  float: "right",
                  marginRight: "30px",
                  marginTop: "30px",
                }}
                onClick={handleShow}
              >
                <BiPlus /> Add topic
              </Button>
            </div>
          </div>
            
            <div style={{width: '80%', height: '100%', marginTop:"1%", margin:"auto", position:"initial", backgroundColor:"#e1e5eb" , boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.30)"}}>
                <br></br>

                {topics.map((topic, index) => {
                    return (
                        <div key={index} onClick={() => showTopicDetails(topic.topic.id)} style={{cursor:"pointer", backgroundColor: "#242526", color: 'white',  border: '1px solid #242526', padding: '20px', marginLeft: 'auto', marginRight: 'auto', marginTop: '7px', width: '95%', height: 'auto'}}>
                           <div style={{display:"flex", alignItems:"center"}}>
                                <img  src={"data:image/png;base64," + topic.image} style={{width:"5%", height:"5%", borderRadius:"15px", marginLeft:"4%"}}></img>
                                <a style={{marginLeft:"2%"}}>{topic.userName}</a>
                                <a style={{fontSize:"12px", marginLeft:"67%"}}>{topic.topic.creationDate}</a>
                           </div>
                           <div style={{textAlign:"center"}}>
                                <div style={{display:"block", borderBottom:"0.5px solid #9E9E9E", marginBottom:"5px", marginTop:"5px"}}></div>
                                <h5 style={{margin:"10px"}}>{topic.topic.title}</h5>
                                <p>{topic.topic.description}</p>
                           </div>
                           <div style={{display:"flex", alignItems:"center"}}>
                                <a>{topic.topic.posts.length}</a>
                                <BiMessageRounded style={{width:"20px", height:"20px", margin:"2px"}}/>
                           </div>
                        </div>
                    )
                })}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <BiCalendarEdit />
                    </Modal.Title>
                    
                    
                </Modal.Header>
                <Modal.Body>
                <div className="input-group mb-3">
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" placeholder="Title" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                {titleError && <p style={{ color: "red", fontSize: "14px", margin: "1px" }}>
                  {titleError}
                </p>
                }
                
                <Dropdown onSelect={handleTopicCategory}>
                    <Dropdown.Toggle
                    id="topicCategoryToggle"
                    variant="light"
                    style={{ width: "100%" }}
                  >
                 {topicCategory.toLowerCase().charAt(0).toUpperCase() +
                      topicCategory.toLowerCase().slice(1)}
                  </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "100%" }}>
                    <Dropdown.Item eventKey="GENERAL">General</Dropdown.Item>
                        <Dropdown.Item eventKey="HEALTH">Health</Dropdown.Item>
                        <Dropdown.Item eventKey="FOOD">Food</Dropdown.Item>
                        <Dropdown.Item eventKey="ACCESSORIES">Accessories</Dropdown.Item>
                        <Dropdown.Item eventKey="DISEASES">Diseases</Dropdown.Item>
                  </Dropdown.Menu>
                  <Form.Text className="text-muted">
                  Select an topic category.
                </Form.Text>
                </Dropdown>

                <br></br>

                <div className="input-group">
                    <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Describe your problem..." className="form-control" aria-label="With textarea"></textarea>
                </div>
                 {descriptionError && <p style={{ color: "red", fontSize: "14px", margin: "1px" }}>
                  {descriptionError}
                </p>
                }
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={(e) => handleTopicCreation()}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Forum;