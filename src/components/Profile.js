import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../actions/auth";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { profile: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(currentUser.body.token));
  }, []);

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {user && (
        <main className='main bg-dark'>
          <div className='header'>
            <h1>
              Welcome back
              <br />
              {`${user.firstName} ${user.lastName}`}!
            </h1>
            <button
              className='edit-button'
              onClick={(e) => {
                dispatch(
                  updateProfile(currentUser.body.token, "Steve", "Rogers")
                );
              }}>
              Edit Name
            </button>
          </div>
          <h2 className='sr-only'>Accounts</h2>
        </main>
      )}
    </>
  );
};

export default Profile;
