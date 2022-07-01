import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

const Teams = ({ teams }) => {
  const navigate = useNavigate();
  const { baseURL, token } = useContext(GlobalContext);

  return (
    <div>
      Teams
      <div>
        {teams.map(team => 
          <div className="team light">{team.name}</div>
        )}
      </div>
    </div>
  )
}

export default Teams