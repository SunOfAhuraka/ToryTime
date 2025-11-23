import React, { useState } from "react";

const CustomStoryCreator = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [ageRange, setAgeRange] = useState("4-7");
  const [script, setScript] = useState("");
  const [quiz, setQuiz] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  const addQuizQuestion = () => {
    setQuiz([
      ...quiz,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const updateQuizQuestion = (index, field, value) => {
    const newQuiz = [...quiz];
    newQuiz[index] = { ...newQuiz[index], [field]: value };
    setQuiz(newQuiz);
  };

  const updateQuizOption = (qIndex, oIndex, value) => {
    const newQuiz = [...quiz];
    newQuiz[qIndex].options[oIndex] = value;
    setQuiz(newQuiz);
  };

  const handleSave = () => {
    if (title && script) {
      const story = {
        title,
        category,
        ageRange,
        script,
        quiz: quiz.filter((q) => q.question && q.options[0]),
        coverImage: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgZmlsbD0iI0ZGNkI5RCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjxzdHJvbmcgcG9pbnRlci1ldmVudHM9Im5vbmUiPjwvc3Ryb25nPvCfjpI8L3RleHQ+PC9zdmc+`,
        duration: "5 min",
        defaultAudio: null,
      };
      onSave(story);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div
        className="p-8 rounded-2xl max-w-3xl w-full my-8"
        style={{ backgroundColor: "#F7EDE2" }}
      >
        <h2 className="text-2xl font-bold mb-6">Create Custom Story</h2>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium mb-2">
              Story Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{ borderColor: "#5EC4D0" }}
              placeholder="Enter story title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2"
                style={{ borderColor: "#5EC4D0" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Age Range
              </label>
              <input
                type="text"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2"
                style={{ borderColor: "#5EC4D0" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Story Script
            </label>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 h-32"
              style={{ borderColor: "#5EC4D0" }}
              placeholder="Write your story here..."
            />
          </div>

          <div className="border-t-2 pt-4" style={{ borderColor: "#5EC4D0" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Quiz Questions</h3>
              <button
                onClick={addQuizQuestion}
                className="px-4 py-2 rounded-lg text-white text-sm"
                style={{ backgroundColor: "#5EC4D0" }}
              >
                + Add Question
              </button>
            </div>

            {quiz.map((q, qIndex) => (
              <div key={qIndex} className="mb-4 p-4 bg-white rounded-lg">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    updateQuizQuestion(qIndex, "question", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded border mb-3"
                  placeholder={`Question ${qIndex + 1}`}
                />
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      checked={q.correctAnswer === oIndex}
                      onChange={() =>
                        updateQuizQuestion(qIndex, "correctAnswer", oIndex)
                      }
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        updateQuizOption(qIndex, oIndex, e.target.value)
                      }
                      className="flex-1 px-3 py-2 rounded border"
                      placeholder={`Option ${oIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-lg text-white font-semibold"
            style={{ backgroundColor: "#F28C38" }}
          >
            Save Story
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: "#5EC4D0", color: "white" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomStoryCreator;
