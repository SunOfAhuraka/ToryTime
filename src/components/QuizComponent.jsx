import React, { useState } from "react";
import { Award } from "lucide-react";

const QuizComponent = ({ quiz }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  if (!quiz)
    return (
      <div className="bg-yellow-100 rounded-3xl p-8 text-center">
        <Award className="w-16 h-16 mx-auto text-yellow-600 mb-4" />
        <p className="text-2xl font-bold text-gray-700">Quiz coming soon! 🌟</p>
      </div>
    );

  const handleAnswer = (index) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === quiz.questions[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = (score / quiz.questions.length) * 100;
    return (
      <div className="bg-gradient-to-br from-green-400 to-blue-400 rounded-3xl p-8 text-center text-white">
        <Award className="w-24 h-24 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4">Great Job! 🎉</h2>
        <p className="text-3xl font-bold mb-4">
          You scored {score} out of {quiz.questions.length}!
        </p>
        <p className="text-2xl mb-6">
          {percentage >= 80
            ? "⭐ Excellent!"
            : percentage >= 60
            ? "👍 Good work!"
            : "💪 Keep practicing!"}
        </p>
        <button
          onClick={() => {
            setCurrentQ(0);
            setScore(0);
            setShowResult(false);
            setSelectedAnswer(null);
            setAnswered(false);
          }}
          className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-xl hover:bg-gray-100"
        >
          Try Again
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-purple-600">
            Question {currentQ + 1} of {quiz.questions.length}
          </span>
          <span className="text-lg font-bold text-green-600">
            Score: {score}
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-purple-500 h-full transition-all"
            style={{
              width: `${((currentQ + 1) / quiz.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h3 className="text-3xl font-bold text-gray-800 mb-6">
        {question.question}
      </h3>

      <div className="space-y-4 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={answered}
            className={`w-full p-4 text-left text-xl font-semibold rounded-2xl transition-all ${
              answered
                ? index === question.correct
                  ? "bg-green-500 text-white"
                  : index === selectedAnswer
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-400"
                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
            }`}
          >
            {option}
            {answered && index === question.correct && " ✓"}
            {answered &&
              index === selectedAnswer &&
              index !== question.correct &&
              " ✗"}
          </button>
        ))}
      </div>

      {answered && (
        <button
          onClick={nextQuestion}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-full text-xl hover:from-purple-600 hover:to-pink-600"
        >
          {currentQ < quiz.questions.length - 1
            ? "Next Question →"
            : "See Results 🎉"}
        </button>
      )}
    </div>
  );
};

export default QuizComponent;
