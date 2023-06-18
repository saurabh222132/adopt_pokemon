// Show the list of avalable pokemons to the user

import React from "react";
import { useState, useEffect } from "react";
import Card from "../pokeCard/Card";
import axios from "axios";

import "./pokemons.css";

const Pokemons = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    console.log("I have been rendersed.");
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=100&limit=70")
      .then((response) => {
        console.log(response.data.results);
        setPokemonList(response.data.results);
      });
  }, []);

  return (
    <div className="pokemonList ">
      {pokemonList.map((value, index) => {
        const imgUrl = `https://unpkg.com/pokeapi-sprites@2.0.4/sprites/pokemon/other/dream-world/${
          index + 101
        }.svg`;

        return (
          <Card
            key={index + 10}
            imgUrl={imgUrl}
            namesAndUrl={value}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default Pokemons;
