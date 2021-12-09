import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../actions/auth";
import { Modal, ModalFooter } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { profile: user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(currentUser.body.token));
  }, []);

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };
  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(currentUser.body.token, firstName, lastName));
    handleClose();
  };
  const handleClearEdit = (e) => {
    e.preventDefault();
    handleClose();
    setTimeout(() => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }, 300);
  };

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
            <button className='edit-button' onClick={handleShow}>
              Edit Name
            </button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className='input-wrapper'>
                  <label for='username'>First Name</label>
                  <input
                    className='my-1 form-control'
                    type='text'
                    id='firstname'
                    value={firstName}
                    onChange={onChangeFirstName}
                    placeholder={user.firstName}
                  />
                </div>
                <div className='input-wrapper'>
                  <label for='text'>Last Name</label>
                  <input
                    className='my-1 form-control'
                    type='text'
                    id='lastname'
                    type='text'
                    value={lastName}
                    onChange={onChangeLastName}
                    placeholder={user.lastName}
                  />
                </div>
                <ModalFooter>
                  <button
                    className='edit-button btn-secondary mx-2'
                    onClick={handleClearEdit}>
                    Cancel Changes
                  </button>

                  <button
                    className='edit-button '
                    type='submit'
                    onClick={handleSubmit}>
                    Save Changes
                  </button>
                </ModalFooter>
              </form>
            </Modal.Body>
          </Modal>
          <h2 className='sr-only'>Accounts</h2>
        </main>
      )}
    </>
  );
};

export default Profile;
