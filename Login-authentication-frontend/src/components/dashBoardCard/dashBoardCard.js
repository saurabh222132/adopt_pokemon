import React from "react";

import "./dashBoardCard.css";

const DashBoardCard = ({ index, value }) => {
  const hp = value.health;
  return (
    <div className="card-container mb-2 ">
      <div className="value d-sm-flex justify-content-evenly  text-center">
        <p className="my-auto">{index}.</p>
        <p className="my-auto ">{value.name}</p>
        <p className="hp my-auto">
          Health Status : {value.health}
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

        <button className="btn btn-primary"> Feed </button>
        <button className="btn btn-primary"> Throw Out</button>
      </div>
    </div>
  );
};

export default DashBoardCard;
