import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import { userProfile } from "../actions/auth";
import axios from "axios";

const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const USER_ID = jwt.decode(currentUser.body.token);
  // console.log(currentUser.body.token);

  console.log(currentUser);

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  console.log(localStorage);

  console.log(dispatch(userProfile(currentUser.body.token)));

  return (
    <div className='container'>
      <p>{currentUser.body.token}</p>
      <p>{currentUser.message}</p>
    </div>
  );
};

export default Profile;
