import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Admin/>
    </div>
  );
};

export default App;
