import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../actions/auth";

const Profile = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { profile: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(currentUser.body.token));
  }, []);

  // const { email, firstName, lastName } = user;

  // console.log(email);
  // console.log(firstName);
  // console.log(lastName);

  console.log(localStorage.getItem("userData"));

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='container'>
      {user && (
        <>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
