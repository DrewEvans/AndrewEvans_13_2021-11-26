import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import logo from "../assets/img/argentBankLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

const Navbar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { profile: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Container fluid>
      <nav className='main-nav flex-row'>
        <Link className='main-nav-logo' to='/'>
          <img
            className='main-nav-logo-image'
            src={logo}
            alt='Argent Bank Logo'
          />
        </Link>
        <div>
          {currentUser ? (
            <>
              {user && (
                <div>
                  <Link className='main-nav-item' to='/profile'>
                    <i class='fa fa-user-circle'></i>
                    {user.firstName}
                  </Link>

                  <Link
                    className='main-nav-item'
                    to='/'
                    onClick={dispatch(logout)}>
                    <i className='fa fa-sign-out'></i>
                    Sign Out
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={"/login"} className='nav-link'>
                  Login
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
