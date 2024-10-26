import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Quiz.css";

const questionsData = {
  "multiple-choice": [
    {
      questionText: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
  ],
  "true-false": [
    {
      questionText: "The sky is green.",
      answer: false,
    },
  ],
  matching: [
    {
      questionText: "Match the countries with their capitals.",
      options: [
        { country: "France", capital: "Paris" },
        { country: "England", capital: "London" },
      ],
      answers: { France: "Paris", England: "London" },
    },
  ],
};

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const quizType = searchParams.get("type") || "multiple-choice";

  // Redirect immediately if quizType is invalid
  if (!questionsData[quizType]) {
    navigate("/");
  }

  const questions = questionsData[quizType];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [matchingAnswers, setMatchingAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const handleNext = () => {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (quizType === "multiple-choice") {
      isCorrect = selectedOption === question.answer;
    } else if (quizType === "true-false") {
      isCorrect = selectedOption === question.answer;
    } else if (quizType === "matching") {
      isCorrect = Object.keys(matchingAnswers).every(
        (key) => matchingAnswers[key] === question.answers[key]
      );
    }

    if (isCorrect) setScore(score + 1);

    setCorrectAnswers((prev) => [
      ...prev,
      { question: question.questionText, correct: isCorrect },
    ]);

    setSelectedOption(null);
    setMatchingAnswers({});
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container container mt-5 p-4 shadow">
      <h2 className="mb-4">Quiz: {quizType.replace("-", " ")}</h2>
      {showScore ? (
        <div className="alert alert-success">
          <h4>
            Your Score: {score} / {questions.length}
          </h4>
          <ul>
            {correctAnswers.map((answer, index) => (
              <li key={index}>
                {answer.question}: {answer.correct ? "Correct" : "Incorrect"}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h4 className="mb-3">{questions[currentQuestion].questionText}</h4>
          {quizType === "multiple-choice" &&
            questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`btn btn-outline-primary m-2 ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          {quizType === "true-false" && (
            <>
              <button
                className={`btn btn-outline-primary m-2 ${
                  selectedOption === true ? "selected" : ""
                }`}
                onClick={() => setSelectedOption(true)}
              >
                True
              </button>
              <button
                className={`btn btn-outline-primary m-2 ${
                  selectedOption === false ? "selected" : ""
                }`}
                onClick={() => setSelectedOption(false)}
              >
                False
              </button>
            </>
          )}
          {quizType === "matching" &&
            questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="mb-3">
                <label>{option.country}</label>
                <select
                  className="form-select"
                  onChange={(e) =>
                    setMatchingAnswers({
                      ...matchingAnswers,
                      [option.country]: e.target.value,
                    })
                  }
                >
                  <option value="">Select capital</option>
                  {questions[currentQuestion].options.map((opt, i) => (
                    <option key={i} value={opt.capital}>
                      {opt.capital}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          <button
            className="btn btn-primary mt-3"
            onClick={handleNext}
            disabled={
              quizType === "matching"
                ? Object.keys(matchingAnswers).length !==
                  questions[currentQuestion].options.length
                : !selectedOption
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
