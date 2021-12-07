import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Profile } from "./components/index";

import logo from "./assets/img/argentBankLogo.png";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Container>
          <Navbar.Brand href='/'>
            <img
              src={logo}
              // width='30'
              // height='30'
              className='d-inline-block align-top'
              alt='React Bootstrap logo'
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
