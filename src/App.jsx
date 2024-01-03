import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './homePage';
import ProfilePage from './profilePage';
import RestaurantContainer from "../components/restaurant-container";
import jsonData from "../Data/mock_restaurant_DB.json"; // Import your JSON data
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
   const { restaurants } = jsonData;

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
       <Route path='/all-restaurants' element={<RestaurantContainer restaurants={restaurants} />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App;
