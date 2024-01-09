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


export const getAllCuisines = () => {
  let url = "http://localhost:5106/restaurants/cuisines";
  return axios.get(url).then(({ data }) => {
    return { data };
  });
};

export const getRestaurantsByCuisine = (cuisine) => {
  let url = cuisine ? `http://localhost:5106/restaurants/cuisine/${cuisine}` : `http://localhost:5106/restaurants`;
  return axios.get(url).then(({ data }) => {
    return { data };
  });
};

export const getRestaurantsByCuisineAndCity = (cuisine, city) => {
  let url = `http://localhost:5106/restaurants/cuisine/${cuisine}/city/${city}`;
  return axios.get(url).then(({ data }) => {
    return { data };
  });
};

export const getCuisinesByCity = (city) => {
  const url = `http://localhost:5106/restaurants/city/${city}/cuisines`;
  return axios.get(url).then(({ data }) => {
    return { data };
  });
};

export const deleteRestaurantById = (id) => {
  let url = `http://localhost:5106/restaurants/${id}`;
  return axios.delete(url)
    .then(response => response.status === 200)
    .catch(() => false);
}

export const getRestaurantsByUserId = (id) => {
  let url = `http://localhost:5106/restaurants/user/${id}`;
  return axios.get(url).then(({ data }) => {
    return { data };
  });
};

export const postRestaurant = (formData) => {
  let url = `http://localhost:5106/restaurants`;
  return axios.post(url, formData).then(({ data }) => {
    return { data };
  });
};

export const getRestaurantsByRestaurantId = (id)=>{
  let url = `http://localhost:5106/restaurants/${id}`;
  return axios.get(url).then(({ data }) => {
    return { data };
  });
}

export const patchRestaurant = (restaurantId, changes) => {
  const url = `http://localhost:5106/restaurants/${restaurantId}`;
  const requestBody = changes.map(change => ({
    op: "replace",
    path: change.path,
    value: change.value
  }));
    return axios.patch(url, requestBody).then(({ data }) => {
      return { data };
    });
};