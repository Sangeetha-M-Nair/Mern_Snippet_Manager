import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/misc/Navbar";
import Home from "./components/home/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Reset from "./components/auth/Reset";
import Emailver from "./components/auth/Emailver";
import ImageRet from "./components/home/ImageRet";
import EditUser from "./components/home/EditUser";
import ChangePassword from "./components/home/ChangePassword";
import Snippet from "./components/home/Snippet";
import Update from "./components/home/Update";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/image" element={<ImageRet />} />
          <Route exact path="/reset-router" element={<Emailver />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/edit" element={<EditUser />} />
          <Route exact path="/snippet" element={<Snippet />} />
          <Route exact path="/reset/:token" element={<Reset />} />
          
          <Route exact path="/update" element={<Update />} />
          <Route exact path="/change-password" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
