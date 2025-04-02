import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/Home";
import KnowUs from "./Components/KnowUs/KnowUs";
import "./Components/KnowUs/KnowUs.css";
import AskDoubt from "./Components/AskDoubt/AskDoubt";
import "./Components/AskDoubt/AskDoubt.css";
import Career from"./Components/Career/career"
import Navbar from "./Components/Navbar/navbar"
import Footer from "./Components/Footer/footer"
import Admin from "./Components/Admin/Admin.js";

import AdvanceJava from "./Components/AdvanceJava/AdvanceJava.js";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<KnowUs />} />
        <Route path="/askyourdoubt" element={<AskDoubt />} />
        <Route path="/findcareer" element={<Career/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/advance-java" element={<AdvanceJava/>}/>
      </Routes>
      {/* <Footer /> */}
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
