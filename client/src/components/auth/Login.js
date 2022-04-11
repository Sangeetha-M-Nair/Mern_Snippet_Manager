import React, { useContext, useState } from "react";
import Axios from "axios";
import "./AuthForm.scss";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
import Message from "../misc/Message";

function Login() {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const { getUser } = useContext(UserContext);

  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      await Axios.post("http://localhost:5000/auth/login", loginData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    alert("Login successful");
    await getUser();
    navigate("/");
  }

  return (
    <div>
      <div className="auth-form">
        <h2>Log in</h2>

        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            clear={() => setErrorMessage(null)}
          />
        )}

        <form className="form" onSubmit={login}>
          <label htmlFor="form-emaill">Email</label>
          <input
            id="form-emaill"
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
          <label htmlFor="form-passwordd">Password</label>
          <input
            id="form-passwordd"
            type="password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
          />

          <button className="btn-submit" type="submit">
            Log in
          </button>
        </form>

        <p>
          Don't have an account yet?<Link to="/register">Register here </Link>
        </p>

        <p className="forgot-password">
          <Link to="/reset-router">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
