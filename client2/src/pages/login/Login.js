import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosclient } from "../../utils/axiosClient";
import { Key_Access_Token, setItem } from "../../utils/localStorageManager";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosclient.post("/auth/login", {
        email,
        password,
      });
      setItem(Key_Access_Token, result.accesstoken);
      navigate('/')
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="email">email</label> */}
          <input
            type="text"
            id="email"
            className="email"
            placeholder="Email"
            onChange={(e) => setemail(e.target.value)}
          />

          {/* <label htmlFor="password">password</label> */}
          <input
            type="password"
            id="password"
            className="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>
        <hr />
        <p className="subHeading">
          Do not have an account? <Link to="/Signup">Signup</Link>{" "}
          {/* Do not have an account? <span onClick={(e) => navigate('/Signup')}>Signup</span> */}
        </p>
      </div>
    </div>
  );
}

export default Login;
