import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";


const Dashboard = ({ setAlert }) => {
  const navigate = useNavigate();
  const { baseURL, token } = useContext(GlobalContext);
  const [organisations, setOrganisations] = useState([])

  useEffect(() => {
    if (localStorage.getItem('agendasToken') === null) {
      navigate('/agendas/login')
      setAlert("You have to login before continuing")
      return
    }

    axios({
      method: "get",
      url: `${baseURL}/organisations`,
      headers: token
    }).then((res) => {
      setOrganisations(res.data)
    }).catch((error) => {
      navigate("/agendas/org-prompt")
    });
    
  }, [])

  return (
    <div className='container'>
      <Nav />
      Dashboard
    </div>
  )
}

export default Dashboard