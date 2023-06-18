import React from "react";
import "./homepage.css";
import Pokemons from "../pokemon_list/pokemons";
import logo from "../image/pokemon-logo.png";
import { useNavigate } from "react-router-dom";

const Homepage = ({ user, setLoginUser }) => {
  // here user give the email of user and send it to database with pokemonid
  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/dashboard");
  };
  return (
    <div className="homepage-container">
      <div className="homepage">
        <img
          className=" d-block mx-auto"
          src={logo}
          alt="pokelogo"
          height="200px"
          width="300px"
        ></img>
        <div className="Header d-sm-flex mx-auto">
          <h1 className="heading text-white text-center text-sm-start ps-sm-2 ">
            List of Pokémon
          </h1>
          <div className="btn d-block m-auto me-sm-1">
            <div className="btn btn-primary " onClick={() => setLoginUser({})}>
              {" "}
              Logout
            </div>
            <div className="btn btn-primary mx-3" onClick={() => handleclick()}>
              {" "}
              Dashboard
            </div>
          </div>
        </div>
        <Pokemons user={user} />
      </div>
    </div>
  );
};

export default Homepage;
