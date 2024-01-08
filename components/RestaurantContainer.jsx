import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getAllRestaurants, getRestaurantsByCity, getRestaurantsByCuisine, getRestaurantsByCuisineAndCity } from '../utils/api';
import SearchBar from './SearchBar';
import SortBar from './SortBar';
import { RestaurantCard } from './RestaurantCard';
import FancyBox from './FancyBox';

export const RestaurantContainer = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  const fetchAllRestaurants = () => {
    setIsLoading(true);
    setErrorMessage('');

    getAllRestaurants()
      .then(({ data }) => {
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage('Error fetching restaurants');
        setIsLoading(false);
        console.error('Error fetching restaurants:', error);
      });
  };

  const handleSearch = (city) => {
    setSelectedCity(city);
    if (city.trim() === '') {
      fetchAllRestaurants();
    } else {
      setIsLoading(true);
      setErrorMessage('');

      getRestaurantsByCity(city)
        .then(({ data }) => {
          setRestaurants(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage('No restaurants found');
          setIsLoading(false);
          console.error('Error fetching restaurants:', error);
        });
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const handleSortByCuisine = (cuisine) => {
    setSelectedCuisine(cuisine);
    if (cuisine === 'All Cuisines') {
      fetchAllRestaurants();
    } else {
      setIsLoading(true);
      setErrorMessage('');
  
      if (selectedCity) {
        // If city is selected, call the API with cuisine and city
        getRestaurantsByCuisineAndCity(cuisine, selectedCity)
          .then(({ data }) => {
            setRestaurants(data);
            setIsLoading(false);
          })
          .catch((error) => {
            setErrorMessage('No restaurants found');
            setIsLoading(false);
            console.error('Error fetching restaurants:', error);
          });
      } else {
        // If no city is selected, fetch all restaurants by cuisine
        getRestaurantsByCuisine(cuisine)
          .then(({ data }) => {
            setRestaurants(data);
            setIsLoading(false);
          })
          .catch((error) => {
            setErrorMessage('No restaurants found');
            setIsLoading(false);
            console.error('Error fetching restaurants:', error);
          });
      }
    }
  };

  return (
    <div className="container mt-4">
     <Link to="/form">
        <Button className="btn btn-primary mt-3" style={{ backgroundColor: '#1982DE', borderRadius: '20px', marginBottom:'18px'}}>
          Add Your Place🍝
        </Button>
      </Link>
      <h1 className="mb-4" style={{ padding: '5px' }}>Restaurant Explorer</h1>
      <SearchBar handleSearch={handleSearch} />
      <SortBar handleSort={handleSortByCuisine} />
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          {restaurants.length > 0 ? (
           <ul>
              {restaurants.map((restaurant, index) => (
              <FancyBox> <RestaurantCard restaurant={restaurant} key={index} /></FancyBox>
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