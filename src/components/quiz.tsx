"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await axios.get("/api/ques");
        setQuestions(response.data);
      } catch (error) {
        console.log("Error fetching questions", error);
      }
    }
    fetchQuestion();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (questions[currentQuestionIndex].correctAnswer === selectedOption) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption("");
      setCurrentIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="flex items-center justify-center h-screen bg-purple-400">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold mb-6 text-black-600">
            Your Score
          </h1>
          <div className="text-6xl font-extrabold mb-8 text-teal-700">
            {score} / {questions.length}
          </div>
          <Link href="/">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition-colors">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Loading questions...</h1>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-400">
      <div className="max-w-2xl w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">{currentQuestionIndex+1}. {currentQuestion.question}</h1>
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-4 py-3 rounded-md border cursor-pointer transition-colors ${
                selectedOption === option
                  ? "bg-green-500 border-teal-500"
                  : "hover:bg-gray-100 border-gray-300"
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              <span className="text-lg font-medium">
                {String.fromCharCode(97 + index)}) {option}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleNext}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            disabled={!selectedOption}
          >
            {isLastQuestion ? "View Results" : "Next"}
          </button>
        </div>
      </div>
      <div className="mt-6 text-lg text-gray-700">
        Question {currentQuestionIndex + 1} / {questions.length}
      </div>
    </div>
  );
}
