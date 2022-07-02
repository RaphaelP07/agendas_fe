import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Meeting = () => {
  const [videos, setVideos] = useState([])
  const [participants, setParticipants] = useState([])
  const { baseURL, token, setMeetings } = useContext(GlobalContext);
  const organisation = JSON.parse(localStorage.getItem('agendasOrganisation'))
  
  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/organisations/${organisation.id}/meetings/${window.location.pathname.slice(-2)}/videos`,
      headers: token
    }).then((res) => {
      setVideos(res.data)
    }).catch((error) => {
      console.log('get meetings', error)
    });
    
    axios({
      method: "get",
      url: `${baseURL}/organisations/${organisation.id}/meetings/${window.location.pathname.slice(-2)}/participants`,
      headers: token
    }).then((res) => {
      setParticipants(res.data.users)
    }).catch((error) => {
      console.log('get meetings', error)
    });
  }, [])

  // const uploader = (id) => {
  //   if (participants.length !== 0) {
  //     const uploader = participants.filter(participant => 
  //       participant.id === id
  //     )
  //     `${uploader[0].first_name} ${uploader[0].last_name}`
  //   }
  // }
  
  return (
    <div>
      <Nav />
      <div className="async-container">
        <h3>Participant uploads </h3>
        <div className="videos-container">
          {videos.map(video =>
            <div className='participant-container' key={video.id}>
              <div className='label-container'>
                {/* uploaded by: {participants.length === 0 ? '' : uploader(video.user_id)} */}
              </div>
              <iframe className='video-container' src={video.embed_url} width="100%" height="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
            </div>
          )}
          <div className="participant-container">
            <div className="video-container">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Meeting