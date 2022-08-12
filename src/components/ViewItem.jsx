import React from 'react'
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";
import axios from "axios";

const ViewItem = ({ 
  setShow,
  showForm,
  setShowForm,
  formType,
  setFormType,
  view
}) => {
  const { 
          baseURL,
          token,
          organisation,
          member,
          team,
          meeting
        } = useContext(GlobalContext);
  const [teamMembers, setTeamMembers] = useState([])
  const [meetingParticipants, setMeetingParticipants] = useState([])
  const [teamName, setTeamName] = useState("")

  useEffect(() => {
    switch (view) {
      case "SHOW TEAM":
        axios({
          method: "get",
          url: `${baseURL}/organisations/${organisation.id}/teams/${team.id}/members`,
          headers: token
        }).then((res) => {
          setTeamMembers(res.data)
        }).catch((error) => {
          console.log('get team members', error)
        });
        break
      case "SHOW MEETING":
        axios({
          method: "get",
          url: `${baseURL}/organisations/${organisation.id}/meetings/${meeting.id}/participants`,
          headers: token
        }).then((res) => {
          setMeetingParticipants(res.data.users)
        }).catch((error) => {
          console.log('get participants', error)
        });
        break
      case "SHOW MEMBER":
        break
    }
  }, [])

  const editForm = (name) => {
    setShowForm(true)
    setFormType('EDIT TEAM')
    setTeamName(name)
  }

  const close = () => {
    setShow(false)
  }

  return (
    <div>
      <div className="prompt-bg" onClick={() => close()}></div>
      {showForm && 
        <Form 
          setShowForm={(set) => setShowForm(set)}
          formType={formType}
          teamName={teamName} />
      }
      <div className='show-container'>
        <FontAwesomeIcon
          icon={faX}
          onClick={() => close()}
          className='x'
        />
        <br />
        <br />
        {view === "SHOW TEAM" ?
          <div className='info'>
            <div>team: <p className='light'>{team.name}</p> </div>
            <br />
            <div>members: 
              {teamMembers.map(member => <p key={member.id} className='light'>
              {member.first_name} {member.last_name}
              </p>)}
            </div>
            <div className="org-action-buttons">
              <button className='auth-btn org-action-btn' onClick={() => editForm(team.name)}>
                Edit
              </button>
              <button className='auth-btn logout-btn org-action-btn'>
                Delete
              </button>
            </div> 
          </div>
        : view === "SHOW MEETING" ?
          <div className='info'>
            <div>agenda: <p className='light'>{meeting.name}</p> </div>
            <br />
            <div>link:
            <a target="_blank" href={meeting.url}>{meeting.url}</a>
            </div>
            <br />
            <div>notes: <p className='light'>{meeting.notes}</p> </div>
            <br />
            <div>participants: 
              {meetingParticipants.map(member => <p key={member.id} className='light'>
              {member.first_name} {member.last_name}
              </p>)}
            </div>
          </div>
        : <div className='info'>
            <div>name: <p className='light'>{member.first_name} {member.last_name}</p> </div>
            <br />
            <div>email: <p className='light'>{member.email}</p></div>
          </div>
        }
      </div>
    </div>
  )
}

export default ViewItem