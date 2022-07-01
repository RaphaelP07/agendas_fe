import React from 'react'
import Members from "./Members";
import Teams from "./Teams";

const Sidebar = ({ teams, members }) => {
  return (
    <div className='side-bar'>
      <Teams
        teams={teams}
      />
      <Members 
        members={members}
      />
    </div>
  )
}

export default Sidebar