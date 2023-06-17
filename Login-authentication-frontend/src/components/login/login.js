import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.png";
const Login = ({ setLoginUser }) => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios

      // .post("https://loginauthentication-ftl7.onrender.com/login", user)
      .post("http://localhost:4000/login", user)
      .then((res) => {
        alert(res.data.message);
        setLoginUser(res.data.user);
        navigate("/");
      });
  };

  return (
    <div className="login-main">
      <h1 className="poke">Adopt Pokemons </h1>
      <div className="login">
        <h1>Login</h1>
        <img className="logo" src={logo} width="90px" alt="logo"></img>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your Emails"
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter you password"
        ></input>
        <div className="button" onClick={login}>
          Login
        </div>
        <div>or</div>
        <div className="button" onClick={() => navigate("/register")}>
          {" "}
          Register{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
