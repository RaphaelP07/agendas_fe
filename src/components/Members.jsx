import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import ViewItem from "./ViewItem";
import axios from "axios";

const Members = () => {
  const navigate = useNavigate();
  const { baseURL, token, members } = useContext(GlobalContext);
  const [showMember, setShowMember] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  const [user, setUser] = useState({})


  const setShowTeam = () => {
    return
  }
  
  const setShowMeeting = () => {
    return
  }

  return (
    <div>
      {showMember && 
        <ViewItem 
          setShowMember={(set) => setShowMember(set)} 
          setShowTeam={(set) => setShowTeam(set)} 
          setShowMeeting={(set) => setShowMeeting(set)} 

          user={user} />
      }
      <div className="label-container">
        <div className='sidebar-label disable-highlight'>
          Members
        </div>
        <FontAwesomeIcon
            icon={faCaretDown}
            className={`floating-icon ${!showMembers && "rotate"}`}
            onClick={() => setShowMembers(true)}
          />
      </div>
      <div>
        {showMembers && members.map(member => 
          <div 
            className="team-member disable-highlight light" 
            key={member.id}
            onClick={() => setShowMember(!showMember)}
            onMouseUp={() => setUser(member)}
          >
            {member.first_name} {member.last_name} {JSON.parse(localStorage.getItem('agendasLoggedUser')).id === member.id ? "(me)" : ''}
          </div>
        )}
      </div>
    </div>
  )
}

export default Members