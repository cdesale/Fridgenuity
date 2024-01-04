import React, { useEffect } from "react";
import { getAllRestaurants } from "../utils/api";
import { RestaurantCard } from "./restaurant-card";
import { useState } from "react";

// const RestaurantContainer = ({ restaurants }) => {
//   return (
//     <div
//       className="container mt-4"
//       style={{ border: "2px solid #FF4CE7", padding: "10px" }}
//     >
//       <h1 className="mb-4">Restaurant Explorer</h1>
//       <div>
//         {restaurants.map((restaurant, index) => (
//           <div
//             key={index}
//             className="card mb-4"
//             style={{ borderColor: "#FF4CE7" }}
//           >
//             <div className="card-body">
//               <h2 className="card-title">{restaurant.restaurant.name}</h2>
//               <p className="card-text">{restaurant.restaurant.description}</p>
//               <p>
//                 <strong>Cuisines: </strong>
//                 {restaurant.restaurant.cuisines}
//               </p>
//               <p>
//                 <strong>Address: </strong>
//                 {restaurant.restaurant.location.address},{" "}
//                 {restaurant.restaurant.location.city}
//               </p>
//               <img
//                 src={restaurant.restaurant.photos_url}
//                 alt={`Photo of ${restaurant.restaurant.name}`}
//                 className="img-fluid"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export const RestaurantContainer = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);

    getAllRestaurants()
      .then((data) => {
        console.log(data["data"], "From the container");
        setRestaurants(data["data"]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error, "I am error");
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
    </div>
  );
};
