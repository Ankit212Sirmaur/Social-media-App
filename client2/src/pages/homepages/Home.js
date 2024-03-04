import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/navBar/NavBar'

function Home() {
  return (
    <>
      <NavBar/>
      <div className="outlet" style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Home 