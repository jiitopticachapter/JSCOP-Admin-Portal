import React, { useState } from "react";
import "./Login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    // const response = await axios.post(url, {
    //   username: username,
    //   password: password,
    // });
    // if (response.data.logged) {
    //   props.setLoggedIn(true);
    //   window.location.url();
    // }
  };

  return (
    <div class="loginlogin-page">
      <div class="loginform">
        <form class="loginlogin-form">
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
