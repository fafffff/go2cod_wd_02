import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Quiz from "./Quiz";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
