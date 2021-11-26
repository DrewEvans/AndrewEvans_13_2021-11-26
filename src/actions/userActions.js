import axios from "axios";

//Action Creators

const setUser = (payload) => ({ type: "SET_USER", payload });

export const logUserOut = () => ({ type: "LOG_OUT" });

//Methods

export const fetchUser = (userInfo) => (dispatch) => {
	axios({
		method: "post",
		url: "http://localhost:3001/login",
		data: {
			firstName: "Fred",
			lastName: "Flintstone",
		},
		body: JSON.stringify(userInfo),
	})
		.then(function (response) {
			// handle success
			console.log(response);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});
};
