import React from 'react'
import './MyProfile.scss'
import Post from '../Post/Post'
import user from '../../assests/user.png'
import { useNavigate } from 'react-router-dom'
import UpdateProfile from '../updateProfile/UpdateProfile'

function Myprofile() {

  const navigate = useNavigate();

  return (
    <div className='profile'>
      <div className="container">
        <div className="left-part">
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img src={user} alt="" className="user-img" />
            <h3 className="user-name">Ankit</h3>
            <div className="follower-info">
              <h4>40 followers</h4>
              <h4>50 following</h4>
            </div>
            <button className="follow btn-primary">follow</button>
            <button className="update-profile btn-secondary" onClick={() => {navigate('/UpdateProfile')}}>Update profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Myprofile