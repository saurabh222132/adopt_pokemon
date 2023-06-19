import axios from "axios";
import React from "react";
import { useState } from "react";

import "./dashBoardCard.css";

const DashBoardCard = ({ index, value }) => {
  var [hp, sethp] = useState(value.health);

  const handleFeed = () => {
    const fetch = async () => {
      await axios
        .post("http://localhost:4000/feed", { id: value.pokemonid })
        .then((res) => {
          console.log("Health status increased ");
          console.log(res.data);
        });
    };
    fetch();
    if (hp < 100) sethp(hp + 10);
  };

  return (
    <div className="card-container mb-2 ">
      <div className="value d-sm-flex justify-content-evenly  text-center">
        <p className="my-auto">{index}.</p>

        <p className="my-auto  text-center">{value.name}</p>

        <p className="hp my-auto">
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
        </p>

        <button className="btn btn-primary" onClick={() => handleFeed()}>
          {" "}
          Feed{" "}
        </button>
      </div>
    </div>
  );
};

export default DashBoardCard;
