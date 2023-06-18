import React from "react";
import "./card.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = (props) => {
  const [pokemonData, setPokemonData] = useState({});
  const [hp, setHP] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      await axios.get(`${props.namesAndUrl.url}`).then((res) => {
        console.log(res.data);
        setPokemonData(res.data);
        setHP(res.data.stats[0].base_stat);
      });
    };
    fetch();
  }, []);

  return (
    <div className="card flex-grow-1">
      <div className=" d-flex  flex-wrap">
        <p>{props.index + 1}.</p>
        <h1 className="name"> {props.namesAndUrl.name}</h1>
      </div>
      <div>
        <img className="pokemonImg" src={props.imgUrl} alt="pokemonPhoto"></img>
      </div>

      <div className="details">
        <p>Name: {pokemonData.name}</p>
        <p>Health Status (HP) :{hp}</p>
        <p>Height : {pokemonData.height}</p>
        <p>Weight : {pokemonData.weight}</p>
        <p>Id : {pokemonData.id}</p>
      </div>
    </div>
  );
};

export default Card;
