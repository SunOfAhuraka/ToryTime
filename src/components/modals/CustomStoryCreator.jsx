import React, { useState } from "react";
import { api } from "../../api/client"; // Import your API client

const CustomStoryCreator = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [ageRange, setAgeRange] = useState("4-7");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  // Default Cover Image (since we aren't uploading one in this simple form yet)
  const coverImage = "https://placehold.co/600x400?text=My+Story";

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

  const handleSave = async () => {
    if (title && script) {
      setLoading(true);

      const storyData = {
        title,
        category,
        age_range: ageRange, // Matches Django field name
        script,
        cover_image: null, // Or send base64 string if you implement file picker
        duration: "5 min",
        // Filter out empty questions before sending
        quiz: quiz.filter((q) => q.question && q.options[0]),
      };

      try {
        // Call the Backend
        await api.createStory(storyData);

        // Notify parent to refresh list
        if (onSave) onSave();
        onClose();
      } catch (error) {
        console.error("Failed to save story:", error);
        alert("Error saving story. Check console.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please add a title and a script!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div
        className="p-8 rounded-2xl max-w-3xl w-full my-8 relative"
        style={{ backgroundColor: "#F7EDE2" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[#4A4A4A]">
          Create Custom Story
        </h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* --- Story Details --- */}
          <div>
            <label className="block text-sm font-bold mb-2 text-[#4A4A4A]">
              Story Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F28C38]"
              style={{ borderColor: "#5EC4D0" }}
              placeholder="Enter story title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-[#4A4A4A]">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F28C38]"
                style={{ borderColor: "#5EC4D0" }}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-[#4A4A4A]">
                Age Range
              </label>
              <input
                type="text"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 outline-none focus:border-[#F28C38]"
                style={{ borderColor: "#5EC4D0" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-[#4A4A4A]">
              Story Script
            </label>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 h-40 outline-none focus:border-[#F28C38]"
              style={{ borderColor: "#5EC4D0" }}
              placeholder="Write your story here..."
            />
          </div>

          {/* --- Quiz Section --- */}
          <div
            className="border-t-2 pt-6 mt-6"
            style={{ borderColor: "#5EC4D0" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-[#4A4A4A]">
                Quiz Questions
              </h3>
              <button
                onClick={addQuizQuestion}
                className="px-4 py-2 rounded-lg text-white text-sm font-bold hover:opacity-90 transition"
                style={{ backgroundColor: "#5EC4D0" }}
              >
                + Add Question
              </button>
            </div>

            {quiz.map((q, qIndex) => (
              <div
                key={qIndex}
                className="mb-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    updateQuizQuestion(qIndex, "question", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border mb-3 font-medium focus:ring-2 ring-[#5EC4D0] outline-none"
                  placeholder={`Question ${qIndex + 1}`}
                />
                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`} // Unique group name per question
                        checked={q.correctAnswer === oIndex}
                        onChange={() =>
                          updateQuizQuestion(qIndex, "correctAnswer", oIndex)
                        }
                        className="w-4 h-4 accent-[#F28C38]"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          updateQuizOption(qIndex, oIndex, e.target.value)
                        }
                        className={`flex-1 px-3 py-2 rounded-lg border ${
                          q.correctAnswer === oIndex
                            ? "border-[#F28C38] bg-orange-50"
                            : ""
                        }`}
                        placeholder={`Option ${oIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Actions --- */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-3 rounded-xl text-white font-bold text-lg transition hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: "#F28C38" }}
          >
            {loading ? "Saving..." : "Save Story"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl font-bold text-lg transition hover:bg-gray-100 text-[#4A4A4A]"
            style={{ backgroundColor: "white", border: "2px solid #e5e5e5" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomStoryCreator;
