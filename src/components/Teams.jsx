import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

const Teams = () => {
  const navigate = useNavigate();
  const { baseURL, token, teams } = useContext(GlobalContext);

  return (
    <div>
      <div className='sidebar-label'>
        Teams
      </div>
      <div>
        {teams.map(team => 
          <div className="team-member light" key={team.id}>{team.name}</div>
        )}
      </div>
    </div>
  )
}

export default Teams