import axios from "axios";
import React from "react";
import { useState } from "react";

import "./dashBoardCard.css";

const DashBoardCard = ({ fetchedData, setdata, index, value }) => {
  var [hp, sethp] = useState(value.health);

  //============Handle feedclick=================
  const handleFeed = () => {
    const fetch = async () => {
      await axios
        .post("https://pokemon-adoption-backend.onrender.com/feed", {
          id: value.pokemonid,
        })
        .then((res) => {
          console.log(res.data);
        });
    };
    fetch();
    if (hp < 100) sethp(hp + 10);
  };
  //============Handle drop================
  //https://pokemon-adoption-backend.onrender.com/drop
  const handleDrop = async () => {
    await axios
      .post("https://pokemon-adoption-backend.onrender.com/drop", {
        pokemonid: value.pokemonid,
      })
      .then((res) => {
        console.log(res.data);
      });

    const myfunc = (object) => {
      return object.pokemonid !== value.pokemonid;
    };
    const newArray = fetchedData.filter(myfunc);

    setdata(newArray);
  };
  return (
    <div className="card-container mb-2 w-100 ">
      <div className="value d-sm-flex justify-content-evenly  text-center">
        <p className="my-auto">{index}.</p>

        <p className="my-auto  text-center">{value.name}</p>

        <div className="hp my-auto">
          Health Status : {hp}
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped"
              role="progressbar"
              style={{ width: `${hp}%` }}
              aria-valuenow={10}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {hp !== 100 ? (
          <button className="btn btn-primary " onClick={() => handleFeed()}>
            Feed
          </button>
        ) : (
          <button
            className="btn btn-secondary "
            onClick={() => handleFeed()}
            disabled
          >
            Full HP
          </button>
        )}
        <button
          className="btn btn-primary "
          onClick={() => {
            handleDrop();
          }}
        >
          Drop Out
        </button>
      </div>
    </div>
  );
};

export default DashBoardCard;
