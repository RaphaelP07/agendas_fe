import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useEffect } from "react";
import Nav from "./Nav";

const OrgPrompt = ({ setAlert }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('agendasToken') === null) {
      navigate('/agendas/login')
      setAlert("You have to login before continuing")
    }
  }, [])

  return (
    <div className='container'>
      <Nav />
      <div className="main-container">
        <h1 className='text-center'>Be part of an organisation:</h1>
        <br />
        <button className='org-prompt-btn'>CREATE ORGANISATION</button>
        <button className='org-prompt-btn'>JOIN ORGANISATION</button>
      </div>
    </div>
  )
}

export default OrgPrompt