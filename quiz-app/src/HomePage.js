import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const handleQuizSelection = (type) => {
    navigate(`/quiz?type=${type}`);
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Quiz App</h1>
      <p>Select the type of quiz you want to take:</p>
      <div className="quiz-options">
        <button
          onClick={() => handleQuizSelection("multiple-choice")}
          className="btn btn-primary"
        >
          Multiple Choice
        </button>
        <button
          onClick={() => handleQuizSelection("true-false")}
          className="btn btn-secondary"
        >
          True/False
        </button>
        <button
          onClick={() => handleQuizSelection("matching")}
          className="btn btn-success"
        >
          Matching
        </button>
      </div>
    </div>
  );
}

export default HomePage;
