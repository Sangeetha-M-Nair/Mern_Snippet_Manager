import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import "./Snippet.scss";
import { Link } from "react-router-dom";

import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";
import ImageRet from "./ImageRet";
import Register from "../auth/Register";
import "./SnippetEditor.scss";
import { useNavigate } from "react-router-dom";

function EditUser({
  getCUser,
  setUserEditorOpen,
  clearEditUserData,
  editUserData,
}) {
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();

  //setUserEditorOpen(true);

  //const [editUserData, setEditUserData] = useState(null);

  // useEffect(() => {
  //   Axios.get("http://localhost:5000/auth/").then((response) => {
  //     // console.log(response.data);
  //     setUsers(response.data);

  //     setEditUserData(users);

  //     console.log("rendered");
  //     console.log(users);
  //   });
  // }, [editUserData]);
  const [editUser, setEditUser] = useState(null);

  const [EditorOpen, setEditorOpen] = useState(false);

  const { user, getUser } = useContext(UserContext);
  console.log("userrrrrrrrrrrr in edituser" + user);

  const [editFName, setEditFName] = useState(user.firstName);
  const [editLName, setEditLName] = useState(user.lastName);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editEmail, setEditEmail] = useState(user.email);
  // const [editProfileImg, setEditProfileImg] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  // const [user, setUser] = useState([]);
  console.log("edituser data is ....." + editUserData);

  useEffect(
    (editUserData) => {
      if (editUserData) {
        setEditFName(editUserData.firstName ? editUserData.firstName : "");
        setEditLName(editUserData.lastName ? editUserData.lastName : "");
        setEditPhone(editUserData.phone ? editUserData.phone : "");
        setEditEmail(editUserData.email ? editUserData.email : "");
        console.log("renderinggg");

        // setEditProfileImg(editUserData.profileImg ? editUserData.profileImg : "");
        //setEditUserData();
        // setEditUserData(null);
      }
    },
    [editUserData]
  );

  async function saveUser(e) {
    e.preventDefault();

    // let form = document.getElementById("form");

    // let formData = new FormData(form);
    // await Axios.post("http://localhost:5000/upload", formData).then((res) => {
    //   console.log("image uploaded");
    // });

    const registerData = {
      firstName: editFName ? editFName : undefined,
      lastName: editLName ? editLName : undefined,
      phone: editPhone ? editPhone : undefined,
      email: editEmail ? editEmail : undefined,
      // profileImg: editProfileImg ? editProfileImg : undefined,
    };
    try {
      console.log("registerrrrrrrrr" + registerData);
      if (!editUserData)
        await Axios.post("http://localhost:5000/auth/", registerData);
      else
        await Axios.put(
          `http://localhost:5000/auth/${editUserData._id}`,
          registerData
        );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
          console.log(err);
        }
      }
      return;
    }
    closeEditor();
    navigate("/");

    await getCUser(); //current user
    console.log("gettttcuserr,,,,," + getCUser);
  }

  function closeEditor() {
    // setUserEditorOpen(false);
    setEditFName("");
    setEditLName("");
    setEditPhone("");
    setEditEmail("");
    // setEditProfileImg("");
    // clearEditUserData();
  }

  return (
    <div className="auth-form">
      <h2>Edit user page</h2>

      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}

      <form
        className="form"
        id="form"
        onSubmit={saveUser}
        encType="multipart/form-data"
        autoComplete="off"
      >
        <label htmlFor="form-fname">First Name</label>
        <input
          id="form-fname"
          type="text"
          defaultValue={editFName}
          onChange={(e) => setEditFName(e.target.value)}
        />
        <label htmlFor="form-lname">Last Name</label>
        <input
          id="form-lname"
          type="text"
          defaultValue={editLName}
          onChange={(e) => setEditLName(e.target.value)}
        />
        <label htmlFor="form-phone">Phone</label>
        <input
          id="form-phone"
          type="text"
          defaultValue={editPhone}
          onChange={(e) => setEditPhone(e.target.value)}
        />
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          defaultValue={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />

        <button className="btn-submit" type="submit">
          Save
        </button>
        <button className="btn-submit" type="submit" onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditUser;
