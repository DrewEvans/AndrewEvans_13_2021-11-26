import { useState } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions/userActions";

function Login() {
	const [state, setState] = useState({
		username: "",
		password: "",
	});

	const handleOnChange = (e) => {
		e.persist();
		setState(() => ({
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		fetchUser(state);
	};

	console.log(state);

	return (
		<div>
			<h1>Login Form</h1>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					name='username'
					placeholder='Username'
					value={state.username}
					onChange={handleOnChange}
				/>
				<br />
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={state.password}
					onChange={handleOnChange}
				/>
				<br />
				<input type='submit' value='Login' />
			</form>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUser: (userInfo) => dispatch(fetchUser(userInfo)),
	};
};

export default connect(null, mapDispatchToProps)(Login);
