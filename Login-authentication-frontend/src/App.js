import "./App.css";
import Homepage from "./components/homepage/homepage"; // import Homepage
import Login from "./components/login/login";
import Register from "./components/register/register";
import Dashboard from "./components/Userdashboard/dashboard";

import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // this line is used to go on  different different pages

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Homepage user={user} setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          >
            {" "}
          </Route>
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />}>
            {" "}
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/dashboard"
            element={
              user && user._id ? (
                <Dashboard user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
