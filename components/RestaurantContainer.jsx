import React, { useEffect } from "react";
import { getAllRestaurants } from "../utils/api";
import { RestaurantCard } from "./RestaurantCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const RestaurantContainer = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);

    getAllRestaurants()
      .then(({ data }) => {
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error fetching restaurants");
        setIsLoading(false);
        console.error("Error fetching restaurants:", error);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!Array.isArray(restaurants) || restaurants.length === 0) {
    return <p>No restaurants available</p>;
  }

  return (
    <div
      className="container mt-4"
      style={{ border: "2px solid #FF4CE7", padding: "10px" }}
    >
      <h1 className="mb-4">Restaurant Explorer</h1>
      {restaurants.map((restaurant, index) => (
        <RestaurantCard restaurant={restaurant} key={index} />
      ))}
      <Link to="/form">
        <Button className="btn btn-primary mt-3">
          Add Grammable Restaurant
        </Button>
      </Link>
    </div>
  );
};
