import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Register, Profile } from "./components/index";

function App() {
  return (
    <BrowserRouter>
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
