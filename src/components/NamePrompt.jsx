import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const NamePrompt = () => {
  const navigate = useNavigate();
  const { baseURL, token } = useContext(GlobalContext);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [formError, setFormError] = useState(false);
  const [message, setMessage] = useState('')

  const onChange = (e) => {
    switch (e.target.id) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(token)
    axios({
      method: "post",
      url: `${baseURL}/users/name`,
      headers: token,
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }).then((res) => {
      navigate("/agendas/dashboard");
    }).catch((error) => {
      if (error) {
        setFormError(true);
        setMessage(error.response.data)
      }
    })
  }

  return (
    <div className='container'>
      <Nav />
      <div className="main-container">
        <form className="prompt-form" onSubmit={onSubmit}>
          <h1>Enter your name:</h1>
          <input
            required
            className="input-form long-form"
            type="firstName"
            id="firstName"
            name="firstName"
            placeholder="first name"
            value={firstName}
            onChange={onChange}
          ></input>
          <input
            required
            className="input-form long-form"
            type="lastName"
            id="lastName"
            name="lastName"
            placeholder="last name"
            value={lastName}
            onChange={onChange}
          ></input>
          <span className={formError === false ? "display-none" : "text-error"}>
            {message}
          </span>
          <button className='prompt-btn'>Confirm</button>
        </form>
      </div>
    </div>
  )
}

export default NamePrompt