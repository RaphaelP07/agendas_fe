import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Organisation from "./Organisation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Dashboard = ({ setAlert }) => {
  const navigate = useNavigate();
  const { baseURL, token, setOrgs, setOrg } = useContext(GlobalContext);
  const [organisations, setOrganisations] = useState([])

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
    setOrg(org)
    navigate(`/agendas/organisations/${org.id}`)
    localStorage.setItem('agendasOrganisation', JSON.stringify(org))
  }

  return (
    <div className='container'>
      <Nav />
      <div className="dashboard-container nav-offset">
        {window.location.pathname === '/agendas/organisations' ? 
          <div>
            <h2>Select an organisation</h2>
            <div className='organisations-container'>
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
              <div className="org-select-container" onClick={() => navigate('/agendas/org-prompt')}>
                <div className="add-org">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
            </div>
          </div>
        : <Organisation />
        }
      </div>
    </div>
  )
}

export default Dashboard