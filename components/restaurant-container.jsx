import React from "react";

const RestaurantContainer = ({ restaurants }) => {
  return (
    <div
      className="container mt-4"
      style={{ border: "2px solid #FF4CE7", padding: "10px" }}
    >
      <h1 className="mb-4">Restaurant Explorer</h1>
      <div>
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="card mb-4"
            style={{ borderColor: "#FF4CE7" }}
          >
            <div className="card-body">
              <h2 className="card-title">{restaurant.restaurant.name}</h2>
              <p className="card-text">{restaurant.restaurant.description}</p>
              <p>
                <strong>Cuisines: </strong>
                {restaurant.restaurant.cuisines}
              </p>
              <p>
                <strong>Address: </strong>
                {restaurant.restaurant.location.address},{" "}
                {restaurant.restaurant.location.city}
              </p>
              <img
                src={restaurant.restaurant.photos_url}
                alt={`Photo of ${restaurant.restaurant.name}`}
                className="img-fluid"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantContainer;
