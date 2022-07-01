import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

const Members = ({ members }) => {
  const navigate = useNavigate();
  const { baseURL, token } = useContext(GlobalContext);

  return (
    <div>
      Members
      <div>
        {members.map(member => 
          <div className="member light">{member.first_name} {member.last_name}</div>
        )}
      </div>
    </div>
  )
}

export default Members