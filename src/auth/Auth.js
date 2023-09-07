import React, { useState } from "react";
import axios from "axios";
import { BsXSquare } from "react-icons/bs";
import { BsArrowRepeat } from 'react-icons/bs';
import './Auth.css'

function getDateNow() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

export default function (props){

    let [authMode, setAuthMode] = useState("signin");

    let [username, setUsername] = useState("");
    let [name, setName] = useState(""); 
    let [email, setEmail] = useState("");
    let [birthday, setbirthday] = useState(""); 

    let [showAlert, setShowAlert] = useState(true);
    let [isSubmitting, setIsSubmitting] = useState(false);

    let [errorMessage, setErrorMessage] = useState("");
    let [warningMessage, setWarningMessage] = useState("");

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const closeAlert = () => {
        setShowAlert(false);
    };

    const handleSingIn = (event) => {
        event.preventDefault();
        setShowAlert(true);
        setIsSubmitting(true);
        setErrorMessage("");
        setWarningMessage("");

        axios.get("http://localhost:9090/finance/v1/user/checks", {
            params: {
                username: username,
                birthday: birthday
            }
        })
        .then((response) => {
            let data = response.data;
            if(data.error != null){
                setWarningMessage(data.error);
            }else{  
                localStorage.setItem("user_id", data.user.id);
                localStorage.setItem("username", data.user.username);
                localStorage.setItem("user_date_login", getDateNow());
                window.location.reload();
            }
            setIsSubmitting(false);
        }) 
        .catch((error) => {
            setErrorMessage("An error occurred. Please try again.");
            setIsSubmitting(false); 
        }) 
    }

    const handleSingUp = (event) => {
        event.preventDefault();
        setShowAlert(true);
        setIsSubmitting(true);
        setErrorMessage("");
        setWarningMessage("");

        axios.post("http://localhost:9090/finance/v1/user",
        {
            name: name,
            email: email,
            birthday: birthday
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            let data = response.data;
            if(data.error != null){
                setWarningMessage(data.error);
            }else{
                console.log(data.user);
                setUsername(data.user.username);
                setbirthday(data.user.birthday);
                setAuthMode("signin");
            }
            setIsSubmitting(false);
        })
        .catch((error) => {
            setErrorMessage("An error occurred. Please try again.");
            setIsSubmitting(false); 
        })
    }

    if(authMode === "signin"){
        return (
            <div className="Auth-form-container">
                {showAlert && errorMessage && 
                    <div className="alert alert-danger" role="alert">
                        <span>{errorMessage}</span>
                        &nbsp;
                        <span onClick={closeAlert} className="cursor-pointer"><BsXSquare size={26}/></span>
                    </div>                  
                }
                {showAlert && warningMessage && 
                    <div className="alert alert-warning" role="alert">
                        <span>{warningMessage}</span>
                        &nbsp;
                        <span onClick={closeAlert} className="cursor-pointer"><BsXSquare size={26}/></span>
                    </div>
                }
                <form className="Auth-form" onSubmit={handleSingIn}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet? {" "}
                            <span className="link-primary cursor-pointer" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>birthday</label>
                            <input
                                type="date"
                                className="form-control mt-1"
                                placeholder="Enter birthday"
                                value={birthday}
                                onChange={(event) => setbirthday(event.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? <BsArrowRepeat className="spin" /> : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    if(authMode === "signup"){
        return (
            <div className="Auth-form-container">
                {showAlert && errorMessage && 
                    <div className="alert alert-danger" role="alert">
                        <span>{errorMessage}</span>
                        &nbsp;
                        <span onClick={closeAlert} className="cursor-pointer"><BsXSquare size={26}/></span>
                    </div>                  
                }
                {showAlert && warningMessage && 
                    <div className="alert alert-warning" role="alert">
                        <span>{warningMessage}</span>
                        &nbsp;
                        <span onClick={closeAlert} className="cursor-pointer"><BsXSquare size={26}/></span>
                    </div>
                }
                <form className="Auth-form" onSubmit={handleSingUp}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign Up</h3>
                        <div className="text-center">
                            Already registered? {" "}
                            <span className="link-primary cursor-pointer" onClick={changeAuthMode}>
                                Sign In
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter full name"
                                value={name}
                                onChange={(event) =>  setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>birthday</label>
                            <input
                                type="date"
                                className="form-control mt-1"
                                placeholder="Enter birthday"
                                value={birthday}
                                onChange={(event) => setbirthday(event.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? <BsArrowRepeat className="spin" /> : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}