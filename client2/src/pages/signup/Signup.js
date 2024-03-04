import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './signup.scss'
import { axiosclient } from '../../utils/axiosClient';

function Signup() {
  const[name, setName] = useState('');
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosclient.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
    return <div className="Signup">
    <div className="signup-box">
      <h2 className="heading">Sign up</h2>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="email">email</label> */}
        <input type="text" id='name' className='name' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        <input type="text" id='email' className='email' placeholder='Email' onChange={(e) => setemail(e.target.value)}/>
        <input type="password" id='password' className='password' placeholder='Password'onChange={(e) => setpassword(e.target.value)} />
        {/* <input type="password" id='password' className='Confirm-password' placeholder='Confirm Password' /> */}
        <input type="submit" className='submit' />
        <hr /> 
        <p className='subHeading'> Already Have a account? <Link to = '/Login' >Login</Link> </p>
      </form>
    </div>
  </div>
}

export default Signup