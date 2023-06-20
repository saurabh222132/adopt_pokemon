import React from "react";
import "./card.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

//details function

const Property = ({ head, body }) => {
  return (
    <Row className="row p-0 m-0">
      <Col xs={4} className="heading p-0">
        <b>{head} </b>
      </Col>
      <Col xs={8}>: {body}</Col>
    </Row>
  );
};

const Card = (props) => {
  const [pokemonData, setPokemonData] = useState({});
  // const [hp, setHP] = useState(0);
  const [type1, settype1] = useState("");

  const [isAdopted, setIsAdopted] = useState(true);

  //fetch the details of every pokemon
  useEffect(() => {
    const fetch = async () => {
      //fetching stored pokemons in database

      await axios.get(`${props.namesAndUrl.url}`).then((res) => {
        setPokemonData(res.data);
        // setHP(res.data.stats[0].base_stat);
        settype1(res.data.types[0].type.name);
      });
    };
    fetch();
  }, [props.namesAndUrl.url]);

  // storing adopted pokemon and their hp and email in database

  const handleAdopt = (data) => {
    const main = async () => {
      await axios.post("http://localhost:4000/storedata", data).then((res) => {
        alert(res.data.message);
      });
      setIsAdopted(false);
    };
    main();
  };

  return (
    <div className="card flex-grow-1">
      <div className="d-flex  flex-wrap">
        <p>{props.index + 1}.</p>
        <h1 className="name"> {props.namesAndUrl.name}</h1>
      </div>
      <div>
        <img className="pokemonImg" src={props.imgUrl} alt="pokemonPhoto"></img>
      </div>
      {/* Details of the pokemons */}
      <div className="details">
        {/* <Row className="row p-0 m-0">
          <Col className="heading p-0">
            <b>Name</b>
          </Col>
          <Col xs={8}>: {pokemonData.name}</Col>
        </Row> */}
        <Property head={"Name"} body={pokemonData.name} />
        <Property head={"Health"} body={100} />
        <Property head={"Height"} body={pokemonData.height} />

        <Property head={"Weight"} body={pokemonData.weight} />
        <Property head={"Id"} body={pokemonData.id} />
        <Property head={"Type"} body={type1} />
      </div>
      {isAdopted ? (
        <button
          className={`btn btn-primary diabled`}
          onClick={() =>
            handleAdopt({
              name: pokemonData.name,
              email: props.user.email,
              id: pokemonData.id,
              health: 100,
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
