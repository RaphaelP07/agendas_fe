import React from 'react'
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import ViewItem from "./ViewItem";
import Form from "./Form";

const Members = () => {
  const { members, setMember } = useContext(GlobalContext);
  const [show, setShow] = useState(false)
  const [view, setView] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState("")

  const showMember = (member) => {
    setMember(member)
    setView('SHOW MEMBER')
    setShow(!show)
  }

  return (
    <div>
      {show && 
        <ViewItem 
          setShow={(set) => setShow(set)} 
          view={view} />
      }
      {showForm && 
        <Form 
          setShowForm={(set) => setShowForm(set)}
          setFormType={(set) => setFormType(set)}
          formType={formType} />
      }
      <div className="label-container">
        <div className='sidebar-label disable-highlight'>
          Members
        </div>
        <FontAwesomeIcon
            icon={faCaretDown}
            className={`floating-icon ${!showMembers && "rotate"}`}
            onClick={() => setShowMembers(!showMembers)}
          />
        <FontAwesomeIcon 
          icon={faPlus} 
          className="floating-icon"
          onClick={() => setShowForm(!showForm)}
          onMouseUp={() => setFormType("INVITE MEMBER")}
        />
      </div>
      <div>
        {showMembers && members.map(member => 
          <div 
            className="team-member disable-highlight light" 
            onClick={() => showMember(member)}
            key={member.id}
          >
            {member.first_name} {member.last_name} {JSON.parse(localStorage.getItem('agendasLoggedUser')).id === member.id ? "(me)" : ''}
          </div>
        )}
      </div>
    </div>
  )
}

export default Members