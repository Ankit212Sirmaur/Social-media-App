import React from 'react'
import { Link } from 'react-router-dom'
import './signup.scss'

function Signup() {
    return <div className="Signup">
    <div className="signup-box">
      <h2 className="heading">Sign up</h2>
      <form>
        {/* <label htmlFor="email">email</label> */}
        <input type="text" id='Name' className='Name' placeholder='Name' />
        <input type="text" id='email' className='email' placeholder='Email' />
        <input type="password" id='password' className='password' placeholder='Password' />
        <input type="password" id='password' className='Confirm-password' placeholder='Confirm Password' />
        <input type="submit" className='submit' />
        <hr /> 
        <p className='subHeading'> Already Have a account? <Link to = '/Login' >Login</Link> </p>
      </form>
    </div>
  </div>
}

export default Signup