import React from 'react'
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Form = ({ setShowForm, formType }) => {
  const navigate = useNavigate();
  const { baseURL, token, organisation, createTeam } = useContext(GlobalContext);
  const [teamMembers, setTeamMembers] = useState([])
  const [meetingParticipants, setMeetingParticipants] = useState([])
  const [name, setName] = useState("");
  const [formError, setFormError] = useState(false);
  const [message, setMessage] = useState('')

  const close = () => {
    setShowForm(false)
  }

  const onChange = (e) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${baseURL}/organisations/${organisation.id}/teams`,
      headers: token,
      data: {
        name: name,
      }
    }).then((res) => {
      close();
      createTeam(res)
    }).catch((error) => {
      if (error) {
        setFormError(true);
        setMessage(error.response.data)
      }
    })
  };

  return (
    <div>
      <div className="prompt-bg" onClick={() => close()}></div>
      <div className='show-container'>
        <FontAwesomeIcon
          icon={faX}
          onClick={() => close()}
          className='x'
        />
        <form className='form-right' onSubmit={onSubmit} noValidate>
          <br />
          <h2 className='form-title form'>
            {formType}
          </h2>
          <div className="input-label form">
            Name
          </div>
          <input
            required
            className="input-form form"
            type="name"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
          ></input>
          <span className={formError === false ? "display-none" : "text-error"}>
            {message}
          </span>
          <div className="form-btn">
            <button className='login-btn'>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form