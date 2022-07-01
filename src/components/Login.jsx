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

  useEffect(() => {
    if (localStorage.getItem('agendasToken') !== null) {
      navigate("/agendas/dashboard")
    }
  }, [])
  

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
        api_v1_user: {
          email: email,
          password: password
        }
      })
      .then((res) => {
        const token = {
          authorization: res.headers.authorization
        };
        const id = res.data.data.user.id;
        setToken(token);
        setLoggedUser(email);
        setLoggedID(id);
        localStorage.setItem("agendasLoggedID", id);
        localStorage.setItem("agendasLoggedUser", email);
        localStorage.setItem("agendasToken", JSON.stringify(token));
        if (res.data.data.user.first_name === null && res.data.data.user.last_name === null) {
          navigate("/agendas/name-prompt");
        } else if (res.data.data.is_in_org === false) {
          navigate("/agendas/org-prompt");
        } else {
          navigate("/agendas/organisations")
        }
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
      <div className='auth-container'>
        <div className='slogan'>
          <h1>Agendas</h1>
          <br />
          <p>Meet whenever and wherever</p>
          <br />
          <br />
          <div className='filler'></div>
        </div>
        <div className='line'></div>
        <form className='form-right' onSubmit={onSubmit} noValidate>
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
              <Link to="/agendas/signup">
                <button className='signup-btn'>Sign up</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login