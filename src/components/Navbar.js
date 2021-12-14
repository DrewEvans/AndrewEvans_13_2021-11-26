import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/argentBankLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

const signoutIcon = <FontAwesomeIcon icon={faSignOutAlt} />;
const userCircleIcon = <FontAwesomeIcon icon={faUserCircle} />;

const Navbar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn: loggedIn } = useSelector((state) => state.auth);

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
          {loggedIn ? (
            <>
              {currentUser && (
                <div>
                  <Link className='main-nav-item' to='/profile'>
                    {userCircleIcon}
                    {currentUser.firstName}
                  </Link>

                  <Link
                    className='main-nav-item'
                    to='/'
                    onClick={dispatch(logout)}>
                    {signoutIcon}
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
