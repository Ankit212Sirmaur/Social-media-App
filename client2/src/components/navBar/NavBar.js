import React, { useRef, useState } from 'react'
import './navBar.scss'
import Avatar from '../Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";
import LoadingBar from 'react-top-loading-bar'
function NavBar() {

  const navigate = useNavigate();
  const Loadingref = useRef();

  const[loading, setLoading] = useState(false);

  function toogleLoadingBar(){
    if(loading){
      setLoading(false);
      Loadingref.current.complete();
    }else {
      setLoading(true);
      Loadingref.current.continuousStart(); 
    }
  }

  return (
    <div className="Navbar">
      <LoadingBar  height = {4} color='#5f9fff' ref={Loadingref} />
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate('/')}>Social Media</h2>
        <div className="right-side">
          <div className="profile hover-link" onClick={() => navigate('/profile/userx')}>
            <Avatar />
          </div>
          <div className="logout hover-link" onClick={toogleLoadingBar}>
            <LuLogOut />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar