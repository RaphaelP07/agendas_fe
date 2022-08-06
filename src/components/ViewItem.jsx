import React from 'react'
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ViewItem = ({ setShowMember, setShowTeam, setShowMeeting, user, viewTeam, viewMeeting }) => {
  const navigate = useNavigate();
  const view =
    user === undefined && viewMeeting === undefined ? viewTeam : 
    user === undefined && viewTeam === undefined ? viewMeeting : user
  const { baseURL, token, organisation } = useContext(GlobalContext);
  const [teamMembers, setTeamMembers] = useState([])
  const [meetingParticipants, setMeetingParticipants] = useState([])

  useEffect(() => {
    if (view === viewTeam) {
      axios({
        method: "get",
        url: `${baseURL}/organisations/${organisation.id}/teams/${view.id}/members`,
        headers: token
      }).then((res) => {
        setTeamMembers(res.data)
      }).catch((error) => {
        console.log('get team members', error)
      });
    } else if (view === viewMeeting) {
      axios({
        method: "get",
        url: `${baseURL}/organisations/${organisation.id}/meetings/${view.id}/participants`,
        headers: token
      }).then((res) => {
        setMeetingParticipants(res.data.users)
      }).catch((error) => {
        console.log('get participants', error)
      });
    }
  }, [])

  const close = () => {
    setShowMember(false)
    setShowTeam(false)
    setShowMeeting(false)
  }

  const goToMeeting = (link) => {
    navigate(link)
  }

  return (
    <div>
      <div className="prompt-bg" onClick={() => close()}></div>
      <div className='show-container'>
        <FontAwesomeIcon
          icon={faX}
          onClick={() => close()}
          className='x'
        />
        <br />
        <br />
        {user === undefined && viewMeeting ===undefined ?
          <div className='info'>
            <div>team: <p className='light'>{view.name}</p> </div>
            <br />
            <div>members: 
              {teamMembers.map(member => <p key={member.id} className='light'>
              {member.first_name} {member.last_name}
              </p>)}
            </div>
          </div>
        : viewTeam === undefined && user === undefined ?
          <div className='info'>
            <div>agenda: <p className='light'>{view.name}</p> </div>
            <br />
            <div>link:
            <a target="_blank" href={view.url}>{view.url}</a>
            </div>
            <br />
            <div>notes: <p className='light'>{view.notes}</p> </div>
            <br />
            <div>participants: 
              {meetingParticipants.map(member => <p key={member.id} className='light'>
              {member.first_name} {member.last_name}
              </p>)}
            </div>
          </div>
        : <div className='info'>
            <div>name: <p className='light'>{view.first_name} {view.last_name}</p> </div>
            <br />
            <div>email: <p className='light'>{view.email}</p></div>
          </div>
        }
      </div>
    </div>
  )
}

export default ViewItem