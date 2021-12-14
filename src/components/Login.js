import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

const userCircleIcon = (
  <FontAwesomeIcon className='sign-in-icon' icon={faUserCircle} />
);

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        Field is required!
      </div>
    );
  }
};
const emailValidation = (value) => {
  const regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!value) {
    return (
      <span className='alert alert-danger' role='alert'>
        Field is required!
      </span>
    );
  }
  if (regex.test(value) === false) {
    return (
      <div className='alert alert-danger' role='alert'>
        Username is incorrect!
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

  const navigate = useNavigate();

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
          navigate("/profile");
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
      <section className='sign-in-content'>
        {userCircleIcon}
        <h1>Sign In</h1>
        <Form onSubmit={handleLogin} ref={form}>
          <div className='input-wrapper'>
            <label htmlFor='username'>Username</label>
            <Input
              type='text'
              className='form-control'
              name='username'
              value={username}
              onChange={onChangeUsername}
              validations={[emailValidation]}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
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
            <label htmlFor='remember-me'>Remember me</label>
          </div>

          <button className='sign-in-button' disabled={loading}>
            {loading && <span>...</span>}
            Sign In
          </button>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </section>
    </main>
  );
};

export default Login;
