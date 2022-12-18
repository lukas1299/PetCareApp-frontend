import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react"
import NavbarComponent from "./NavbarComponent";
import forumService from "../services/forum.service";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from "react-router-dom";
import {BiPlus, BiLike, BiDislike, BiSearchAlt, BiMessageRounded} from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import Avatar from './image.png';

const Forum = () => {

    const [show, setShow] = useState(false);
    const [topics, setTopics] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    var topicCategory = 'GENERAL';

    const handleTopicCategory = (selectedCategory) => {
        topicCategory = selectedCategory;
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

    const showTopicDetails = (topicId) => {
        localStorage.setItem("topicId", topicId);

        navigate("/forumDetails");
    }

    useEffect(() => {
        getAllTopics();
    }, []);

    return(

        <div style={{backgroundColor: "#8adbd3", width: '100%', height: '1500px', overflow:"hidden"}} className="Auth-form-container">
            <NavbarComponent />
            
            <div style={{backgroundColor:"#787271", display: "flex", alignItems: "center", marginTop:"80px", marginBottom:"20px", width:"600px", height:"80px", marginLeft:"auto", marginRight:"auto", borderRadius:"15px"}}>
                <BiSearchAlt style={{marginLeft:"5%", fontSize:"25px"}}/>
                <Form.Control type="text" placeholder="Search" style={{width:"67%", marginLeft:"2%"}}/>
                <div onClick={handleShow} style={{backgroundColor: '#242526', color: '#5EDA66', fontSize:"30px", width: '50px', height: '50px', marginLeft:"10%", borderRadius:"25px", textAlign:"center", cursor:"pointer"}}>
                    <BiPlus />
                </div>
            </div>
            
            <div style={{width: '80%', height: '100%', marginTop:"20px", margin:"auto", position:"initial", backgroundColor:"#3A3B3C"}}>
                <br></br>
                
                {topics.map((topic, index) => {
                    return (
                        <div key={index} onClick={() => showTopicDetails(topic.topic.id)} style={{cursor:"pointer", backgroundColor: "#242526", color: 'white',  border: '1px solid #242526', borderRadius: '25px', padding: '20px', marginLeft: 'auto', marginRight: 'auto', marginTop: '7px', width: '80%', height: 'auto'}}>
                           <div style={{display:"flex", alignItems:"center"}}>
                                <img src={Avatar} style={{width:"40px", height:"40px", borderRadius:"15px", marginLeft:"4%"}}></img>
                                <a style={{marginLeft:"2%"}}>{topic.userName}</a>
                                <a style={{fontSize:"12px", marginLeft:"67%"}}>{topic.topic.creationDate}</a>
                           </div>
                           <div style={{textAlign:"center"}}>
                                <hr  style={{color: 'white', backgroundColor: 'white', height: .5, borderColor : 'white', width:"90%", marginLeft:"auto", marginRight:"auto"}}/>
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
                <Modal.Header>
                    <Modal.Title>Create topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Title</span>
                    </div>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                
                <Dropdown onSelect={handleTopicCategory}>
                    <Dropdown.Toggle variant="secondary">
                        Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="GENERAL">GENERAL</Dropdown.Item>
                        <Dropdown.Item eventKey="HEALTH">HEALTH</Dropdown.Item>
                        <Dropdown.Item eventKey="FOOD">FOOD</Dropdown.Item>
                        <Dropdown.Item eventKey="ACCESSORIES">ACCESSORIES</Dropdown.Item>
                        <Dropdown.Item eventKey="DISEASES">DISEASES</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br></br>

                <div className="input-group">
                     <div className="input-group-prepend">
                        <span className="input-group-text">With textarea</span>
                    </div>
                        <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" aria-label="With textarea"></textarea>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={(e) => handleTopicCreation()}>Close</Button>
                    <Button variant="success" onClick={(e) => handleTopicCreation()}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Forum;