import React, { useState } from "react";
import "./App.css";
import Router from "./Router";
import "./style/index.scss";
import Axios from "axios";
import { UserContextProvider } from "./context/UserContext";

// import { useTable, usePagination } from "react-table";
//import Pagination from "react-bootstrap/Pagination";

Axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
