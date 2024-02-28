import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { axiosclient } from "../../utils/axiosClient";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(email, password);
    const result = await axiosclient.post("/auth/login", {
      email,
      password,
    });
    console.log(result);
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
        </p>
      </div>
    </div>
  );
}

export default Login;
