import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios.post(API_URL + "login", {
    username,
    password,
  });

  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getProfile = async (token) => {
  let headersList = {
    Authorization: `Bearer ${token}`,
  };

  let reqOptions = {
    url: "http://localhost:3001/api/v1/user/profile",
    method: "POST",
    headers: headersList,
  };

  const response = await axios.request(reqOptions);

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const exportUserServices = {
  register,
  login,
  logout,
  getProfile,
};

export default exportUserServices;
