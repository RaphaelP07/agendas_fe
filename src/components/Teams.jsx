import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import ViewItem from "./ViewItem";
import axios from "axios";


const Teams = () => {
  const navigate = useNavigate();
  const { baseURL, token, teams } = useContext(GlobalContext);
  const [showTeam, setShowTeam] = useState(false)
  const [showTeams, setShowTeams] = useState(false)
  const [viewTeam, setViewTeam] = useState({})

  const setShowMember = () => {
    return
  }
  
  const setShowMeeting = () => {
    return
  }

  return (
    <div>
      {showTeam && 
        <ViewItem 
          setShowTeam={(set) => setShowTeam(set)}
          setShowMember={(set) => setShowMember(set)}
          setShowMeeting={(set) => setShowMeeting(set)}
          viewTeam={viewTeam} />
      }
      <div className="label-container">
        <div className='sidebar-label disable-highlight'>
          Teams
        </div>
        <FontAwesomeIcon
            icon={faCaretDown}
            className={`floating-icon ${!showTeams && "rotate"}`}
            onClick={() => setShowTeams(!showTeams)}
          />
        <FontAwesomeIcon icon={faPlus} className="floating-icon"/>
      </div>
      <div>
        {showTeams && teams.map(team => 
          <div 
            className="team-member disable-highlight light" 
            key={team.id}
            onClick={() => setShowTeam(true)}
            onMouseUp={() => setViewTeam(team)}
          >
            {team.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default Teams