import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import ViewItem from "./ViewItem";
import Form from "./Form";


const Teams = () => {
  const navigate = useNavigate();
  const { baseURL, token, teams } = useContext(GlobalContext);
  const [showTeam, setShowTeam] = useState(false)
  const [showTeams, setShowTeams] = useState(false)
  const [viewTeam, setViewTeam] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState("")

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
          setShowForm={(set) => setShowForm(set)}
          setFormType={(set) => setFormType(set)}
          showForm={showForm}
          formType={formType}
          viewTeam={viewTeam} />
      }

      {showForm && 
        <Form 
          setShowForm={(set) => setShowForm(set)}
          setFormType={(set) => setFormType(set)}
          formType={formType} />
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
        <FontAwesomeIcon 
            icon={faPlus} 
            className="floating-icon"
            onClick={() => setShowForm(!showForm)}
            onMouseUp={() => setFormType("CREATE TEAM")}
          />
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