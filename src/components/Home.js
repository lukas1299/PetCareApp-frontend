import Button from 'react-bootstrap/Button';
import React, {useEffect, useState} from "react";
import NavbarComponent from './NavbarComponent';
import homeService from '../services/home.service';
import './Home.css'
import { BiCheck, BiUserCircle, BiUserCheck, BiCheckShield, BiMessageRounded, BiPaperclip, BiPaperPlane, BiLike, BiDislike} from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';


import Avatar from './image.png';
import Card from 'react-bootstrap/Card';
import dog from "./dog.png";

const Home = () => {

    const [friends, setFriends] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [socialPosts, setSocialPosts] = useState([]);

    var title = "default";
    var content;

    const postIsRatedNotify = () => toast.error("Post is currently rated");

    const handleContent = (givenContent) => {
        content = givenContent;
        console.log(content);
    }

    const getSocialPost = () => {
        homeService.getSocialPost().then((response) => {
            setSocialPosts(response.data);
            console.log(response.data);
            }, (error) => {
            console.log(error);
            }
        );
    }

    const refreshFriends = () => {
        homeService.getUserFriends().then((response) => {
            setFriends(response.data);
            console.log(response.data);
            }, (error) => {
            console.log(error);
            }
        );
    }

    const refreshInvitaion = () => {
        homeService.getUserInvitations().then((response) => {
            setInvitations(response.data);
            console.log(response.data);
            }, (error) => {
            console.log(error);
            }
        );
    }

    const acceptInvitation = (userId) => {
        homeService.acceptFriendsInvitation(userId).then((response) => {
            console.log(response.data);
            refreshFriends();
            refreshInvitaion();
            getSocialPost();
        }, (error) => {
            console.log(error);
        })
    }

    const rejectInvitation = (userId) => {
        homeService.rejectFriendsInvitation(userId).then((response) => {
            console.log(response.data);
            refreshFriends();
            refreshInvitaion();
        }, (error) => {
            console.log(error);
        })
    }

    const createSocialPost = () => {

        if(content === undefined){
            console.log("Błąd");
        } else {
            homeService.createSocialPost(title, content).then((response) => {
                console.log(response.data);
                refreshFriends();
                refreshInvitaion();
                getSocialPost();
                document.getElementById("contentInput").value = "";
            }, (error) => {
            console.log(error);
            })
        }
    }

    const handlePostEvaluate = (id, type) => {
        
        homeService.socialPostAssessment(id, type).then((response) => {
                console.log(response.data);
                refreshFriends();
                refreshInvitaion();
                getSocialPost();
            }, (error) => {
            console.log(error);
                if(error.response.status === 409) {
                    postIsRatedNotify();
                }
            })

    }

    useEffect(() => {
        refreshFriends();
        refreshInvitaion();
        getSocialPost();
    }, []);

    return (
        <div style={{backgroundColor: "#d3dded", width: '100%', height: '1500px'}} className="Auth-form-container">
            <NavbarComponent />

            <div>
                <div style={{backgroundColor: "#212529", width: '20%', height: '100%', float: 'left', marginTop:"50px", position:"fixed"}}>
                    <h5 style={{color:"#ffffff8c", marginTop:"60px", marginLeft:"10%"}}>Menu</h5>
                    <hr  style={{color: 'white', backgroundColor: 'white', height: .5, borderColor : 'white', width:"90%", marginLeft:"auto", marginRight:"auto"}}/>
                    <div style={{display:"flex",alignItems:"center", marginLeft:"10%", marginTop:"5%", marginBottom:"25px", cursor:"pointer"}}>
                        <BiUserCircle style={{width:"25px", height:"25px", color:"#8adbd3"}} />
                        <a style={{color:"white", fontSize:"16px", textAlign:"center", fontFamily: "Verdana, sans-serif"}}>&nbsp;&nbsp;&nbsp;&nbsp;Friends</a>
                    </div>
                    <div style={{display:"flex",alignItems:"center",marginLeft:"10%", marginBottom:"25px", cursor:"pointer"}}>
                        <BiUserCheck style={{width:"25px", height:"25px", color:"#8adbd3"}} />
                        <a style={{color:"white", fontSize:"16px", textAlign:"center", fontFamily: "Verdana, sans-serif"}}>&nbsp;&nbsp;&nbsp;&nbsp;Invitation</a>
                    </div>
                    <div style={{display:"flex",alignItems:"center",marginLeft:"10%", cursor:"pointer"}}>
                        <BiCheckShield style={{width:"25px", height:"25px", color:"#8adbd3"}} />
                        <a style={{color:"white", fontSize:"16px", textAlign:"center", fontFamily: "Verdana, sans-serif"}}>&nbsp;&nbsp;&nbsp;&nbsp;Achievements</a>
                        </div>
                            <h5 style={{color:"#ffffff8c", marginTop:"60px", textAlign:"center"}}>Upcoming events</h5>
                            <hr  style={{color: 'white', backgroundColor: 'white', height: .5, borderColor : 'white', width:"90%", marginLeft:"auto", marginRight:"auto"}}/>
                        <div>
                    </div>
                </div>
                <div style={{backgroundColor: "#212529", width: '20%', height: '100%', marginTop:"50px", marginLeft:"80%", position:"fixed"}}>
                    <h5 style={{color:"#ffffff8c", marginTop:"60px", textAlign:"center"}}>Contacts</h5>
                    <hr  style={{color: 'white', backgroundColor: 'white', height: .5, borderColor : 'white', width:"90%", marginLeft:"auto", marginRight:"auto"}}/>
                    {friends.map((friend, index) => {
                    return (
                        <div key={index} style={{backgroundColor: "#DFE0E0", width:"95%", height:"50px", marginTop:"15px", borderRadius:"50px", cursor:"pointer", textAlign:"center", marginLeft:"5%"}}>
                            <img src={Avatar} style={{width:"40px", height:"40px", borderRadius:"15px", float:"left", margin:"5px"}}></img>
                            <p style={{float:"left", margin:"5px", marginTop:"10px"}}>{friend.username}</p>
                            </div>
                    )
                    })}

                    <h5 style={{color:"#ffffff8c", marginTop:"60px", textAlign:"center"}}>Invitations</h5>
                    <hr  style={{color: 'white', backgroundColor: 'white', height: .5, borderColor : 'white', width:"90%", marginLeft:"auto", marginRight:"auto"}}/>
                    {invitations.map((invite, index) => {
                    return (
                        <div key={index} style={{backgroundColor: "#DFE0E0", width:"95%", height:"50px", marginTop:"15px", borderRadius:"50px", cursor:"pointer", textAlign:"center", marginLeft:"5%"}}>
                             <img src={Avatar} style={{width:"40px", height:"40px", borderRadius:"15px"}}></img>
                            {invite.profile.user.email}
                            <Button onClick={() => acceptInvitation(invite.id)} variant="success"><BiCheck /></Button>
                            <Button onClick={() => rejectInvitation(invite.id)} variant="danger"><BiCheck /></Button>
                            </div>
                    )
                    })}
                </div>
                <div style={{backgroundColor: "#DFE0E0", width: '100%', height: '1400px'}}>
                    <div style={{backgroundColor: "#242526",  border: '1px solid #242526', borderRadius: '25px', padding: '20px', marginLeft: 'auto', marginRight: 'auto', width: '40%', height: '200px', boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)"}}>
                        <div style={{display:"flex", marginTop:"50px", width:"100%", height:"100px", color:"red", alignItems: "center"}}>
                            <img src={Avatar} style={{width:"40px", height:"40px", borderRadius:"15px", marginLeft:"4%"}}></img>  
                            <Form.Control id="contentInput" onChange={(e) => handleContent(e.target.value)} type="text" placeholder="What do you want to share?" style={{width:"67%", marginLeft:"2%"}}/>
                            <BiPaperclip style={{color:"#8adbd3", width:"25px", height:"25px", marginLeft:"20px", cursor:"pointer"}} />
                            <BiPaperPlane onClick={() => createSocialPost()} style={{color:"#8adbd3", width:"25px", height:"25px", marginLeft:"20px", cursor:"pointer"}} />
                        </div>
                    </div>
                    {socialPosts.map((post, index) => {
                        return(
                            <div key={index} style={{backgroundColor: "#242526",  border: '1px solid #242526', borderRadius: '25px', padding: '20px', marginLeft: 'auto', marginRight: 'auto', marginTop: '7px', width: '40%', height: '450px', boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)"}}>
                                <div style={{display:"flex", color:"white", alignItems: "center"}}>
                                    <img src={Avatar} style={{width:"40px", height:"40px", borderRadius:"15px"}}></img>
                                    <a style={{marginLeft:"2%"}}>{post.user.username}</a>
                                </div>
                                <div style={{borderStyle:"solid", color:"gray", borderWidth:"1px", borderRadius:"15px", marginTop:"8px", height:"300px", textAlign:"center"}}>
                                    <p style={{color:"white", margin:"5px"}}>{post.socialPost.content}</p>
                                </div>
                                <div style={{color:"#8adbd3"}}>
                                    <div style={{display:"flex", alignItems:"center", float:"left", cursor:"pointer"}}>
                                        <a>Comments</a>
                                        <BiMessageRounded style={{width:"20px", height:"20px", margin:"2px"}}/>
                                    </div>
                                   
                                    <div style={{display:"flex", alignItems:"center", float:"right"}}>
                                        <a style={{marginRight:"4px"}}>{post.socialPost.negativeOpinionAmount}</a>
                                        <BiDislike style={{color:"#e62e3a", cursor:"pointer", width:"20px", height:"20px"}}  onClick={() => handlePostEvaluate(post.socialPost.id, "dislike")} />
                                        <BiLike style={{color:"#228734", cursor:"pointer", width:"20px", height:"20px"}}  onClick={() => handlePostEvaluate(post.socialPost.id, "like")} />
                                        <a style={{marginLeft:"4px"}}>{post.socialPost.positiveOpinionAmount}</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>                
            </div> 
            <ToastContainer />
        </div>
    )
};

export default Home;