import React, { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getAllRestaurants, getRestaurantsByCity } from "../utils/api";
import SearchBar from "./SearchBar";

export const RestaurantContainer = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllRestaurants = () => {
    setIsLoading(true);
    setErrorMessage("");

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
  };

  const handleSearch = (city) => {
    if (city.trim() === "") {
      fetchAllRestaurants();
    } else {
      setIsLoading(true);
      setErrorMessage("");

      getRestaurantsByCity(city)
        .then(({ data }) => {
          setRestaurants(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage("No restaurants found");
          setIsLoading(false);
          console.error("Error fetching restaurants:", error);
        });
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Restaurant Explorer</h1>
      <SearchBar handleSearch={handleSearch} />

      <Link to="/form">
        <Button
          className="btn btn-primary mt-3"
          style={{ backgroundColor: "#1982DE", borderRadius: "20px" }}
        >
          Add a new Grammable Restaurant
        </Button>
      </Link>

      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          {restaurants.length > 0 ? (
            <ul>
              {restaurants.map((restaurant, index) => (
                <RestaurantCard restaurant={restaurant} key={index} />
              ))}
            </ul>
          ) : (
            <p>No restaurants found</p>
          )}
        </div>
      )}
    </div>
  );
};
