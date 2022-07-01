import React from 'react'
import Nav from "./Nav";

const OrgPrompt = () => {
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