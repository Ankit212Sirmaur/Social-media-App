import './App.css';
import Login from './pages/login/Login';
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup';
import Home from './pages/homepages/Home';
import RequireLogin from './middleware/RequireLogin';
import Profile from './components/MyProfile/Myprofile';
import Feed from './components/feed/Feed';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

function App() {

  const isLoading = useSelector(state => state.appConfigReducer.isLoading);
  const loadingref = useRef(null);
  useEffect(() => {
    if(isLoading){
      loadingref.current?.continuousStart();
    }else {
      loadingref.current?.complete();
    }
  }, [isLoading])
  return (
    <div className="app">
      <LoadingBar color='#000' ref={loadingref} />
      <Routes>
        <Route element={<RequireLogin />}>
          <Route element={<Home />} >
            <Route path='/' element={<Feed />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/updateProfile' element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App;
