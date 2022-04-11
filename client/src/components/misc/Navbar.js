import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Axios from "axios";
import UserContext from "../../context/UserContext";

import { useNavigate } from "react-router-dom";
function Navbar() {
  const { user, getUser } = useContext(UserContext);

  let navigate = useNavigate();
  async function logOut() {
    await Axios.get("http://localhost:5000/auth/logOut");
    await getUser();
    navigate('/');
  }

  return (
    <div className="navbar">
      <Link to="/">
        <h1>Snippet manager</h1>
      </Link>
      {user === null ? (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        user && (
          <div>
            <a className="btn-logout" href="http://localhost:3000/">
              Home
            </a>
            <button className="btn-logout" onClick={logOut}>
              Logout
            </button>
          </div>
        )
      )}
      {/* {user !== null && (
        <div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="http://localhost:3000/">
                  Home
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="http://localhost:3000/update">
                  Edit Profile
                </a>
              </li>
              {/* <li className="page-item">
                <a
                  className="page-link"
                  href="http://localhost:3000/change-password"
                >
                  Change Password
                </a>
              </li> */}
              {/* <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li> 
              <li className="page-item">
                <a className="page-link" href="http://localhost:3000/logOut">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )} */}
    </div>
  );
}

export default Navbar;
