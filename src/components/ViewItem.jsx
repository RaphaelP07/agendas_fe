import React from 'react'
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ViewItem = ({ setShowMember, setShowTeam, user, viewTeam }) => {
  const view = user === undefined ? viewTeam : user 
  const { baseURL, token, organisation } = useContext(GlobalContext);
  const [teamMembers, setTeamMembers] = useState([])


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
    }
  }, [])

  return (
    <div className='show-container'>
      <FontAwesomeIcon
        icon={faX}
        onClick={() => setShowMember(false)}
        onMouseUp={() => setShowTeam(false)}
        className='x'
      />
      <br />
      <br />
      {user === undefined ?
        <div className='info'>
          <div>team: <p className='light'>{view.name}</p> </div>
          <br />
          <div>members: 
            {teamMembers.map(member => <p className='light'>
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
  )
}

export default ViewItem