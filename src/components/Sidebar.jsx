import React from 'react'
import Members from "./Members";
import Teams from "./Teams";

const Sidebar = () => {
  return (
    <div className='side-bar'>
      <Teams />
      <Members />
    </div>
  )
}

export default Sidebar