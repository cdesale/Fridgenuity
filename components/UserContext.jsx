import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user")) || null;
  };

  const storeUserInLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const [user, setUserState] = useState(getUserFromLocalStorage());

  const setUser = (newUserData) => {
    setUserState(newUserData);
    storeUserInLocalStorage(newUserData);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
