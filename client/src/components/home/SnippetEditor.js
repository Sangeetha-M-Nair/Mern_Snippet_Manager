import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./SnippetEditor.scss";
import ErrorMessage from "../misc/ErrorMessage";

function SnippetEditor({
  getSnippets,
  setSnippetEditorOpen,
  editSnippetData,
  clearEditSnippetData,
}) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (editSnippetData) {
              window.scrollTo({
                top: 1000,
                left: 0,
                behavior: "smooth",
              });

      setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
      setEditorDescription(
        editSnippetData.description ? editSnippetData.description : ""
      );
      setEditorCode(editSnippetData.code ? editSnippetData.code : "");
    }
  }, [editSnippetData]);

  async function saveSnippet(e) {
    e.preventDefault();

    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      code: editorCode ? editorCode : undefined,
    };
    try {
      if (!editSnippetData)
        await Axios.post("http://localhost:5000/snippet/", snippetData);
      else
        await Axios.put(
          `http://localhost:5000/snippet/${editSnippetData._id}`,
          snippetData
        );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    closeEditor();
    getSnippets();
  }
  function closeEditor() {
    setSnippetEditorOpen(false);
    setEditorCode("");
    setEditorTitle("");
    setEditorDescription("");
    clearEditSnippetData();
  }

  return (
    <div className="snippet-editor">
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form autoFocus className="form" onSubmit={saveSnippet}>
        <label htmlFor="editor-title">Title</label>
        <input
          id="editor-title"
          type="text"
          value={editorTitle}
          onChange={(e) => setEditorTitle(e.target.value)}
        />
        <br />
        <label htmlFor="editor-description">Description</label>
        <input
          id="editor-description"
          type="text"
          value={editorDescription}
          onChange={(e) => setEditorDescription(e.target.value)}
        />
        <br />
        <label htmlFor="editor-code">Code</label>

        <textarea
          id="editor-code"
          value={editorCode}
          onChange={(e) => setEditorCode(e.target.value)}
        />
        <br />
        <button className="btn-save" type="submit">
          Save
        </button>
        <button className="btn-cancel" type="submit" onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SnippetEditor;
