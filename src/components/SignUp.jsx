import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const SignUp = () => {
  const navigate = useNavigate();
  const { baseURL } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false)
  const [formError, setFormError] = useState(false);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPassword":
        setconfirmPassword(e.target.value);
        break;
    }
  };

  useEffect(() => {
    if (password === confirmPassword && password !== '') {
      setConfirmed(true)
    }
  }, [confirmPassword])

  const onSubmit = (e) => {
    e.preventDefault();

    if (confirmed === false && password !== '') {
      setMessage("User couldn't be created successfully. Password must match confirm password.")
      setFormError(true)
      return
    } else 
    
    axios
      .post(`${baseURL}signup`, {
        user: {
          email: email,
          password: password
        }
      })
      .then((res) => {
        // console.log(res.data.status.message)
        navigate("/agendas/login");
      })
      .catch((error) => {
        if (error) {
          setMessage(error.response.data.status.message);
          setFormError(true)
        }
      });
  };

  return (
    <div className='container'>
      <Nav />
      <form onSubmit={onSubmit} noValidate>
        <div className='form-container'>
          <h1 className='form-title form'>
            Sign up
          </h1>
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
          <div className="input-label form ">
            Password
          </div>
          <input
            required
            className="input-form form"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          ></input>
          <div className="input-label form ">
            Confirm Password
          </div>
          <input
            required
            className="input-form form"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
          ></input>
          <span className={formError === false ? "display-none" : "text-error"}>
            {message}
          </span>
          <div className="form-btn">
            <button className='signup-btn'>Sign up</button>
          </div>
          <p className='auth-link form'>
            <Link to="/agendas/login"> Already have an account? </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp