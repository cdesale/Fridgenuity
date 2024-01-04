import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./homePage";
import ProfilePage from "./profilePage";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { RestaurantContainer } from "../components/RestaurantContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RestaurantContainer />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
