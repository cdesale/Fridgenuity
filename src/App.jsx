import { useState } from "react";
import "./App.css";
import React from "react";
import RestaurantContainer from "../components/restaurant-container";
import jsonData from "../Data/mock_restaurant_DB.json"; // Import your JSON data

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const App = () => {
  const { restaurants } = jsonData;

  return (
    <div>
      <RestaurantContainer restaurants={restaurants} />
    </div>
  );
};

export default App;
