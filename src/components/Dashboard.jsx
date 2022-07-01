import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Organisation from "./Organisation";
import Sidebar from "./Sidebar";


const Dashboard = ({ setAlert }) => {
  const navigate = useNavigate();
  const { baseURL, token, setOrgs } = useContext(GlobalContext);
  const [organisations, setOrganisations] = useState([])
  const [organisation, setOrganisation] = useState([])
  const [meetings, setMeetings] = useState([])
  const [teams, setTeams] = useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
    if (localStorage.getItem('agendasToken') === null) {
      navigate('/agendas/login')
      setAlert("You have to login before continuing")
      return
    }

    axios({
      method: "get",
      url: `${baseURL}/organisations`,
      headers: token
    }).then((res) => {
      setOrganisations(res.data)
      setOrgs(res.data)
    }).catch((error) => {
      navigate("/agendas/org-prompt")
    });
    
  }, [])

  const goToOrg = (org) => {
    setOrganisation(org)
    navigate(`/agendas/organisations/${org.id}`)
  }

  return (
    <div className='container'>
      <Nav />
      <div className="dashboard-container nav-offset">
        <Sidebar 
          organisation={organisation}
          teams={teams}
          members={members}
        />
        {window.location.pathname === '/agendas/organisations' ? 
          <div className="dashboard-right">
            <div className='organisations-container'>
              <h2>Select an organisation</h2>
              <br />
              {organisations.map(org => 
                <div className="org-select-container" key={org.id} onClick={() => goToOrg(org)}>
                  <h4>
                    {org.name}
                  </h4>
                  <p>
                    {org.city_address}
                  </p>
                </div>
              )}
              </div>
            </div>
        : <Organisation 
          organisation={organisation}
          meetings={meetings}
          />
        }
      </div>
    </div>
  )
}

export default Dashboard