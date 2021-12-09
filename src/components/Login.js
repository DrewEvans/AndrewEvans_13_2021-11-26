import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        Field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          dispatch();
        })
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/profile' />;
  }

  return (
    <main className='card card-container'>
      <section class='sign-in-content'>
        <i class='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <Form onSubmit={handleLogin} ref={form}>
          <div class='input-wrapper'>
            <label for='username'>Username</label>
            <Input
              type='text'
              className='form-control'
              name='username'
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div class='input-wrapper'>
            <label for='password'>Password</label>
            <Input
              type='password'
              className='form-control'
              name='password'
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className='input-remember'>
            <Input type='checkbox' id='remember-me' />
            <label for='remember-me'>Remember me</label>
          </div>

          <button className='sign-in-button' disabled={loading}>
            {loading && <span>...</span>}
            Sign In
          </button>
          {message && (
            <div>
              <div role='alert'>{message}</div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </section>
    </main>
  );
};

export default Login;
