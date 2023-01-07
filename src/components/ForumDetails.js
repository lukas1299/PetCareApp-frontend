import React, { useEffect, useState } from "react"
import NavbarComponent from "./NavbarComponent";
import Button from 'react-bootstrap/Button'
import forumService from "../services/forum.service";
import { BiLike, BiDislike, BiTrash} from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from './image.png';
import navbarService from "./navbar.service";

const ForumDetails = () => {

    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState([]);
    const [image, setImage] = useState([]);

    var binaryData = [];

    const postIsRatedNotify = () => toast.error("Post is currently rated");

    const getAllTopicDetails = () => {
        forumService.getTopicDetails().then((response) => {
            setPosts(response.data);
            console.log(response.data);
            }, (error) => {
            console.log(error);
            }
        );
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

    const handlePostEvaluate = async (id, type) => {
        
        try {
            await forumService.postEvaluate(id, type).then(
                () => {
                    getAllTopicDetails();
                    
                }, (error) => {
                    if(error.response.status === 409) {
                        postIsRatedNotify();
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    const getInfoAboutMe = () => {
        forumService.getInfoAboutMe().then((response) => {
            localStorage.setItem("userName" ,response.data);
            }, (error) => {
            console.log(error);
            }
        );
    }

    const handlePostCreation = async (e) => {
        try {
            await forumService.createPost(message).then(
                () => {
                    getAllTopicDetails();
                    document.getElementById("scrolleDiv").scrollTop = 2500;
                }, (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        } 
    }

    const handlePostRemove = async (id) => {

        try {
            await forumService.postRemove(id).then(
                () => {
                    getAllTopicDetails();
                    
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
        getInfoAboutMe();
        getAllTopicDetails();
    }, []);

    binaryData.push(image);

    return(

        <div style={{backgroundColor: "white", width: '100%',minHeight:"950px", overflow:"hidden"}} className="Auth-form-container">

        <NavbarComponent image={binaryData} />

        <div style={{width: '100%', height: 'auto', float: 'left', marginTop:"80px"}}>
             <div style={{ width: '80%', height: '800px', marginTop:"20px", margin:"auto", position:"initial", backgroundColor:"#e1e5eb"}}>
                <br></br>

                {posts.map((post, index) => {
                    if(post.username === localStorage.getItem("userName")){
                        return (
                        <div key={index} style={{backgroundColor: "#242526", color: 'white',  border: '1px solid #242526', padding: '20px', marginLeft: '5%', margin: '7px', width: '90%', height: 'auto'}}>
                            <div style={{alignItems:"center"}}>
                                <img src={window.URL.createObjectURL(new Blob(binaryData))} style={{width:"40px", height:"40px", borderRadius:"15px", marginLeft:"4%"}}></img>
                                <a style={{marginLeft:"1%"}}>{post.username}</a>
                                <a style={{fontSize:"11px", float:"right"}}>{post.post.postCreationDate}</a>
                            </div>

                            <div style={{textAlign:"center"}}>
                                <a style={{marginLeft:"2%"}}>{post.post.message}</a>
                            </div>

                            <BiTrash style={{float:"right", width:"20px", height:"20px", cursor:"pointer"}} onClick={() => handlePostRemove(post.post.id)}/> 
                        </div>
                    )
                    } else {
                        return (
                        <div key={index} style={{backgroundColor: "#242526", color: 'white',  border: '1px solid #242526', padding: '20px', marginLeft: '5%', margin: '7px', width: '90%', height: 'auto'}}>
                            <div style={{alignItems:"center"}}>
                                <img src={Avatar} style={{width:"40px", height:"40px", borderRadius:"15px", marginLeft:"4%"}}></img>
                                <a style={{marginLeft:"1%"}}>{post.username}</a>
                                <a style={{fontSize:"11px", float:"right"}}>{post.post.postCreationDate}</a>
                            </div>
                            
                            <div style={{textAlign:"center"}}>
                                <a style={{marginLeft:"2%"}}>{post.post.message}</a>
                            </div>
                            
                            <div style={{float:"right"}}>
                                <a style={{marginRight:"2px"}}>{post.post.negativeOpinionAmount}</a>
                                <BiDislike style={{color:"red", cursor:"pointer"}} onClick={() => handlePostEvaluate(post.post.id, "dislike")} />
                                <BiLike style={{color:"green", cursor:"pointer"}} onClick={() => handlePostEvaluate(post.post.id, "like")} />
                                <a style={{marginLeft:"2px"}}>{post.post.positiveOpinionAmount}</a>
                            </div>
                        </div>
                    )
                    }
                })}

                <div  style={{backgroundColor: "#242526", color: 'white',  border: '1px solid #242526', padding: '20px', marginLeft: '5%', marginRight: 'auto', margin: '7px', width: '90%', height: 'auto'}}>
                            
<div style={{width:"60%", marginLeft: 'auto', marginRight: 'auto', marginTop: '7px', display:"flex"}}>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Message</span>
                </div>
                    <input onChange={(e) => setMessage(e.target.value)} type="text" className="form-control" placeholder="text" aria-label="Username" aria-describedby="basic-addon1"></input>        
                    <Button variant="success" onClick={(e) => handlePostCreation()}>Send</Button>
            </div>
                          
                            
                        </div>

                
            </div>
            
        </div>
            <ToastContainer />
        </div>
    );
}

export default ForumDetails;