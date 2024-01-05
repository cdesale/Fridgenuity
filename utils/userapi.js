import axios from "axios";

export const logIn = async (email, password) => {
  let url = "http://localhost:5106/users/login";
  const { data } = await axios.post(url, { email, password });
  console.log(data);
  return { data };
};

export const register = async (username, email, passwordHash) => {
  let url = "http://localhost:5106/users/register";
  const { data } = await axios.post(url, { username, email, passwordHash });
  console.log(data);
  return { data };
};
