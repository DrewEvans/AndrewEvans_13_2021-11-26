import axios from "axios";

const API_URL = "http://localhost:3001/profile";

const register = (email, password) => {
	return axios.post(API_URL, +"signup", {
		email,
		password,
	});
};

const login = async (email, password) => {
	const response = await axios.post(API_URL + "signin", {
		email,
		password,
	});
	if (response.data.accessToken) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const logout = () => {
	localStorage.removeItem("user");
};

const exportUserServices = {
	register,
	login,
	logout,
};

export default exportUserServices;
