import React from 'react'
import Avatar from '../Avatar/Avatar'
import './follower.scss'

function Follower() {
  return (
    <div className='Follower'>
        <div className="user-info">
        <Avatar/>
        <div className="name">Ankit</div>
        </div>
        <div className="follow-link hover-link">Follow</div> 
    </div>
  )
}

export default Follower