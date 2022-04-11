import React from "react";
import Axios from "axios";
import "./Snippet.scss";

function Snippet({ snippet, getSnippets, editSnippet }) {
  async function deleteSnippet() {
    if (window.confirm("Do you want to delete this snippet?"))
      await Axios.delete(`http://localhost:5000/snippet/${snippet._id}`);
    getSnippets();
  }

  return (
    <div className="snippet">
      <p>Some more text</p>

      <a href="/">Test link</a>
      <form className="form" id="form">
        {snippet.title && <h2 className="title"> {snippet.title}</h2>}
        {snippet.description && (
          <p className="description">{snippet.description}</p>
        )}
        {snippet.code && (
          <pre className="code">
            <code>{snippet.code}</code>
          </pre>
        )}
        <button
          className="btn-edit"
          type="button"
          onClick={() => editSnippet(snippet)}
        >
          Edit
        </button>
        <button className="btn-delete" onClick={deleteSnippet}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default Snippet;
