import React from 'react'
import './navBar.scss'
import Avatar from '../Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/Slice/appConfigSlice';

function NavBar() {

  const navigate = useNavigate();

  const myProfile = useSelector(state => state.appConfigReducer.myProfile)

  console.log('myProfile', myProfile);

  function handleLogoutClicked(){
    
  }


  return (
    <div className="Navbar">
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate('/')}>Social Media</h2>
        <div className="right-side">
          <div className="profile hover-link" onClick={() => navigate(`/profile/${myProfile?._id}`)}>
            {/* <Avatar /> */}
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogoutClicked}>
            <LuLogOut />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar