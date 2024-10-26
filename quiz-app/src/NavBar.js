// NavBar.js
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="Navigation mt-0 pt-0 fixed-top">
      <nav className="navbar mt-0">
        <h1 className="navbar-brand">Quiz App</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/quiz">Take the Quiz</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
