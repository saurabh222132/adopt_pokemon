import React from "react";
import "./homepage.css";
import Pokemons from "../pokemon_list/pokemons";

const Homepage = ({ setLoginUser }) => {
  return (
    <div className="homepage-container">
      <div className="homepage">
        <div className="Header d-sm-flex mx-auto">
          <h1 className="heading text-white text-center text-sm-start ps-sm-2 ">
            List of Pokémon
          </h1>
          <div className="btn d-block m-auto me-sm-1">
            <div className="btn btn-primary " onClick={() => setLoginUser({})}>
              {" "}
              Logout
            </div>
            <div className="btn btn-primary mx-3"> Dashboard</div>
          </div>
        </div>
        <Pokemons />
      </div>
    </div>
  );
};

export default Homepage;
