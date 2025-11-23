import React, { useState } from "react";
import { Award, Check, X, ArrowRight, RotateCcw } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const QuizView = ({ story, onComplete, onBack }) => {
  const { activeProfile, saveQuizScore } = useAuth();

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false); // Locks the UI after selection
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const quiz = story.quiz || [];
  const currentQuestion = quiz[currentQuestionIndex];

  // Handle when a child clicks an option
  const handleOptionClick = (index) => {
    if (isAnswered) return; // Prevent changing answer after selection

    setSelectedOptionIndex(index);
    setIsAnswered(true);

    // Update score if correct
    if (index === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  // Handle clicking the "Next" arrow
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      // Reset for next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    } else {
      // Finish Quiz
      saveQuizScore(activeProfile.id, story.id, score, quiz.length);
      setShowResults(true);
    }
  };

  // Helper to determine the color of the button
  const getOptionClass = (index) => {
    const baseClass =
      "w-full p-4 rounded-2xl text-left font-bold text-lg transition-all duration-300 border-2 relative overflow-hidden";

    if (!isAnswered) {
      // Default State: Hoverable
      return `${baseClass} bg-white border-transparent hover:border-[#F28C38] hover:shadow-lg text-gray-700`;
    }

    if (index === currentQuestion.correctAnswer) {
      // CORRECT ANSWER: Always turns green (whether selected or not)
      return `${baseClass} bg-green-100 border-green-500 text-green-700 shadow-md scale-105`;
    }

    if (
      index === selectedOptionIndex &&
      index !== currentQuestion.correctAnswer
    ) {
      // WRONG ANSWER: The one the user clicked turns red
      return `${baseClass} bg-red-100 border-red-500 text-red-700 opacity-80`;
    }

    // UNSELECTED OPTIONS: Fade them out to reduce noise
    return `${baseClass} bg-white border-transparent text-gray-400 opacity-50`;
  };

  // 1. Empty State
  if (!quiz || quiz.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{ backgroundColor: "#F6C7B6" }}
      >
        <div className="p-8 rounded-3xl text-center bg-[#F7EDE2] shadow-xl">
          <p className="text-xl mb-6 font-bold text-gray-600">
            No quiz available for this story yet!
          </p>
          <button
            onClick={onBack}
            className="px-8 py-4 rounded-2xl text-white font-bold shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: "#F28C38" }}
          >
            Back to Story
          </button>
        </div>
      </div>
    );
  }

  // 2. Results State
  if (showResults) {
    const percentage = Math.round((score / quiz.length) * 100);
    const isGreat = percentage >= 60;

    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: "#F6C7B6" }}
      >
        <div className="p-8 rounded-3xl text-center max-w-md w-full bg-[#F7EDE2] shadow-2xl animate-fade-in">
          <div
            className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-inner ${
              isGreat ? "bg-yellow-100" : "bg-blue-100"
            }`}
          >
            <Award
              className={`w-12 h-12 ${
                isGreat ? "text-yellow-500" : "text-blue-500"
              }`}
            />
          </div>

          <h2 className="text-3xl font-black mb-2" style={{ color: "#4A4A4A" }}>
            {isGreat ? "Amazing Job!" : "Good Try!"}
          </h2>

          <div className="my-6 py-4 rounded-2xl bg-white border-2 border-dashed border-gray-200">
            <span className="text-sm text-gray-500 uppercase font-bold tracking-wider">
              Your Score
            </span>
            <div
              className="text-6xl font-black mt-2"
              style={{ color: "#F28C38" }}
            >
              {score}/{quiz.length}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onComplete}
              className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#F28C38" }}
            >
              <Check className="w-6 h-6" />
              Finish & Save
            </button>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setSelectedOptionIndex(null);
                setIsAnswered(false);
                setShowResults(false);
              }}
              className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 text-gray-600 hover:bg-white transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Active Question State
  return (
    <div
      className="min-h-screen p-6 flex flex-col"
      style={{ backgroundColor: "#F6C7B6" }}
    >
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center">
        {/* Progress Bar Header */}
        <div className="mb-8 bg-[#F7EDE2] p-4 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-black text-[#F28C38] uppercase tracking-wider text-sm">
              Question {currentQuestionIndex + 1} / {quiz.length}
            </span>
            <span className="font-bold text-gray-400 text-sm">
              Score: {score}
            </span>
          </div>
          <div className="w-full h-4 bg-white rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                backgroundColor: "#F28C38",
                width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* The Question Card */}
        <div className="bg-[#F7EDE2] p-6 md:p-8 rounded-3xl shadow-xl relative">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center text-gray-800 leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOptionIndex === index;
              const isCorrect = index === currentQuestion.correctAnswer;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={getOptionClass(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Option Letter Circle */}
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg transition-colors ${
                          isAnswered && isCorrect
                            ? "bg-green-500 text-white"
                            : isAnswered && isSelected && !isCorrect
                            ? "bg-red-500 text-white"
                            : "bg-[#5EC4D0] text-white"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {/* Result Icon */}
                    {isAnswered && isCorrect && (
                      <Check className="w-6 h-6 text-green-600" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <X className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button Footer (Only appears after answering) */}
          {isAnswered && (
            <div className="mt-8 pt-6 border-t-2 border-gray-100 animate-fade-in">
              <button
                onClick={handleNextQuestion}
                className="w-full py-4 rounded-xl text-white font-bold text-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#F28C38" }}
              >
                {currentQuestionIndex < quiz.length - 1
                  ? "Next Question"
                  : "See Results"}
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
