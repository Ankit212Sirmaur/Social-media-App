import React from 'react'
import { Key_Access_Token, getItem } from '../utils/localStorageManager'
import { Navigate, Outlet } from 'react-router-dom';

function RequireLogin() {
    const user = getItem(Key_Access_Token);
  return (
    user ? <Outlet/> : <Navigate to = '/login'/>
  )
}

export default RequireLogin