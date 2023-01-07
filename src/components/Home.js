import Button from "react-bootstrap/Button";
import React, { useRef, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import homeService from "../services/home.service";
import "./Home.css";
import ReactDOM from "react-dom";
import {
    BiCheck,
    BiUserCircle,
    BiUserCheck,
    BiCheckShield,
    BiMessageRounded,
    BiPaperclip,
    BiPaperPlane,
    BiLike,
    BiX,
    BiDislike,
    BiBell,
    BiChevronUp,
    BiCommentAdd
} from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import SocialPostComponent from "./SocialPostComponent";

import Avatar from "./image.png";
import Card from "react-bootstrap/Card";
import dog from "./dog.png";
import Image from "react-bootstrap/Image";
import navbarService from "./navbar.service";
import NavbarComponent from "./NavbarComponent";
import { useNavigate } from "react-router-dom";
import { style } from "@mui/system";
import Modal from "react-bootstrap/Modal";

const Home = () => {
    const [friends, setFriends] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [socialPosts, setSocialPosts] = useState([]);
    const [upcommingEvents, setUpcommingEvents] = useState([]);
    const [image, setImage] = useState([]);
    const [show, setShow] = useState(false);
    const [allPostComment, setAllPostComment] = useState([]);
    const [commentExistation, setCommentExistation] = useState(true);
    const [commentContent, setContent] = useState("");

    const navigate = useNavigate();

    var binaryData = [];
    var socialPostsComments;
    var title = "default";
    var postImage;
    var content;

    const handleShow = (id) => {
        localStorage.setItem("postId", id);
        getAllComments(id);
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };

    const postIsRatedNotify = () => toast.error("Post is currently rated");

    const handleContent = (givenContent) => {
        content = givenContent;
        console.log(content);
    };

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

    const getPost = () => {
        homeService.getSocialPost().then(
            (response) => {
                console.log(response.data);
                setSocialPosts(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const getUpcomingEvents = () => {
        homeService.getUpcomingEvents().then(
            (response) => {
                setUpcommingEvents(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const refreshFriends = () => {
        homeService.getUserFriends().then(
            (response) => {
                setFriends(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const getAllComments = (id) => {
        homeService.getSocialPostComments(id).then(
            (response) => {
                setAllPostComment(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const refreshInvitaion = () => {
        homeService.getUserInvitations().then(
            (response) => {
                setInvitations(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const acceptInvitation = (userId) => {
        homeService.acceptFriendsInvitation(userId).then(
            (response) => {
                console.log(response.data);
                refreshFriends();
                refreshInvitaion();
                getPost();
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const rejectInvitation = (userId) => {
        homeService.rejectFriendsInvitation(userId).then(
            (response) => {
                console.log(response.data);
                refreshFriends();
                refreshInvitaion();
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const createSocialPost = () => {
        if (content === undefined) {
            console.log("Błąd");
        } else {
            homeService.createSocialPost(title, content, postImage).then(
                (response) => {
                    console.log(response.data);
                    refreshFriends();
                    refreshInvitaion();
                    getPost();
                    document.getElementById("clip").style.color = "#8adbd3";
                    document.getElementById("contentInput").value = "";
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    };

    const fileHandler = () => {
        var input = document.createElement("input");
        input.type = "file";

        input.onchange = (e) => {
            var file = e.target.files[0];
            postImage = file;
            document.getElementById("clip").style.color = "#e62e3a";
        };

        input.click();
    };

    const handlePostEvaluate = (id, type) => {
        homeService.socialPostAssessment(id, type).then(
            (response) => {
                console.log(response.data);
                refreshFriends();
                refreshInvitaion();
                getPost();
            },
            (error) => {
                console.log(error);
                if (error.response.status === 409) {
                    postIsRatedNotify();
                }
            }
        );
    };

    const createComment = (id, commentContent) => {
        if (commentContent === "") {
            console.log("Bład");
        } else {
            homeService.createSocialPostComment(id, commentContent).then(
                () => {
                    getAllComments(id);
                    document.getElementById("contentInput").value = "";
                },
                (error) => {
                    console.log(error);
                    if (error.response.status === 409) {
                        postIsRatedNotify();
                    }
                }
            );
        }
    };

    const showComments = async (id) => {
        if (commentExistation) {
            socialPostsComments = await homeService.getSocialPostComments(id);
            setCommentExistation(false);
            const divId = Math.random() * (1000 - 0) + 0;
            const moreIconId = Math.random() * (1000 - 0) + 0;
            console.log(socialPostsComments.data);
            const element = document.getElementById(id);
            const div = document.createElement("div");
            const moreIcon = document.createElement("div");
            moreIcon.id = moreIconId;
            const dots = document.createElement("a");
            dots.textContent = "...";

            moreIcon.style.color = "white";
            moreIcon.style.cursor = "pointer";
            moreIcon.style.fontSize = "25px";
            moreIcon.style.marginLeft = "90%";
            moreIcon.style.clear = "both";
            moreIcon.onclick = () => handleShow(id);
            moreIcon.appendChild(dots);
            var a, img;

            div.id = divId;
            div.onclick = () => hideComment(id, divId, moreIconId);
            const line = document.createElement("div");
            line.style.content = " ";
            line.style.display = "block";
            line.style.borderBottom = "0.5px solid #9E9E9E";
            line.style.marginBottom = "5px";
            div.appendChild(line);

            socialPostsComments.data.slice(-4).map((comment) => {
                console.log(comment.id);
                const c = document.createElement("div");
                a = document.createElement("a");
                a.style.color = "#212529";
                a.style.marginLeft = "5px";
                a.textContent = comment.content;

                img = document.createElement("img");
                img.src = "data:image/png;base64," + comment.user.photo;
                img.style.height = "6%";
                img.style.width = "6%";
                img.style.margin = "5px";
                img.style.borderRadius = "15px";

                c.appendChild(img);
                c.appendChild(a);
                c.style.backgroundColor = "#DFE0E0";
                c.style.borderRadius = "5px";
                c.style.marginTop = "5px";
                c.style.width = "100%";

                div.appendChild(c);
            });

            element.appendChild(div);
            element.appendChild(moreIcon);
        }
    };
    const hideComment = (id, divId, moreIconId) => {
        const element = document.getElementById(id);
        const div = document.getElementById(divId);
        const moreIcon = document.getElementById(moreIconId);
        element.removeChild(div);
        element.removeChild(moreIcon);
        setCommentExistation(true);
    };

    useEffect(() => {
        loadAvatar();
        refreshFriends();
        refreshInvitaion();
        getPost();
        getUpcomingEvents();
    }, []);

    binaryData.push(image);

    return (
        <div
            style={{ backgroundColor: "#d3dded", width: "100%", height: "auto" }}
            className="Auth-form-container"
        >
            <NavbarComponent image={binaryData} />

            <div>
                <div
                    style={{
                        backgroundColor: "#212529",
                        width: "20%",
                        height: "100%",
                        float: "left",
                        marginTop: "50px",
                        position: "fixed",
                    }}
                >
                    <h5
                        style={{ color: "#ffffff8c", marginTop: "60px", marginLeft: "10%" }}
                    >
                        Menu
                    </h5>
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
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "10%",
                            marginTop: "5%",
                            marginBottom: "25px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            navigate("/friends");
                        }}
                    >
                        <BiUserCircle
                            style={{ width: "25px", height: "25px", color: "#8adbd3" }}
                        />
                        <a
                            style={{
                                color: "white",
                                fontSize: "16px",
                                textAlign: "center",
                                fontFamily: "Verdana, sans-serif",
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;Friends
                        </a>
                    </div>

                    <div
                        id="achievementDiv"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "10%",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            navigate("/achievements");
                        }}
                    >
                        <BiCheckShield
                            style={{ width: "25px", height: "25px", color: "#8adbd3" }}
                        />
                        <a
                            style={{
                                color: "white",
                                fontSize: "16px",
                                textAlign: "center",
                                fontFamily: "Verdana, sans-serif",
                            }}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;Achievements
                        </a>
                    </div>
                    <h5
                        style={{
                            color: "#ffffff8c",
                            marginTop: "60px",
                            textAlign: "center",
                        }}
                    >
                        Upcoming events
                    </h5>
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
                    <div>
                        {upcommingEvents.slice(0, 3).map((upcommingEvent, index) => {
                            return (
                                <Card
                                    key={index}
                                    style={{
                                        width: "14.5%",
                                        minWidth: "94%",
                                        minHeight: "40%",
                                        float: "left",
                                        position: "revert",
                                        cursor: "pointer",
                                        margin: "3%",
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>{upcommingEvent.date.slice(0, 10)}</Card.Title>
                                        <Card.Text>
                                            <a>Name: </a>
                                            <strong>{upcommingEvent.event.name}</strong>
                                            <br></br>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: "#212529",
                        width: "20%",
                        height: "100%",
                        marginTop: "50px",
                        marginLeft: "80%",
                        position: "fixed",
                    }}
                >
                    <h5
                        style={{
                            color: "#ffffff8c",
                            marginTop: "60px",
                            textAlign: "center",
                        }}
                    >
                        Contacts
                    </h5>
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
                    {friends.slice(0, 4).map((friend, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: "#DFE0E0",
                                    width: "95%",
                                    height: "50px",
                                    marginTop: "15px",
                                    borderRadius: "50px",
                                    cursor: "pointer",
                                    textAlign: "center",
                                    marginLeft: "5%",
                                }}
                            >
                                <img
                                    src={"data:image/png;base64," + friend.photo}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "15px",
                                        float: "left",
                                        margin: "5px",
                                    }}
                                ></img>
                                <p style={{ float: "left", margin: "5px", marginTop: "10px" }}>
                                    {friend.username}
                                </p>
                            </div>
                        );
                    })}

                    <h5
                        style={{
                            color: "#ffffff8c",
                            marginTop: "60px",
                            textAlign: "center",
                        }}
                    >
                        Invitations
                    </h5>
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
                    {invitations.map((invite, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: "#DFE0E0",
                                    width: "95%",
                                    height: "50px",
                                    marginTop: "15px",
                                    borderRadius: "50px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginLeft: "5%",
                                }}
                            >
                                <img
                                    src={"data:image/png;base64," + invite.profile.user.photo}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "15px",

                                        margin: "5px",
                                    }}
                                ></img>
                                {invite.profile.user.username}

                                <div>
                                    <BiCheck
                                        style={{ color: "green", fontSize: "28px" }}
                                        onClick={() => acceptInvitation(invite.id)}
                                    />
                                    <BiX
                                        style={{ color: "red", fontSize: "28px" }}
                                        onClick={() => rejectInvitation(invite.id)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div
                    style={{
                        backgroundColor: "#DFE0E0",
                        width: "100%",
                        height: "auto",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#242526",
                            border: "1px solid #242526",
                            borderRadius: "25px",
                            padding: "20px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "40%",
                            height: "200px",
                            boxShadow:
                                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                marginTop: "50px",
                                width: "100%",
                                height: "100px",
                                color: "red",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={window.URL.createObjectURL(new Blob(binaryData))}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "15px",
                                    marginLeft: "4%",
                                }}
                            ></img>
                            <Form.Control
                                id="contentInput"
                                onChange={(e) => handleContent(e.target.value)}
                                type="text"
                                placeholder="What do you want to share?"
                                style={{ width: "67%", marginLeft: "2%" }}
                            />

                            <Form.Control
                                id="fileInput"
                                type="file"
                                style={{ width: "67%", marginLeft: "2%", display: "none" }}
                            />

                            <BiPaperclip
                                id="clip"
                                style={{
                                    color: "#8adbd3",
                                    width: "25px",
                                    height: "25px",
                                    marginLeft: "20px",
                                    cursor: "pointer",
                                }}
                                onClick={() => fileHandler()}
                            />

                            <BiPaperPlane
                                onClick={() => createSocialPost()}
                                style={{
                                    color: "#8adbd3",
                                    width: "25px",
                                    height: "25px",
                                    marginLeft: "20px",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        {socialPosts.map((post, index) => {
                            return (
                                <div
                                    id={post.socialPost.id}
                                    key={index}
                                    className="socialPost"
                                    style={{
                                        backgroundColor: "#242526",
                                        border: "1px solid #242526",
                                        borderRadius: "25px",
                                        padding: "20px",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        marginTop: "7px",
                                        width: "40%",
                                        height: "auto",
                                        boxShadow:
                                            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.44)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            color: "white",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={"data:image/png;base64," + post.user.photo}
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "15px",
                                            }}
                                        ></img>
                                        <a style={{ marginLeft: "2%" }}>{post.user.username}</a>
                                    </div>
                                    <div
                                        style={{
                                            borderStyle: "solid",
                                            color: "gray",
                                            borderWidth: "1px",
                                            borderRadius: "15px",
                                            marginTop: "8px",
                                            height: "auto",
                                            textAlign: "center",
                                        }}
                                    >
                                        <p style={{ color: "white", margin: "5px" }}>
                                            {post.socialPost.content}
                                        </p>
                                        <Image
                                            style={{ width: "100%", borderRadius: "15px" }}
                                            src={"data:image/png;base64," + post.socialPost.photo}
                                        />
                                    </div>
                                    <div style={{ color: "white", margin: "10px" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                float: "left",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => showComments(post.socialPost.id)}
                                        >
                                            <BiMessageRounded
                                                style={{ width: "25px", height: "25px", margin: "2px" }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                float: "right",
                                            }}
                                        >
                                            <a style={{ marginRight: "4px" }}>
                                                {post.socialPost.negativeOpinionAmount}
                                            </a>
                                            <BiDislike
                                                style={{
                                                    color: "#e62e3a",
                                                    cursor: "pointer",
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                                onClick={() =>
                                                    handlePostEvaluate(post.socialPost.id, "dislike")
                                                }
                                            />
                                            <BiLike
                                                style={{
                                                    color: "#228734",
                                                    cursor: "pointer",
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                                onClick={() =>
                                                    handlePostEvaluate(post.socialPost.id, "like")
                                                }
                                            />
                                            <a style={{ marginLeft: "4px" }}>
                                                {post.socialPost.positiveOpinionAmount}
                                            </a>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <BiCommentAdd />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                        <h5>Comments</h5>
                    </div>
                    <div
                        className="scrollable-div"
                        style={{ height: "400px", width: "101%", marginLeft: "-1%" }}
                    >
                        {allPostComment.map((comment, index) => {
                            return (
                                <div
                                    style={{
                                        width: "98%",
                                        heigth: "5%",
                                        backgroundColor: "#DFE0E0",
                                        borderRadius: "10px",
                                        margin: "1%",
                                    }}
                                    key={index}
                                >
                                    <img
                                        src={"data:image/png;base64," + comment.user.photo}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            margin: "1%",
                                            borderRadius: "10px",
                                        }}
                                    ></img>
                                    {comment.content}
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <hr
                            style={{
                                color: "#3d4045",
                                backgroundColor: "#3d4045",
                                height: 0.5,
                                borderColor: "#3d4045",
                                width: "98%",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        />
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    id="contentInput"
                                    type="email"
                                    placeholder="Write a comment..."
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Write what you think about this post.
                                </Form.Text>
                            </Form.Group>

                            <Button
                                variant="success"
                                style={{ float: "right" }}
                                onClick={() =>
                                    createComment(localStorage.getItem("postId"), commentContent)
                                }
                            >
                                Publish
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default Home;
