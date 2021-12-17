import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../actions/auth";
import { Modal, ModalFooter } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "bootstrap/dist/css/bootstrap.min.css";

const nameValidation = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger help-block' role='alert'>
        Field is required!
      </div>
    );
  }
};
const Profile = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(currentUser.token));
  }, []);

  console.log(currentUser);

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

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(updateProfile(currentUser.token, firstName, lastName));
      handleClose();
    }
  };
  const handleClearEdit = (e) => {
    e.preventDefault();
    handleClose();
    setTimeout(() => {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
    }, 300);
  };

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {currentUser && (
        <main className='main bg-dark'>
          <div className='header'>
            <h1>
              Welcome back
              <br />
              {`${currentUser.firstName} ${currentUser.lastName}`}!
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
              <Form onSubmit={handleSubmit} ref={form}>
                <div className='input-wrapper'>
                  <label htmlFor='username'>First Name</label>
                  <Input
                    className='my-1 form-control'
                    type='text'
                    id='firstname'
                    value={firstName}
                    onChange={onChangeFirstName}
                    placeholder={currentUser.firstName}
                    validations={[nameValidation]}
                  />
                </div>
                <div className='input-wrapper'>
                  <label for='text'>Last Name</label>
                  <Input
                    className='my-1 form-control'
                    type='text'
                    id='lastname'
                    type='text'
                    value={lastName}
                    onChange={onChangeLastName}
                    placeholder={currentUser.lastName}
                    validations={[nameValidation]}
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
                    //onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </ModalFooter>
              </Form>
            </Modal.Body>
          </Modal>
          <h2 className='sr-only'>Accounts</h2>
        </main>
      )}
    </>
  );
};

export default Profile;
