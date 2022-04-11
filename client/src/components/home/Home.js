import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import ImageRet from "./ImageRet";
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";
import Update from "./Update";
import "./Snippet.scss";
import ReactPaginate from "react-paginate";

function Home() {
  //{ editUser}
  const [snippets, setSnippets] = useState([]);
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
  const [SnippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  const { user, getUser } = useContext(UserContext);

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  // const getData = async () => {
  //   const res = await Axios.get(`http://localhost:5000/snippet/`);
  //   // https://jsonplaceholder.typicode.com/photos
  //   const data = res.data;
  //   const slice = data.slice(offset, offset + perPage);
  //   const postData = slice.map((pd) => (
  //     <div className="snippet" key={pd.id}>
  //       <p className="title">{pd.title}</p>
  //       <img src={pd.thumbnailUrl} alt="" />
  //     </div>
  //   ));
  //   setData(postData);
  //   setPageCount(Math.ceil(data.length / perPage));
  //   getData();
  // };
  // const handlePageClick = (e) => {
  //   const selectedPage = e.selected;
  //   setOffset(selectedPage + 1);
  // };

  // useEffect(() => {
  //   getData();
  // }, [offset]);

  //edit

  function clearEditSnippetData() {
    setEditSnippetData(null);
  }

  useEffect(() => {
    if (!user) {
      setSnippets([]);
      setUsers([]);
    } else {
      getSnippets();
      //getUsers();
      //getData();
      renderUser();
    }
  }, [user]);

  async function getSnippets() {
    const snippetsRes = await Axios.get("http://localhost:5000/snippet/");
    setSnippets(snippetsRes.data);
  }

  //edit
  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setSnippetEditorOpen(true);
  }

  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedSnippets.map((snippet, i) => {
      return (
        <Snippet
          key={i}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  }

  // function editUser(user) {
  //   console.log("id......................." + user);
  //   navigate("/update/" + { user });
  // }

  function renderUser(user) {
    return (
      // users.map((user) => {
      <ImageRet />
    );
    // }))
  }

  return (
    <div className="home">
      {/* image and user profile */}
      {/* <h1> Name : {user?user.firstName:""}</h1> */}
      {user !== null && renderUser(user)}

      

      {/* {user && (
        <button className="btn-edit" onClick={() => editUser(user)}>
          Edit
        </button> */}
      {/* )} */}

      {/* {user && (
        <div>
          <h1>List of snippets</h1>
          {data}

          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      )} */}
      {!SnippetEditorOpen && user && (
        <button
          className="btn-editor-toggle"
          onClick={() => setSnippetEditorOpen(true)}
        >
          Add snippet
        </button>
      )}
      {/* {!SnippetEditorOpen && user && (
        <button className="btn-edit" onClick={() => Update(user)}>
          Update
        </button>
      )}
      {user && (
      <UpdateUser user={user} />
      )} */}

      {SnippetEditorOpen && (
        <SnippetEditor
          setSnippetEditorOpen={setSnippetEditorOpen}
          getSnippets={getSnippets}
          clearEditSnippetData={clearEditSnippetData}
          editSnippetData={editSnippetData}
        />
      )}
      {snippets.length > 0
        ? renderSnippets()
        : user && (
            <p className="no-snippets-msg"> No snippets have been added </p>
          )}
      {user === null && (
        <div className="no-user-message">
          <h1>Welcome to Snippet Manager</h1>
          <Link to="/register">Register here</Link>
        </div>
      )}
      {/* {UserEditorOpen === true && (
        <Updatee
          users={users}
          setUserEditorOpen={setUserEditorOpen}
          // clearEditUserData={clearEditUserData}
          editUserData={editUserData}
        />
      )}  */}
      {/* setSnippetEditorOpen(false);  */}
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
                <a className="page-link" href="http://localhost:3000/update">
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

export default Home;
