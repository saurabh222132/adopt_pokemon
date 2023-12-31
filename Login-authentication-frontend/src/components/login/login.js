import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.png";
import AppDetails from "./projectDetails/projectdetails";

const Login = ({ setLoginUser }) => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
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
      //.post("http://localhost:4000/login", user)
      .post("https://pokemon-adoption-backend.onrender.com/login", user)
      .then((res) => {
        alert(res.data.message);
        setLoginUser(res.data.user);
        navigate("/");
      });
  };

  return (
    <div className="login-main">
      <h1 className="poke">Adopt Pokemons </h1>
      <div className="login mb-2">
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
          Register
        </div>
      </div>

      {/* About the project Details */}

      <AppDetails />
    </div>
  );
};

export default Login;
