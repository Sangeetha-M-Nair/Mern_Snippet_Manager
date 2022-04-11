import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
//import FileBase64 from "react-file-base64";

function ChangePassword() {
  //const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");
  // const [otp, setOtp] = useState("");
  const { user, getUser } = useContext(UserContext);
  const { token } = useParams();
  console.log("resetpage token   " + token);
  let navigate = useNavigate();

  async function logOut() {
    await Axios.get("http://localhost:5000/auth/logOut");
    await getUser();
    navigate("/http://localhost:3000/");
  }
  const [errorMessage, setErrorMessage] = useState(null);

  async function reset(e) {
    e.preventDefault();

    const resetData = {
      // otp:otp,
      password: formPassword,
      passwordVerify: formPasswordVerify,
      token: token,
    };

    try {
      await Axios.post(
        `http://localhost:5000/auth/change-password/._id`,
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
    // await getUser();
    alert("Password updated successfully");
     alert("Logging out ...Please log in again");
    // navigate("/login");
    //console.log(document.cookie);
    logOut();
   
    navigate("/login");
  }

  return (
    <div className="auth-form">
      <h1>Change Password </h1>
      <br />

      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}

      <form className="form" onSubmit={reset}>
        <div>
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
            id="form-password"
            type="password"
            placeholder="Enter your new password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
            autoComplete="off"
          />

          <label htmlFor="form-passwordVerify">Verify Password </label>
          <input
            id="form-passwordVerify"
            type="password"
            placeholder="Retype your password"
            value={formPasswordVerify}
            onChange={(e) => setFormPasswordVerify(e.target.value)}
            autoComplete="off"
          />
         
        </div>
        <button className="btn-submit" type="submit">
          Update Password
        </button>
      </form>
      {/* <p>
       <Link to="/login">Login instead </Link>
      </p> */}
      {user !== null && (
        <div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="http://localhost:3000/">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="http://localhost:3000/updatee">
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="http://localhost:3000/change-password"
                >
                  2
                </a>
              </li>
              {/* <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li> */}
              <li className="page-item">
                <a className="page-link" href="http://localhost:3000/logOut">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
