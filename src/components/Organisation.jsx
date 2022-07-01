import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

const Organisation = ({ organisation, meetings, setAlert }) => {
  const navigate = useNavigate();
  const { baseURL, token } = useContext(GlobalContext);

  useEffect(() => {
    if (localStorage.getItem('agendasToken') === null) {
      navigate('/agendas/login')
      setAlert("You have to login before continuing")
      return
    }
  }, [])

  const goToMeeting = () => {
    return
  }

  return (
    <div className='dashboard-right organisation'>
      <div className="organisation-action">
        <h3>
          {organisation.name}
        </h3>
        <p className='light'>
          {organisation.city_address}
        </p>
      </div>
      <div className='meetings-container'>
        <h4>meetings</h4>
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
              <tr className='row' onClick={() => goToMeeting(meeting.id)} key={meetings.indexOf(meeting)} >
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
  )
}

export default Organisation