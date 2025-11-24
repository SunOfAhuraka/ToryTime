import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client";

const CreateStoryPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    script: "",
    category: "Fable",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.createStory(formData);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add Global Story</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            placeholder="Title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            className="w-full p-3 border rounded"
            placeholder="Author"
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
          <textarea
            className="w-full p-3 border rounded h-32"
            placeholder="Script"
            onChange={(e) =>
              setFormData({ ...formData, script: e.target.value })
            }
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-bold">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStoryPage;
