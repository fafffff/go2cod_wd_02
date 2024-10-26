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
    {
      questionText: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Jupiter",
    },
    {
      questionText: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Gold", "Osmium", "Hydrogen"],
      answer: "Oxygen",
    },
    {
      questionText: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "Thailand", "South Korea"],
      answer: "Japan",
    },
    {
      questionText: "Who wrote 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
    {
      questionText: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      answer: "2",
    },
    {
      questionText: "Which ocean is the largest?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      answer: "Pacific Ocean",
    },
    {
      questionText: "What year did the Titanic sink?",
      options: ["1912", "1914", "1905", "1920"],
      answer: "1912",
    },
  ],

  "true-false": [
    {
      questionText: "The sky is blue.",
      answer: true,
    },
    {
      questionText: "Cats are mammals.",
      answer: true,
    },
    {
      questionText: "The earth is flat.",
      answer: false,
    },
    {
      questionText: "Water boils at 100 degrees Celsius.",
      answer: true,
    },
    {
      questionText: "Sharks are mammals.",
      answer: false,
    },
    {
      questionText: "There are 50 states in the USA.",
      answer: true,
    },
    {
      questionText: "Mount Everest is the tallest mountain in the world.",
      answer: true,
    },
    {
      questionText: "The Great Wall of China is visible from space.",
      answer: false,
    },
  ],

  matching: [
    {
      questionText: "Match the countries with their capitals.",
      options: [
        { country: "France", capital: "Paris" },
        { country: "Japan", capital: "Tokyo" },
        { country: "Italy", capital: "Rome" },
        { country: "Germany", capital: "Berlin" },
        { country: "Spain", capital: "Madrid" },
      ],
      answers: {
        France: "Paris",
        Japan: "Tokyo",
        Italy: "Rome",
        Germany: "Berlin",
        Spain: "Madrid",
      },
    },
    {
      questionText: "Match the scientists with their discoveries.",
      options: [
        { scientist: "Albert Einstein", discovery: "Theory of Relativity" },
        { scientist: "Isaac Newton", discovery: "Laws of Motion" },
        { scientist: "Charles Darwin", discovery: "Theory of Evolution" },
        { scientist: "Marie Curie", discovery: "Radioactivity" },
        { scientist: "Nikola Tesla", discovery: "Alternating Current" },
      ],
      answers: {
        "Albert Einstein": "Theory of Relativity",
        "Isaac Newton": "Laws of Motion",
        "Charles Darwin": "Theory of Evolution",
        "Marie Curie": "Radioactivity",
        "Nikola Tesla": "Alternating Current",
      },
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
    <div className="quiz-container container mt-4 p-4 shadow">
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
                onClick={() => {
                  setSelectedOption(option);
                  console.log("You selected:", option); // Log selected option
                }}
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
                onClick={() => {
                  setSelectedOption(true);
                  console.log("You selected: True"); // Log true selection
                }}
              >
                True
              </button>
              <button
                className={`btn btn-outline-primary m-2 ${
                  selectedOption === false ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedOption(false);
                  console.log("You selected: False"); // Log false selection
                }}
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
                : selectedOption === null // Ensure selectedOption is explicitly checked for null
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
