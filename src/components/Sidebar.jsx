import React from 'react'
import Members from "./Members";
import Teams from "./Teams";

const Sidebar = () => {
  return (
    <div className='side-bar'>
      <div className="sidebar-offset"></div>
      <div>
        <Teams />
        <Members />
      </div>
    </div>
  )
}

export default Sidebar