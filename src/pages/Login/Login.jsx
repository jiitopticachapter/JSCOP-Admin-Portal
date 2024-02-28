import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post("https://opticabackend.onrender.com/user/login", {
      username: username,
      password: password,
    });
    console.log(response)
  };

  return (
    <div className="loginlogin-page">
      <div className="loginform">
        <form className="loginlogin-form">
          <input
            onChange={handleChangeUsername}
            type="text"
            placeholder="username"
            value={username}
          />
          <input
            onChange={handleChangePassword}
            type="password"
            placeholder="password"
            value={password}
          />
          <button onClick={handleLogin}>login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
