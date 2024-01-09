import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./homePage";
import ProfilePage from "./profilePage";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { RestaurantContainer } from "../components/RestaurantContainer";
import { RestaurantForm } from "../components/RestaurantForm";
import { LogInRegister } from "../components/LogInRegister";
import { UserProvider } from "../components/UserContext";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LogInRegister />} />
          <Route path="/restaurants" element={<RestaurantContainer />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/form" element={<RestaurantForm />} />
        </Routes>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;
