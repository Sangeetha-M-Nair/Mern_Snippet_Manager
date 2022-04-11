import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
//import FileBase64 from "react-file-base64";

function Reset() {
  //const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  // const [formPasswordVerify, setFormPasswordVerify] = useState("");
  // const [otp, setOtp] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const { token } = useParams();
  console.log("resetpage token   " + token);
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const { getUser } = useContext(UserContext);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  async function reset(e) {
    e.preventDefault();

    const resetData = {
      // otp:otp,
      password: formPassword,
      // passwordVerify: formPasswordVerify,
      token: token,
    };

    try {
      await Axios.post(
        `http://localhost:5000/auth/new-password/._id`,
        resetData
      );

      //console.log(document.cookie);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    navigate("/");
    //console.log(document.cookie);
    await getUser();
  }

  return (
    <div className="auth-form">
      <h2>Change Password </h2>

      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}

      <form className="form" onSubmit={reset}>
        {/* <label htmlFor="form-otp">Otp</label>
        <input
          id="form-otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          autoComplete="off"
        />  */}

        <label htmlFor="form-password">Password</label>
        <input
          className="password"
          id="form-password"
          type={passwordShown ? "text" : "password"}
          placeholder="Enter your new password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
          autoComplete="off"
        />
        <i
          className="far fa-eye"
          id="togglePassword"
          onClick={togglePassword}
        ></i>

        {/* <label htmlFor="form-passwordVerify">Verify Password </label>
        <input
          id="form-passwordVerify"
          type="password"
          value={formPasswordVerify}
          onChange={(e) => setFormPasswordVerify(e.target.value)}
          autoComplete="off"
        /> */}

        <button className="btn-submit" type="submit">
          Update Password
        </button>
      </form>
      {/* <p>
       <Link to="/login">Login instead </Link>
      </p> */}
    </div>
  );
}

export default Reset;
