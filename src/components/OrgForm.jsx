import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const OrgForm = ({ orgAction, setAlert }) => {
  const navigate = useNavigate();
  const { baseURL, token } = useContext(GlobalContext);
  const [orgName, setOrgName] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [orgCode, setOrgCode] = useState("");
  const [formError, setFormError] = useState(false);
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (localStorage.getItem('agendasToken') === null) {
      navigate('/agendas/login')
      setAlert("You have to login before continuing")
    }
  }, [])

  const onChange = (e) => {
    switch (e.target.id) {
      case "orgName":
        setOrgName(e.target.value);
        break;
      case "orgAddress":
        setOrgAddress(e.target.value);
        break;
      case "orgCode":
        setOrgCode(e.target.value);
        break;
    }
  };

  const back = () => {
    navigate('/agendas/org-prompt')
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (orgAction === 'create') {
      axios({
        method: "post",
        url: `${baseURL}/organisations`,
        headers: token,
        data: {
          name: orgName,
          city_address: orgAddress
        }
      }).then((res) => {
        navigate("/agendas/organisations");
      }).catch((error) => {
        if (error) {
          setFormError(true);
          setMessage(error.response.data)
        }
      })
    } else {
      axios({
        method: "post",
        url: `${baseURL}/organisations/join`,
        headers: token,
        data: {
          link: orgCode
        }
      }).then((res) => {
        console.log(res)
        navigate("/agendas/dashboard");
      }).catch((error) => {
        if (error) {
          setFormError(true);
          setMessage(error.response.data)
        }
      })
    }
  }

  return (
    <div className='container'>
      <Nav />
      <div className="main-container">
        <form className="prompt-form" onSubmit={onSubmit}>
          {orgAction == 'create' ? 
          <>
            <h1>Create an organisation:</h1>
            <input
              required
              className="input-form long-form"
              type="orgName"
              id="orgName"
              name="orgName"
              placeholder="name"
              value={orgName}
              onChange={onChange}
            ></input>
            <input
              required
              className="input-form long-form"
              type="orgAddress"
              id="orgAddress"
              name="orgAddress"
              placeholder="city address"
              value={orgAddress}
              onChange={onChange}
            ></input>
          </> : 
          <>
            <h1>Join an organisation:</h1>
            <input
              required
              className="input-form long-form"
              type="orgCode"
              id="orgCode"
              name="orgCode"
              placeholder="enter code"
              value={orgCode}
              onChange={onChange}
            ></input>
          </>
        }
          <span className={formError === false ? "display-none" : "text-error"}>
            {message}
          </span>
          <div className="org-form-buttons">
            <button className='prompt-btn back' onClick={() => back()}>Go back</button>
            <button className='prompt-btn'>Confirm</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrgForm