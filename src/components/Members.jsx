import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

const Members = () => {
  const navigate = useNavigate();
  const { baseURL, token, members } = useContext(GlobalContext);

  return (
    <div>
      <div className='sidebar-label'>
        Members
      </div>
      <div>
        {members.map(member => 
          <div className="team-member  light" key={member.id}>{member.first_name} {member.last_name}</div>
        )}
      </div>
    </div>
  )
}

export default Members