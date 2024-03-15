import React from 'react'
import { Navigate, Outlet } from 'react-router';
import Login from '../pages/login/Login';
import { getItem, KEY_ACCESS_TOKEN } from '../utils/localStorageManager'

function RequireUser() {
    const user = getItem(KEY_ACCESS_TOKEN);
  return (
    user ? <Outlet /> : <Navigate to="/Login"/>
  )
}

export default RequireUser