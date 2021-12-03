import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='container'>
      <p>{currentUser.body.token}</p>
      <p>{currentUser.message}</p>
    </div>
  );
};

export default Profile;
