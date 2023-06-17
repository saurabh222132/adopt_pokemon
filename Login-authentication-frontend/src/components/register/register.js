import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const base_url = "https://loginauthentication-ftl7.onrender.com";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(name);
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios
        // .post("https://loginauthentication-ftl7.onrender.com/register", user)
        .post("http://localhost:4000/register", user)
        .then((res) => {
          alert(res.data.message);
          navigate("/login");
        });
    } else {
      alert("invalid input");
    }
  };

  return (
    <div className="register">
      {console.log("User", user)}

      <h1 className="reg">Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="your name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="your Emails"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="your password"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter your password"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div
        className="button"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </div>
    </div>
  );
};

export default Register;
