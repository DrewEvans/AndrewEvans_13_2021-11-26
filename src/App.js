import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Profile, Navbar } from "./components/index";

function App() {
  console.log(localStorage);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <footer className='footer'>
          <p className='footer-text'>Copyright 2020 Argent Bank</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
