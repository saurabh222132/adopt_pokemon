import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import DashBoardCard from "../dashBoardCard/dashBoardCard";
import "./dashboard.css";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [fetchedData, setfetchedData] = useState([]);

  //fetching stored pokemon in database

  useEffect(() => {
    //fetching stored pokemon in database
    const fetch = async () => {
      await axios
        .post("http://localhost:4000/pokemonlist", { email: user.email })
        .then((res) => {
          if (res) setfetchedData(res.data);
        });
    };
    fetch();
  }, [user.email]);

  return (
    <div className="dashboard-container">
      <div className="header d-sm-flex ">
        <h1 className="heading w-100 text-white text-center py-4 my-auto">
          Dashboard
        </h1>
        <div className="button text py-4 me-3"></div>

        <div className="button text py-4">
          <button
            className="btn  mx-auto d-block btn-primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </button>
        </div>
      </div>
      <div className="adopted text-white text-center">Adopted Pokemon List</div>

      {fetchedData.length === 0 ? (
        <h5 className="text-white text-center ">
          <span className="text-warning">Note :</span> You haven't adopt any
          pokemon, please adopt pokemon first.
        </h5>
      ) : (
        fetchedData.map((value, index) => {
          return (
            <div className=" ">
              <DashBoardCard
                fetchedData={fetchedData}
                setdata={setfetchedData}
                index={index + 1}
                value={value}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Dashboard;
