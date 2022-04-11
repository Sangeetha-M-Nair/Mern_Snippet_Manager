import React, { useContext, useState } from "react";
import Axios from "axios";
import "./AuthForm.scss";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";

function Emailver() {
  const [formEmail, setFormEmail] = useState("");
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const { getUser } = useContext(UserContext);

  async function emailVer(e) {
    e.preventDefault();

    const resetData = {
      email: formEmail,
    };

    try {
      await Axios.post("http://localhost:5000/auth/reset-router", resetData);
    } catch (err) {
      console.log("ERR:", err.response.data);
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      console.log("return");
      return;
    }
    //await getUser();
    alert("Check your email for the reset link");

    navigate("/login");
  }

  return (
    <div className="auth-form">
      <h2>Request for new password</h2>

      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}

      <form className="form" onSubmit={emailVer}>
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
          autoComplete="off"
        />

        <button className="btn-submit" type="submit">
          Verify
        </button>
      </form>
      <p>
        <Link to="/login">Login instead </Link>
      </p>
    </div>
  );
}

export default Emailver;
