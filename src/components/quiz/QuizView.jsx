import React, { useState } from "react";
import { Award, Check, X, ArrowRight, RotateCcw } from "lucide-react";

const QuizView = ({ story, onComplete, onBack, childProfile }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const quiz = story.quiz || [];
  const currentQuestion = quiz[currentQuestionIndex];

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOptionIndex(index);
    setIsAnswered(true);
    if (index === currentQuestion.correct_answer_index) {
      // Adjust based on backend field name
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const getOptionClass = (index) => {
    const base =
      "w-full p-4 rounded-2xl text-left font-bold text-lg transition-all border-2 relative";
    if (!isAnswered)
      return `${base} bg-white border-transparent hover:border-brand-primary text-gray-700`;

    if (index === currentQuestion.correct_answer_index)
      return `${base} bg-green-100 border-green-500 text-green-700`;
    if (
      index === selectedOptionIndex &&
      index !== currentQuestion.correct_answer_index
    )
      return `${base} bg-red-100 border-red-500 text-red-700`;

    return `${base} bg-white border-transparent opacity-50`;
  };

  if (!quiz.length)
    return (
      <div className="p-8 text-center">
        No quiz available.
        <button
          onClick={onBack}
          className="block mx-auto mt-4 text-brand-primary"
        >
          Back
        </button>
      </div>
    );

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-brand-bg">
        <div className="p-8 rounded-3xl text-center bg-brand-card shadow-xl max-w-md w-full">
          <Award className="w-20 h-20 mx-auto mb-4 text-brand-primary" />
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-xl mb-6">
            Score: {score} / {quiz.length}
          </p>
          <button
            onClick={() => onComplete(score, quiz.length)}
            className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold"
          >
            Finish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col bg-brand-bg">
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center">
        <div className="mb-8 bg-brand-card p-4 rounded-2xl">
          <span className="font-bold text-brand-primary">
            Question {currentQuestionIndex + 1} / {quiz.length}
          </span>
        </div>
        <div className="bg-brand-card p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {currentQuestion.question}
          </h2>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
                className={getOptionClass(index)}
              >
                {option}
              </button>
            ))}
          </div>
          {isAnswered && (
            <button
              onClick={handleNextQuestion}
              className="w-full mt-8 bg-brand-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              Next <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
