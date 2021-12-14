import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Profile,
  Navbar,
  ProtectedRoutes,
} from "./components/index";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route exact path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
        <footer className='footer'>
          <p className='footer-text'>Copyright 2020 Argent Bank</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
