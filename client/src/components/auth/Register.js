import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
import axios from "axios";
//import FileBase64 from "react-file-base64";

function Register() {
  const [formFName, setFormFName] = useState("");
  const [formLName, setFormLName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");
  const [formProfileImg, setFormProfileImg] = useState("");

  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const { getUser } = useContext(UserContext);

  async function register(e) {
    e.preventDefault();

    //this one from their code

    let form = document.getElementById("form");

    let formData = new FormData(form);
    axios.post("http://localhost:5000/upload", formData).then((res) => {
      console.log("image uploaded");
    });

    const registerData = {
      firstName: formFName,
      lastName: formLName,
      phone: formPhone,
      email: formEmail,
      password: formPassword,
      passwordVerify: formPasswordVerify,
      profileImg: formProfileImg,
    };

    function setFormProfileImg(fakepath) {
      alert("ImageFunc");
    }

    try {
      await Axios.post("http://localhost:5000/auth/", registerData);
      alert("Registration Successful");

      console.log(
        document.cookie + registerData.firstName + registerData.profileImg
      );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }

      return;
    }
    //  alert("registration successful");

    navigate("/");

    console.log(document.cookie);
    await getUser();
  }

  return (
    <div className="auth-form">
      <h2>Register a new account</h2>

      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}

      <form
        className="form"
        id="form"
        onSubmit={register}
        encType="multipart/form-data"
      >
        <label htmlFor="form-fname">First Name</label>
        <input
          id="form-fname"
          className="form-textbox"
          type="text"
          value={formFName}
          onChange={(e) => setFormFName(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="form-lname">Last Name</label>
        <input
          className="form-textbox"
          id="form-lname"
          type="text"
          value={formLName}
          onChange={(e) => setFormLName(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="form-phone">Phone</label>
        <input
          id="form-phone"
          type="text"
          value={formPhone}
          onChange={(e) => setFormPhone(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
          autoComplete="off"
        />

        <label htmlFor="form-passwordVerify">Verify Password </label>
        <input
          id="form-passwordVerify"
          type="password"
          value={formPasswordVerify}
          onChange={(e) => setFormPasswordVerify(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="form-profileImg">ProfileImage</label>
        <input
          id="form-profileImg"
          type="file"
          value={formProfileImg}
          name="profileImg"
          onChange={(e) => setFormProfileImg(e.target.value)}
          autoComplete="off"
          accept="image/*"
        />

        <button className="btn-submit" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account?<Link to="/login">Login instead </Link>
      </p>
    </div>
  );
}

export default Register;
