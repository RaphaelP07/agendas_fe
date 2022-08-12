import React from 'react'
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Form = ({ setShowForm, formType, setFormType }) => {
  const { baseURL, token, organisation, createTeam, team, editTeam } = useContext(GlobalContext);
  // const [teamMembers, setTeamMembers] = useState([])
  // const [meetingParticipants, setMeetingParticipants] = useState([])
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState(false);
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (formType === "CREATE TEAM") {
      return
    } else
    setName(team.name)
  }, [])

  const close = () => {
    setShowForm(false)
    setFormType('')
  }

  const onChange = (e) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (formType === "CREATE TEAM") {
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
    } else if (formType === "EDIT TEAM") {
      axios({
        method: "put",
        url: `${baseURL}/organisations/${organisation.id}/teams/${team.id}`,
        headers: token,
        data: {
          name: name,
        }
      }).then((res) => {
        close();
        editTeam(res)
      }).catch((error) => {
        if (error) {
          setFormError(true);
          setMessage(error.response)
        }
      })
    } else if (formType === "INVITE MEMBER") {
      axios({
        method: "post",
        url: `${baseURL}/organisations/${organisation.id}/invite`,
        headers: token,
        data: {
          email: email,
        }
      }).then((res) => {
        close()
      }).catch((error) => {
        if (error) {
          setFormError(true);
          setMessage(error.response.data)
        }
      })
    }
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
        {formType === "CREATE TEAM" || formType === "EDIT TEAM" ? 
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
            <button className='login-btn'>Confirm</button>
          </div>
        </form> 
        : formType === "INVITE MEMBER" ? 
        <form className='form-right' onSubmit={onSubmit} noValidate>
          <br />
          <h2 className='form-title form'>
            {formType}
          </h2>
          <div className="input-label form">
            Email
          </div>
          <input
            required
            className="input-form form"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          ></input>
          <span className={formError === false ? "display-none" : "text-error"}>
            {message}
          </span>
          <div className="form-btn">
            <button className='login-btn'>Confirm</button>
          </div>
        </form> 
        : ''}
      </div>
    </div>
  )
}

export default Form