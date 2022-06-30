import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const Login = ({ setLoggedUser, setLoggedID }) => {
  const navigate = useNavigate();
  const { baseURL, setToken } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const [message, setMessage] = useState('')

  const onChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseURL}/login`, {
        user: {
          email: email,
          password: password
        }
      })
      .then((res) => {
        const token = {
          authorization: res.headers.authorization
        };
        const id = res.data.data.id;
        setToken(token);
        setLoggedUser(email);
        setLoggedID(id);
        localStorage.setItem("loggedID", id);
        localStorage.setItem("loggedUser", email);
        localStorage.setItem("headers", JSON.stringify(token));
        navigate("/stock-app-fe/wallet");
      })
      .catch((error) => {
        if (error) {
          setFormError(true);
          setMessage(error.response.data)
        }
      });
  };

  return (
    <div className='container'>
      <Nav />
      <form onSubmit={onSubmit} noValidate>
        <div className='form-container'>
          <h1 className='form-title form'>
            Login
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
          <span className={formError === false ? "display-none" : "text-error"}>
            {message}
          </span>
          <div className="form-btn">
            <button className='login-btn'>Login</button>
            <Link to="/stock-app-fe/signup">
              <button className='signup-btn'>Sign up</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login