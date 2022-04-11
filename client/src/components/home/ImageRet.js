import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import "./Snippet.scss";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./ImageRet.scss";
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";
import Register from "../auth/Register";
// import Updatee from "./UpdateUser";
// import Updatee from "./Updatee";
import Update from "./Update";

function ImageRet() {
  //user read page
  const [user, setUser] = useState("");
  const [users, setUsers] = useState("");
  // const { token } = useParams();
  const [UserEditorOpen, setUserEditorOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  let navigate = useNavigate();
  const { getUser } = useContext(UserContext);

  function renderUser(user) {
    if (user !== null) {
      navigate("/update"); //here

      {
        user && (
          <Update
            user={user}
            getCUser={getCUser}
            setUserEditorOpen={setUserEditorOpen}
            editUserData={editUserData}
            clearEditUserData={clearEditUserData}
          />
        );
      }
    }
  }

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/").then((response) => {
      console.log(response.data);
      setUser(response.data);
      //setEditUserData(response.data);
      // console.log(user);
      // getCUser();
      // editUser(user);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      setUsers([]);
      setEditUserData();
    } else {
      getCUser();
      // editUser();
    }
  }, []); //user

  function clearEditUserData() {
    setEditUserData(null);
  }

  async function getCUser() {
    const usersRes = await Axios.get("http://localhost:5000/auth/");
    setUsers(usersRes.data);
    console.log(usersRes);
  }

  // function editUserr(user) {
  //   console.log("user" + user);
  //   getCUser();

  //   console.log("edit userrrrr is " + users.firstName);

  //   setEditUserData(user);
  //   setUserEditorOpen(true);
  //   console.log("editUserData.........." + setEditUserData);

  //   navigate("/edit/"+user);
  //   // return user.map((user) => {
  //   return (
  //     <Updatee
  //       users={user}
  //       getCUser={getCUser}
  //       setUserEditorOpen={setUserEditorOpen}
  //       clearEditUserData={clearEditUserData}
  //       editUserData={editUserData}
  //     />
  //   );
  //   // });
  // }

  return (
    <div className="snippet">
      <h1>User Dashboard</h1>
      <br />
      <h3>Your Profile</h3>
      <br />
      <form
        className="form"
        id="form"
        encType="multipart/form-data"
        readOnly={true}
      >
        <label htmlFor="form-fname">First Name</label>
        <input id="form-fname" value={user.firstName} readOnly={true} />
        <label htmlFor="form-lname">Last Name</label>
        <input
          id="form-lname"
          type="text"
          value={user.lastName}
          readOnly={true}
        />
        <label htmlFor="form-phone">Phone</label>
        <input id="form-phone" type="text" value={user.phone} readOnly={true} />
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={user.email}
          readOnly={true}
        />
        <img
          className="image-size"
          // value={user.profileImg}
          src={`http://localhost:5000/uploads/${user.profileImg}`}
        />
        <button
          className="btn-edit"
          type="button"
          onClick={() => renderUser(user)}
        >
          Edit
        </button>
      </form>
      <Link to="/change-password">Change Password?</Link>

      {/* <UpdateUser /> */}
      {/* <Link to="/update/:token">Update</Link> */}
      {/* <Link to="/update">Update</Link> */}
      <br />

      {/* {editUser?<EditUser/>:null} */}
      {/*
      <button className="btn-delete" onClick={deleteUser}>
        Delete
      </button>  */}
      {/* {UserEditorOpen===true &&
        (
          <Updatee
             user={user}
            getCUser={getCUser}
            editUserData={editUserData}
            setUserEditorOpen={setUserEditorOpen}
            clearEditUserData={clearEditUserData}
          /> */}
      {/* )}  */}
    </div>
  );
}

export default ImageRet;
