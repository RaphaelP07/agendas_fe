import React from 'react'
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import ViewItem from "./ViewItem";
import Form from "./Form";


const Teams = () => {
  const { teams, setTeam } = useContext(GlobalContext);
  const [show, setShow] = useState(false)
  const [showTeams, setShowTeams] = useState(false)
  const [view, setView] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState("")

  const showTeam = (team) => {
    setView('SHOW TEAM')
    setShow(true)
    setTeam(team)
  }

  return (
    <div>
      {show && 
        <ViewItem 
          setShowForm={(set) => setShowForm(set)}
          setFormType={(set) => setFormType(set)}
          setShow={(set) => setShow(set)}
          showForm={showForm}
          view={view}
          formType={formType} />
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
            onClick={() => showTeam(team)}
          >
            {team.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default Teams