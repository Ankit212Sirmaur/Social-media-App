import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/navBar/NavBar'
import { useDispatch } from 'react-redux';
import { getMyInfo } from '../../redux/Slice/appConfigSlice';
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInfo())
  }, [dispatch])
  return (
      <>
          <NavBar />
          <div className="outlet" style={{ marginTop: "60px" }}>
              <Outlet />
          </div>
      </>
  );
}

export default Home;