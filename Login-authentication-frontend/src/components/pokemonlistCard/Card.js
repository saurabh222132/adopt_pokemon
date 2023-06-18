import React from "react";
import "./card.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = (props) => {
  const [pokemonData, setPokemonData] = useState({});
  const [hp, setHP] = useState(0);
  const [type1, settype1] = useState("");

  const [isAdopted, setIsAdopted] = useState(true);

  //fetch the details of every pokemon
  useEffect(() => {
    const fetch = async () => {
      //fetching stored pokemons in database

      await axios.get(`${props.namesAndUrl.url}`).then((res) => {
        setPokemonData(res.data);
        setHP(res.data.stats[0].base_stat);
        settype1(res.data.types[0].type.name);
      });
    };
    fetch();
  }, [props.namesAndUrl.url]);

  // storing adopted pokemon and their hp and email in database

  const handleAdopt = (data) => {
    const main = async () => {
      await axios.post("http://localhost:4000/storedata", data).then((res) => {
        console.log(res.data.message);
      });
      setIsAdopted(false);
    };
    main();
  };

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
        <p>Type: {type1}</p>
      </div>
      {isAdopted ? (
        <button
          className={`btn btn-primary diabled`}
          onClick={() =>
            handleAdopt({
              email: props.user.email,
              id: pokemonData.id,
              health: hp,
            })
          }
        >
          Adopt
        </button>
      ) : (
        <button className={`btn btn-primary diabled`} disabled>
          Adopted
        </button>
      )}
    </div>
  );
};

export default Card;
