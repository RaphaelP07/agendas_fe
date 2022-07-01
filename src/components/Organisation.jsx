import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Organisation = ({ setAlert }) => {
  const navigate = useNavigate();
  const { baseURL, token, setOrg, setTeams, setMembers, setMeetings, organisation, meetings, members } = useContext(GlobalContext);

  const getOrgContents = (org) => {
    axios({
      method: "get",
      url: `${baseURL}/organisations/${org.id}/meetings`,
      headers: token
    }).then((res) => {
      setMeetings(res.data)
    }).catch((error) => {
      console.log('get meetings', error)
    });

    axios({
      method: "get",
      url: `${baseURL}/organisations/${org.id}/teams`,
      headers: token
    }).then((res) => {
      setTeams(res.data)
    }).catch((error) => {
      console.log('get teams', error)
    });

    axios({
      method: "get",
      url: `${baseURL}/organisations/${org.id}/members`,
      headers: token
    }).then((res) => {
      setMembers(res.data)
    }).catch((error) => {
      console.log('get members', error)
    });
  }
  
  useEffect(() => {
    if (localStorage.getItem('agendasToken') === null) {
      navigate('/agendas/login')
      setAlert("You have to login before continuing")
      return
    }
    
    if (Object.keys(organisation).length === 0) {
      axios({
        method: "get",
        url: `${baseURL}/organisations/${window.location.pathname.slice(-2)}`,
        headers: token
      }).then((res) => {
        setOrg(res.data)
        getOrgContents(res.data)
      }).catch((error) => {
        console.log('get org', error)
        navigate("/agendas/org-prompt")
      });
    } else

    getOrgContents(organisation)

  }, [])

  const goToMeeting = () => {
    return
  }

  const admin = members === null ? '' :
    members.filter((member) => {
      return member.id === organisation.admin_id
    }
  );

  console.log()

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className='dashboard-right organisation'>
        <div className="organisation-action">
          <h3>
            {organisation.name}
          </h3>
          <p className='light'>
            {organisation.city_address}
          </p>
          <p className='light'>
            admin: {admin.length === 0 ? '' : `${admin[0].first_name} ${admin[0].last_name}`}
          </p>
          <p className='light'>
            created on: {Object.keys(organisation).length === 0 ? '' : organisation.created_at.slice(0, 10)}
          </p>
          {JSON.parse(localStorage.getItem('agendasLoggedUser')).id === organisation.admin_id ?
          <div className="org-action-buttons">
            <button className='auth-btn org-action-btn'>Edit</button>
            <button className='auth-btn logout-btn org-action-btn'>Delete</button>
          </div> : ''}
        </div>
        <div className='meetings-container'>
          <h4>Meetings</h4>
          <table className='wallet-container'>
            <thead>
              <tr className='top-row'>
                <th>MEETING</th>
                <th>SCHEDULE</th>
                <th>SYNCHRONICITY</th>
              </tr>
            </thead>
            <tbody>
              {meetings === [] ? 
              <tr>
                <th colSpan={2}>
                  No meetings to show 
                </th>
              </tr> : 
              meetings.map(meeting => 
                <tr className='row' onClick={() => goToMeeting(meeting.id)} key={meeting.id} >
                  <th className='light'>
                    {meeting.name}
                  </th>
                  <th className='light'>
                    {meeting.schedule.slice(0, 10)},{" "}
                    {meeting.schedule.slice(11, 16)}
                  </th>
                  <th className='light'>
                    {meeting.synchronicity}
                  </th>
                </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Organisation