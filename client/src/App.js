import './App.css';
import Login from './pages/login/Login';
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup';
import Home from './pages/homepages/Home';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element= {<Home/>} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element= {<Signup/>} />
      </Routes>
    </div>
  )
}

export default App;
