import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./Nav";

const OrgPrompt = ({ setAlert, setOrgAction }) => {
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
        <Link to="/agendas/org-form" onClick={() => setOrgAction('create')}>
          <button className='org-prompt-btn'>CREATE ORGANISATION</button>
        </Link>
        <Link to="/agendas/org-form" onClick={() => setOrgAction('join')}>
          <button className='org-prompt-btn'>JOIN ORGANISATION</button>
        </Link>
      </div>
    </div>
  )
}

export default OrgPrompt