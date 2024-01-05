import axios from "axios";

export const getAllRestaurants = () => {
  let url = "http://localhost:5106/restaurants";
  return axios.get(url).then(({ data }) => {
    return { data };
  });
};

export const getRestaurantsByCity = (city) => {
  let url = `http://localhost:5106/restaurants/city/${city}`;
  return axios.get(url).then(({ data }) => {
    return { data };
  });
};