import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
import axios from "axios";
//import FileBase64 from "react-file-base64";
import "./Update.scss";
import "./Snippet.scss";

function Update() {
  const [formFName, setFormFName] = useState("");
  const [formLName, setFormLName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [users, setUsers] = useState("");

  function closeEditor() {
    // setUserEditorOpen(false);
    setFormFName("");
    setFormLName("");
    setFormPhone("");
    setFormEmail("");
    // setEditProfileImg("");
    // clearEditUserData();
  }

  let navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:5000/auth/").then((response) => {
      console.log(response.data);
      setUsers(response.data);

      console.log(users);
      // getCUser();
    });
  }, []);

  const [errorMessage, setErrorMessage] = useState(null);
  const { getUser } = useContext(UserContext);

  async function register(e) {
    e.preventDefault();

    const registerData = {
      firstName: formFName,
      lastName: formLName,
      phone: formPhone,
      email: formEmail,
    };

    try {
      await Axios.put("http://localhost:5000/auth/update", registerData);
      console.log("..");
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
   
    closeEditor();
     alert("User Profile updated successfully");
    navigate("/");
    console.log(document.cookie);
    await getUser();
  }

  return (
    
    <div className="auth-form">
      
        <h2>Edit Page</h2>

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
            type="text"
            defaultValue={users.firstName}
            onChange={(e) => setFormFName(e.target.value)}
            autoComplete="off"
          />
          <label htmlFor="form-lname">Last Name</label>
          <input
            id="form-lname"
            type="text"
            defaultValue={users.lastName}
            onChange={(e) => setFormLName(e.target.value)}
            autoComplete="off"
          />
          <label htmlFor="form-phone">Phone</label>
          <input
            id="form-phone"
            type="text"
            defaultValue={users.phone}
            onChange={(e) => setFormPhone(e.target.value)}
            autoComplete="off"
          />
          <label htmlFor="form-email">Email</label>
          <input
            id="form-email"
            type="email"
            defaultValue={users.email}
            onChange={(e) => setFormEmail(e.target.value)}
            autoComplete="off"
          />
          <div id="wrap">
            <img
              className="image-size-disabled"
              value={users.profileImg}
              src={`http://localhost:5000/uploads/${users.profileImg}`}
            />
          </div>
          {/* <label htmlFor="form-profileImg">ProfileImage</label>
        <input
          id="form-profileImg"
          type="file"
          value={formProfileImg}
          name="profileImg"
          onChange={(e) => setFormProfileImg(e.target.value)}
          autoComplete="off"
          accept="image/*"
        /> */}

          <button className="btn-submit" type="submit">
            Update
          </button>

          <button className="btn-cancel" type="submit" onClick={closeEditor}>
            Cancel
          </button>
        </form>
        {users !== null && (
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

export default Update;
